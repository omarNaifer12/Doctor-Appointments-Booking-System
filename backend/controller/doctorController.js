const doctorModel = require("../models/DoctorModel");
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
module.exports={changeAvailability,getDoctorsData};