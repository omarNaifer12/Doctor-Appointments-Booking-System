const validator = require("validator");
const bcrypt = require("bcrypt");
const cloudinary = require('cloudinary').v2;
const doctorModel = require("../models/DoctorModel");
const jwt = require("jsonwebtoken");
const userModel=require("../models/UserModel")
const appointmentModel=require('../models/AppointmentModel');
const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
        const imageFile = req.file;
        console.log(name, email, password, speciality, degree, experience, about, fees, address, imageFile);

        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.json({ success: false, message: "missing details" });
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "please enter a valid email" });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "please enter a strong password" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' });
        const image_url = imageUpload.secure_url;
        console.log("image url ", image_url);

        const doctorData = {
            name,
            email,
            image: image_url,
            password: hashPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now(),
            available: true
        }
        console.log("doctor data ", doctorData);

        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();
        return res.json({ success: true, message: "doctor added" });
    } catch (error) {
        console.log("error", error);
        return res.json({ success: false, message: error.message });
    }
}
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("req body in login admin",req.body);
        
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const atoken = jwt.sign(password + email, process.env.JWT_SECRET);
            res.json({ success: true, atoken });
        }
        else {
            return res.json({ success: false, message: "invalid credential" });
        }
    } catch (error) {
        console.log("error", error);
        return res.json({ success: false, message: error.message });
    }
}
const AllDoctors=async(req,res)=>{
    try {
        const doctors=await doctorModel.find({}).select('-password');
        res.json({ success: true, doctors });
    } catch (error) {
        console.log("error", error);
        return res.json({ success: false, message: error.message });
    }
}
const appointmentsAdmin=async(req,res)=>{
    try {
        const appointments=await appointmentModel.find({});
        res.json({ success: true, appointments });
    } catch (error) {
        console.log("error", error);
        return res.json({ success: false, message: error.message });
    }
}
const cancelAppointmentAdmin=async(req,res)=>{
    try {
      
        const {appointmentId}=req.body;
        const appointment=await appointmentModel.findById(appointmentId);
        console.log("appointment is ",appointment);
        if(!appointment){
            return res.json({ success: false, message: " no Appointment found" });
        }
        await appointmentModel.findByIdAndUpdate(appointmentId,{ isConcelled: true });
        const {slotDate,slotTime,docId}=appointment;
        const doctor=await doctorModel.findById(docId);
        let slots_booked=doctor.slots_booked;
        
        slots_booked[slotDate]=slots_booked[slotDate].filter((item)=>item!==slotTime);
        
        await doctorModel.findByIdAndUpdate(docId,{slots_booked:slots_booked});

        return res.json({ success: true, message:"appointment canceled" });
    
    } catch (error) {
          console.log("error", error);
        return res.json({ success: false, message: error.message });
    }
    }
    const adminDashboard=async(req,res)=>{
        try {
            const Appointments=await appointmentModel.find({});
            const numDoc=await doctorModel.countDocuments({});
            const numPatients= await userModel.countDocuments({});
            const dashData={
                doctors:numDoc,
                patients:numPatients,
                appointments:Appointments.length,
                latestAppointments:Appointments.reverse().slice(0,5)
            }
            return res.json({ success: true, dashData });
        } catch (error) {
            console.log("error",error);
            return res.json({ success: false, message: error.message });
        }
    }
module.exports = { addDoctor,login,AllDoctors,appointmentsAdmin,cancelAppointmentAdmin,adminDashboard};