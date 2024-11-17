const doctorModel = require("../models/DoctorModel");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const appointmentModel=require('../models/AppointmentModel');
const changeAvailability=async(req,res)=>{
    try {
        const {docId}=req.body;
        const doctor=await doctorModel.findById(docId);
        if(!doctor){
            res.json({success:false,message:"no doctor found"});
        }
        await doctorModel.findByIdAndUpdate(docId,{available:!doctor.available});
        res.json({success:true,message:"availability changed"});
    } catch (error) {
        console.log("error", error);
        return res.json({ success: false, message: error.message });
    }
}
const getDoctorsData=async(req,res)=>{
    try {
        
        const doctors = await doctorModel.find({ available: true }).select(['-password','-email']);
       
        res.json({success:true,doctors});
    } catch (error) {
        console.log("error", error);
        return res.json({ success: false, message: error.message });
    }
}
const loginDoctor=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const doctor=await doctorModel.findOne({email});
        if(!doctor){
            return res.json({ success: false, message: "user  does not exist" });
        }
        const isPasswordValid =await bcrypt.compare(password,doctor.password);
        if(!isPasswordValid ){
            return res.json({ success: false, message: "invalid  email or password" });
        }
        const dtoken=jwt.sign({id:doctor._id},process.env.JWT_SECRET);
        return res.json({ success: true, dtoken });
    
    } catch (error) {
        console.log("error", error);
        return res.json({ success: false, message: error.message });
    }
    }
    const allAppointmentsOfDoctor=async(req,res)=>{
        try {
            const docId=req.doctor.id;
            const appointments=await appointmentModel.find({docId});
            return res.json({ success: true, appointments });
        
        } catch (error) {
              console.log("error", error);
            return res.json({ success: false, message: error.message });
        }
        }
        const cancelAppointmentDoctor=async(req,res)=>{
            try {
                const docId=req.doctor.id;
                const {appointmentId}=req.body;
                const appointment=await appointmentModel.findById(appointmentId);
                console.log("appointment is ",appointment);
                if(!appointment){
                    return res.json({ success: false, message: " no Appointment found" });
                }
                if(docId!==appointment.docId){
                    return res.json({ success: false, message: "not authorizate" });
                }
                await appointmentModel.findByIdAndUpdate(appointmentId,{ isConcelled: true });
                const {slotDate,slotTime}=appointment;
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
            const CompletedAppointment=async(req,res)=>{
                try {
                    const docId=req.doctor.id;
                    const {appointmentId}=req.body;
                    const appointment=await appointmentModel.findById(appointmentId);
                    console.log("appointment is ",appointment);
                    if(!appointment){
                        return res.json({ success: false, message: " no Appointment found" });
                    }
                    if(docId!==appointment.docId){
                        return res.json({ success: false, message: "not authorizate" });
                    }
                    await appointmentModel.findByIdAndUpdate(appointmentId,{ isCompleted: true });
                    
            
                    return res.json({ success: true, message:"appointment completed" });
                
                } catch (error) {
                      console.log("error", error);
                    return res.json({ success: false, message: error.message });
                }
                }
                const doctorDashboard=async(req,res)=>{
                    try {
                        const docId=req.doctor.id;

                        const appointments=await appointmentModel.find({docId});
                     
                     let  earning= appointments.reduce((sumEarn,item)=>{
                            if(item.isCompleted){
                                sumEarn+=item.amount;
                            }
                            return sumEarn;

                        },0);
                     let patients=[];
                     appointments.forEach((item,index)=>{
                        if(!patients.includes(item.userId)){
                            patients.push(item.userId);

                        }
                     });

                        
                        const dashData={
                            patients:patients.length,
                            earning,
                            appointments:appointments.length,
                            latestAppointments:appointments.reverse().slice(0,5)
                        }
                        return res.json({ success: true, dashData });
                    } catch (error) {
                        console.log("error",error);
                        return res.json({ success: false, message: error.message });
                    }
                }
module.exports={changeAvailability,getDoctorsData,loginDoctor,allAppointmentsOfDoctor,cancelAppointmentDoctor,
    CompletedAppointment,doctorDashboard
};