const mongoose = require("mongoose");
const peerSchema = new mongoose.Schema({
  peerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  role: {
    type: String,
    enum: ["user"],
    required: true,
  },
  status: {
    type: String,
    enum: ["connected", "rejoining", "left"],
    default: "connected",
  },
  joinedAt: { type: Date, default: Date.now },
  leftAt: { type: Date },
}, { _id: false });
const waitingUserSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  joinedAt: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  }
}, { _id: false });
const roomStreamSchema = new mongoose.Schema({
  recordingUrl: { type: String, required: false },
  startedAt: { type: Date, required: false },
  endedAt: { type: Date, required: false },
  peers: [peerSchema],
  roomId: { type: String, required: true,unique:true },
  status: { type: String, required: true },
  waitingRoom: [waitingUserSchema],
  createdByDoctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  isRestricted: { type: Boolean, required: true, default: false },
  invitedUsers:  [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
},{ timestamps: true });
const roomStreamModel =
  mongoose.models.roomStream || mongoose.model("roomStream", roomStreamSchema);
module.exports = roomStreamModel;
