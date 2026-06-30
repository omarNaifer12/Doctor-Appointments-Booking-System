const { Server } = require("socket.io");
let io;
const rooms=new Map();
console.log("ioioioioio",io);
console.log("roomsroomsroomsrooms",rooms);


const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("enter to  main connection",socket.id);
    socket.on("test_connection", (message) => {
      console.log("enter test test_connection",message);
      
      socket.emit("test_response", { status: "received" });
    });
    socket.on("join_room",(roomId)=>{
      console.log("join_roomjoin_room",roomId);
      
    socket.join(roomId);
    if(!rooms.has(roomId)){
      rooms.set(roomId,new Set());
    }
                rooms.get(roomId)?.add(socket.id);
                console.log("rooms is ",rooms);
                
                socket.to(roomId).emit("peer_join",socket.id);

    })
    socket.on("createOffer",(data)=>{
      console.log("enter createOffer backend",data);
      
      socket.to(data.target).emit("offer",{
        sender:socket.id,
        offer:data.offer
      });
    })
    socket.on("createAnswer",(data)=>{
      console.log("enter createAnswer backend",data);

      socket.to(data.target).emit("answer",{
        sender:socket.id,
        answer:data.answer
      });
    })
   socket.on("ice-candidate",(data)=>{
    socket.to(data.target).emit("ice-candidate",{
        sender:socket.id,
        candidate:data.candidate
      });
   })
    socket.on("disconnect", () => {
      rooms.forEach((peers,roomId)=>{
        if(peers.has(socket.id)){
          peers.delete(socket.id);
          socket.to(roomId).emit("peer_diconnect",socket.id);
          if(peers.length===0){
            rooms.delete(roomId);
          }
        }
      })
    });
  });
};
const getIo = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};
const safeEmit = (event, data) => {
  try {
    getIo().emit(event, data);
    return true;
  } catch (error) {

    return false;
  }
};
module.exports = { initializeSocket, getIo, safeEmit,io };
