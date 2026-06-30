import React, { useEffect, useMemo, useState } from "react";
import { initLocalStream, useWebRTC } from "../hooks/useWebRTC";
import { socket } from "../config/socket";
import VideoBox from "../Components/VideoBox";


 const Room=()=> {
  const { peerConnections, remoteStreams } = useWebRTC();
  const [, forceUpdate] = useState(0);
const getGridColumns = (count) => {
  if (count === 0) return "1fr";
  if (count === 1) return "1fr";
  if (count === 2) return "1fr 1fr";
  if (count === 3) return "1fr 1fr 1fr";
  return "repeat(auto-fit, minmax(200px, 1fr))";
};
console.log("peerConnectionsgggggg",peerConnections);
console.log("remoteStreamsggg",remoteStreams);


  useEffect(() => {
    initLocalStream();

    socket.emit("join_room", "room-1");

  }, []);

  const users = useMemo(() => {
    return Array.from(peerConnections.entries()).map(([id]) => id);
  }, [peerConnections]);
console.log("usersusersusers",users);

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <h2 className="mb-8 text-center text-3xl font-bold text-white">
        Doctor Live Room
      </h2>

      <div
        className="grid gap-6"
        style={{
          gridTemplateColumns: getGridColumns(users.length),
        }}
      >
        {users.map((userId) => (
          <VideoBox
            key={userId}
            userId={userId}
            stream={remoteStreams.get(userId)}
          />
        ))}
      </div>
    </div>
  );
}
export default Room