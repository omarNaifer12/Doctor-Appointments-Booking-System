const validator = require("validator");
const bcrypt = require("bcrypt");
const userModel = require("../models/UserModel");
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
        const updateData={
            name:name||user.name,
            speciality:speciality||user.speciality, 
            address:address||user.address,
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
module.exports={registerUser,loginUser,getProfile,updateProfile}