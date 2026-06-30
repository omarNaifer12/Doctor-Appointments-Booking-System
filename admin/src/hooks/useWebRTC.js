// useWebRTC.js
import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

const ICE_SERVERS = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
  ]
};

export function useWebRTC({ roomId, role }) {
  const [peers, setPeers] = useState({});
  const localStream = useRef(null);
  const peerConnections = useRef({});
  const socket = useRef(null);
const url="http://localhost"
  useEffect(() => {
    const init = async () => {

      localStream.current = await navigator.mediaDevices.getUserMedia({
        video: true, audio: true
      });

      socket.current = io();

      socket.current.on('existing-peers', (existingPeers) => {
        existingPeers.forEach(({ peerId }) => createOffer(peerId));
      });

      socket.current.on('peer-joined', ({ peerId }) => {

      });

      socket.current.on('offer', async ({ from, offer }) => {
        const pc = createPeerConnection(from);
        await pc.setRemoteDescription(offer);
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        socket.current.emit('answer', { to: from, answer });
      });

      socket.current.on('answer', async ({ from, answer }) => {
        await peerConnections.current[from]?.setRemoteDescription(answer);
      });

      socket.current.on('ice-candidate', ({ from, candidate }) => {
        peerConnections.current[from]?.addIceCandidate(candidate);
      });

      socket.current.on('peer-left', ({ peerId }) => {
        peerConnections.current[peerId]?.close();
        delete peerConnections.current[peerId];
        setPeers(prev => { const s = {...prev}; delete s[peerId]; return s; });
      });

      socket.current.emit('join-room', { roomId, role });
    };

    init();
    return () => socket.current?.disconnect();
  }, [roomId]);

  const createPeerConnection = (peerId) => {
    const pc = new RTCPeerConnection(ICE_SERVERS);
    peerConnections.current[peerId] = pc;

    localStream.current.getTracks().forEach(track => {
      pc.addTrack(track, localStream.current);
    });

    pc.ontrack = ({ streams }) => {
      setPeers(prev => ({ ...prev, [peerId]: streams[0] }));
    };

    pc.onicecandidate = ({ candidate }) => {
      if (candidate) socket.current.emit('ice-candidate', { to: peerId, candidate });
    };

    return pc;
  };

  const createOffer = async (peerId) => {
    const pc = createPeerConnection(peerId);
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    socket.current.emit('offer', { to: peerId, offer });
  };

  return { localStream: localStream.current, peers };
}