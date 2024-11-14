const validator = require("validator");
const bcrypt = require("bcrypt");
const userModel = require("../models/UserModel");
const doctorModel=require('../models/DoctorModel');
const appointmentModel=require('../models/AppointmentModel');
const jwt = require("jsonwebtoken");
const cloudinary = require('cloudinary').v2;
const registerUser=async(req,res)=>{
    const { name, email, password } = req.body;
    
   
try{
    if (!name || !email || !password ) {
        return res.json({success: false, message: "missing details"});
    }
    if (!validator.isEmail(email)) {
        return res.json({ success: false, message: "please enter a valid email" });
    }
    if (password.length < 8) {
        return res.json({ success: false, message: "please enter a strong password" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const user={
        name,
        email,
        password:hashPassword
    }
    const newUser=new userModel(user);
    await newUser.save();
    const token=jwt.sign({id:newUser._id},process.env.JWT_SECRET);
    return res.json({ success: true, token });

}
catch(error){
    console.log("error", error);
    return res.json({ success: false, message: error.message });
}
}
const loginUser=async(req,res)=>{
try {
    const {email,password}=req.body;
    const user=await userModel.findOne({email});
    if(!user){
        return res.json({ success: false, message: "user  does not exist" });
    }
    const isPasswordValid =await bcrypt.compare(password,user.password);
    if(!isPasswordValid ){
        return res.json({ success: false, message: "invalid  email or password" });
    }
    const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
    return res.json({ success: true, token });

} catch (error) {
    console.log("error", error);
    return res.json({ success: false, message: error.message });
}
}
const getProfile=async(req,res)=>{
    try {
        const userId=req.user.id;
        
        
        const user=await userModel.findById(userId).select('-password');
        if(!user){
            return res.json({ success: false, message: "user  does not exist" });
        }
        return res.json({ success: true,user});
    } catch (error) {
        console.log("error", error);
    return res.json({ success: false, message: error.message });
    }
}
const updateProfile=async(req,res)=>{
    try {
       
        const { name,speciality, address,gender,dob,phone } = req.body;
        const userId = req.user.id;
       
        
        const imageFile = req.file;
        const user=await userModel.findById(userId);
        console.log(req.file,req.body);
        
        if(!user){
            return res.json({ success: false, message: "user  does not exist" });
        }
        let image_url;
        if(imageFile){
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' });
         image_url = imageUpload.secure_url;
        }
        const newAddress=address?JSON.parse(address):user.address;
        console.log("address in back",newAddress)
        const updateData={
            name:name||user.name,
            speciality:speciality||user.speciality, 
            address:newAddress,
            gender:gender||user.gender,
            dob:dob||user.dob,
            phone:phone||user.phone,
            image:image_url||user.image
        };
        const updatedUser=await userModel.findByIdAndUpdate(userId, updateData, { new: true });
        if (!updatedUser) {
          return res.status(404).json({ success: false, message: "User not found" });
        }
        res.json({ success: true, user: updateData ,message:"profile updated "});
    } catch (error) {
        console.log("error", error);
        return res.json({ success: false, message: error.message });
    }
}
const bookedAppointments=async(req,res)=>{
try {
    const {docId,slotDate,slotTime}=req.body;
    const userId=req.user.id;
    const docData=await doctorModel.findById(docId).select('-password');
    if(!docData.available){
        return res.json({ success: false, message: "doctor not available" });
    }
    let slots_booked=docData.slots_booked;
    if(slots_booked[slotDate]){
        if(slots_booked[slotDate].includes(slotTime)){
            return res.json({ success: false, message: "slot not available" });
        }
        else{
            slots_booked[slotDate].push(slotTime);
        }
    }
    else{
        slots_booked[slotDate]=[];
        slots_booked[slotDate].push(slotTime);
    }
    
     docData.slots_booked={};
const userData=await userModel.findById(userId).select("-password");
    const appointmentData={
        userId,
        docId,
        slotDate,
        slotTime,
        date:Date.now(),
        docData,
        userData,
        amount:docData.fees
    }
    const appointment=new appointmentModel(appointmentData);
    appointment.save();
    await doctorModel.findByIdAndUpdate(docId,{slots_booked:slots_booked});
    return res.json({ success: true, message: "Appointment added" });

} catch (error) {
    console.log("error", error);
    return res.json({ success: false, message: error.message });
}
}
const allAppointmentsUser=async(req,res)=>{
try {
    const userId=req.user.id;
    const appointments=await appointmentModel.find({userId});
    return res.json({ success: true, appointments });

} catch (error) {
      console.log("error", error);
    return res.json({ success: false, message: error.message });
}
}
const cancelAppointmentUser=async(req,res)=>{
    try {
        const userId=req.user.id;
        const {appointmentId}=req.body;
        const appointment=await appointmentModel.findById(appointmentId);
        if(!appointment){
            return res.json({ success: false, message: " no Appointment found" });
        }
        if(userId!==appointment.userId){
            return res.json({ success: false, message: "not authorizate" });
        }
        await appointmentModel.findByIdAndUpdate(appointmentId,{ isConcelled: true });
        return res.json({ success: true, message:"appointment canceled" });
    
    } catch (error) {
          console.log("error", error);
        return res.json({ success: false, message: error.message });
    }
    }
module.exports={registerUser,loginUser,getProfile,updateProfile,bookedAppointments,allAppointmentsUser,cancelAppointmentUser}