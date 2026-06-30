const { Query } = require("mongoose");
const doctorModel = require("../models/DoctorModel");
const roomStreamModel = require("../models/RoomStreamModel");
const userModel = require("../models/UserModel");

const enterWaitingRoomStream=(req,res)=>{
try {
      const userId = req.user.id;
        const {roomId}=req.body;   
            const user=await userModel.findById(userId);
            
            if(!user){
                return res.json({ success: false, message: "user  does not exist" });
            }
            const room=await roomStreamModel.findOne({
                roomId:roomId
            });
            if(!room||room.status!=="started"){
                return res.status(404).json({ success: false, message: "Room not found" });
            }
            if(room.isRestricted){
                if(!room.invitedUsers?.includes(userId)){
                return res.status(403).json({ success: false, message: "unauthorised to access this room" });
                }
            }
            const foundPeer=room.waitingRoom?.find((peer)=>peer.userId===userId);
            if(foundPeer){
room.waitingRoom=room.waitingRoom?.map((peer)=>peer.userId===userId?{...peer,status:"pending"}:peer);

            }
            else{
    const peer={
    userId: userId,
    status: "pending",
    joinedAt: new Date(),
  }
  room.waitingRoom?.push(peer);
            }
        
  await room.save();
         return res.status(200).json({ success: true, message: "user entering the waiting room succesfully" });
   
} catch (error) {
    
}
}
const acceptOrRejectJoiningRoom=(req,res)=>{
    try {
        const doctorId=req.user.id;
    const {userId,room_id,status}=req.body;
    const doctor=await doctorModel.findById(doctorId);
    if(!doctor){
         return res.status(404).json({ success: false, message: "doctor  does not exist" });
    }
     const user=await userModel.findById(userId);
            
            if(!user){
                return res.json({ success: false, message: "user does not exist" });
            }
const room = await roomStreamModel.findOne({
    _id: room_id,
    createdByDoctorId: doctorId,
});

    if(!room){
        return res.status(404).json({ success: false, message: "Room not found." });
    }
    const userInWaitingRoom=room.waitingRoom?.find((user)=>user.userId===userId&&user.status==="pending")
    if(userInWaitingRoom){
room.waitingRoom=room.waitingRoom?.map((user)=>user.userId===userId&&user.status==="pending"?{...user,status:status}:user)

if(status==="accepted"){
    const foundPeer=room.peers?.find((peer)=>peer.userId===userId);
    if(foundPeer){
room.peers=room.peers?.map((peer)=>peer.userId===userId?{...peer,status:"rejoining"}:peer);
    }
    else{
const joinedPeer={
    peerId:userId,
      role:"user",
      status:"connected",
      joinedAt:new Date(),
}
room.peers?.push(joinedPeer);
    }
}
await room.save();    
}

    } catch (error) {
        console.error(error?.message)
    }
}
const leaveRoomStream=(req,res)=>{
try {
    const userId = req.user.id;
        const {roomId}=req.body;   
            const user=await userModel.findById(userId);
            
            if(!user){
                return res.json({ success: false, message: "user  does not exist" });
            }
            const room=await roomStreamModel.findOne({
                roomId:roomId
            });
            if(!room||room.status!=="started"){
                return res.status(404).json({ success: false, message: "Room not found" });
            }
              room.peers=room.peers?.map((peer)=>peer.userId===userId?{...peer,leftAt:new Date(),status:"left"}:peer);
              await room.save(); 
} catch (error) {
        console.error(error?.message)
    
}
}
const createRoomStream=(req,res)=>{
try {
    const doctorId=req.user.id;
    const {isRestricted,invitedUsers}=req.body;
    const doctor=await doctorModel.findById(doctorId);
    if(!doctor){
         return res.status(404).json({ success: false, message: "doctor  does not exist" });
    }
    let userIds;
    if(isRestricted){
        if(!invitedUsers||!Array.isArray(invitedUsers)||invitedUsers.length<=0){
            return res.status(400).json({ success: false, message: "you should specify the allowed users when restricted mode enabled" });
        }
        const existedUserIds=await userModel.find({
           _id:{$in:invitedUsers}
        }).select("_id");
        if(!existedUserIds||existedUserIds.length<=0){
            return res.status(400).json({ success: false, message: "you should specify the allowed users when restricted mode enabled" });
        }
        userIds=existedUserIds;

    }
    const roomId="abcd"
    const roomData={
        roomId:roomId,
  status:"created",
  createdByDoctorId:doctorId,
  isRestricted: isRestricted,
  invitedUsers:userIds&&userIds.length>0?userIds:[],
  createdAt:new Date()
    }
    const newRoom=await new roomStreamModel(roomData);
    await newRoom.save();
     return res.status(201).json({ success: false, message: "the room is created" });

} catch (error) {
    console.error(error?.message);
}
}
const finishedRoomStream=(req,res)=>{
try {
    const doctorId=req.user.id;
    const {room_id}=req.body;
    const doctor=await doctorModel.findById(doctorId);
    if(!doctor){
         return res.status(404).json({ success: false, message: "doctor  does not exist" });
    }
   const room = await roomStreamModel.findOne({
    _id: room_id,
    createdByDoctorId: doctorId,
});

    if(!room||room.status==="completed"){
        return res.status(404).json({ success: false, message: "Room not found." });
    }
room.status = "completed";
room.endedAt = new Date();

await room.save();
    return res.status(200).json({ success: true, message: "room finished succesfully" });

} catch (error) {
    console.error(error?.message);
}
}
const saveRecordedRoom=(req,res)=>{

}
const getRecorededRooms=(req,res)=>{
    
}
const getWaitingRoomUsers=(req,res)=>{
    try {
            const doctorId=req.user.id;
    const {room_id}=req.body;
    const doctor=await doctorModel.findById(doctorId);
    if(!doctor){
         return res.status(404).json({ success: false, message: "doctor  does not exist" });
    }
     const room = await roomStreamModel.findOne({
    _id: room_id,
    createdByDoctorId: doctorId,
});

    if(!room||room.status==="completed"){
        return res.status(404).json({ success: false, message: "Room not found." });
    }
    const userIdsInWaitingRoom=room.waitingRoom?.filter((user)=>user.status==="pending").map((user)=>user.userId);
    const users=await userModel.find({
        _id:{$in:userIdsInWaitingRoom}
    }).select("_id","image","email","name","phone");

    return res.status(200).json({ success: true, message: "succesfully" ,users});
    } catch (error) {
        console.error(error?.message);
    }
}
const startedRoomStreaming=(req,res)=>{
    try {
        const doctorId=req.user.id;
    const {room_id}=req.body;
    const doctor=await doctorModel.findById(doctorId);
    if(!doctor){
         return res.status(404).json({ success: false, message: "doctor  does not exist" });
    }
     const room = await roomStreamModel.findOne({
    _id: room_id,
    createdByDoctorId: doctorId,
    status:"created"
});

    if(!room){
        return res.status(404).json({ success: false, message: "Room not found." });
    }
    room.status="started";
    room.startedAt=new Date();
    await room.save();
    return res.status(200).json({ success: true, message: "succesfully room starting streaming"});

    } catch (error) {
         console.error(error?.message);
    }
}
const searchingUserByEmailOrPhone=(req,res)=>{
    try {
         const doctorId=req.user.id;
         const {userEmail,userPhone,searchingType}=req.body;
    const doctor=await doctorModel.findById(doctorId);
    if(!doctor){
         return res.status(404).json({ success: false, message: "doctor  does not exist" });
    }
const query={}
if(searchingType==="email"&&userEmail){
    query.email=userEmail;
}else if(searchingType==="phone"&&userPhone){
    query.phone=userPhone;
}
else{
     return res.status(400).json({ success: false, message: "invalid creadential." });
}
const user=await userModel.findOne(query).select("_id","image","email","name","phone");
if(!user){
    return res.status(200).json({ success: false, message: "Not found"});
}
    return res.status(200).json({ success: true, message: "Found succesfully",user});

    } catch (error) {
        console.error(error?.message);
        
    }
}