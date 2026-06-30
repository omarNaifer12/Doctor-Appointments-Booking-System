import { socket } from "../config/socket";
const config = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' }
  ]
};
const peerConnections=new Map();
const remoteStreams=new Map();
let localStream;
console.log("peerConnections",peerConnections);

export const initLocalStream = async () => {
  console.log("enter localStream",localStream);
  
  if (localStream) return localStream;

  localStream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false
  });

  return localStream;
};
export const useWebRTC=()=>{
    const createNewConnection= async (peerId)=>{
      console.log("enter createNewConnection");
      
        const pc=new RTCPeerConnection(config);
        console.log("pc in createNewConnection",pc);
        
         const stream =await initLocalStream();
         console.log("stream in createNewConnection");
         
        stream.getTracks().forEach((track)=>pc.addTrack(track,localStream));
        
        pc.onicecandidate=(event)=>{
            if(event.candidate){
              socket.emit("ice-candidate",{target:peerId,candidate:event.candidate});
            }
            
        }
          pc.ontrack = (event) => {
    remoteStreams.set(peerId, event.streams[0]);
  };
        peerConnections.set(peerId,pc);
        return pc;
    }
const makeOffer=async(peerId)=>{
  console.log("enter makeOffer",peerId);
  
const pc=await createNewConnection(peerId);
console.log("fine we mad connectio ");

const offer=await pc.createOffer();
console.log("now lets define the offer",offer);

await pc.setLocalDescription(offer);
socket.emit("createOffer",{
  target:peerId,
  offer:offer
});
}
console.log("enter useWebRTCuseWebRTC");

socket.on("peer_join",(peerId)=>{
  console.log("peer_joinpeer_join",peerId);
  
   makeOffer(peerId);
})
socket.on("peer_diconnect",(peerId)=>{
  console.log("peer_diconnect",peerId);
  
  if(peerConnections.has(peerId)){
    const pc = peerConnections.get(peerId);
    pc?.close();
    peerConnections.delete(peerId);
  }
})
socket.on("offer",async(data)=>{
  console.log("offer sented from backend fine console the data",data);
  
  const pc=await createNewConnection(data.sender);
  await pc.setRemoteDescription(data.offer);

  const answer=await pc.createAnswer();
  await pc.setLocalDescription(answer);
  socket.emit('createAnswer',{
    target:data.sender,
  answer:answer
  })
})
socket.on("answer",async(data)=>{
  console.log("enter the answer finally to see the result data",data);
  
  if(!peerConnections.has(data.sender))return;
  const pc=peerConnections.get(data.sender);
  await pc?.setRemoteDescription(data.answer);
})
socket.on("ice-candidate",async(data)=>{
  if(!peerConnections.has(data.sender))return;
  const pc=peerConnections.get(data.sender);
    await pc?.addIceCandidate(data.candidate);
  
})
 return {
    peerConnections,
    remoteStreams,
  };
}