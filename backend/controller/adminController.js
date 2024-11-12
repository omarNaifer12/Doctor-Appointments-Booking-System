const validator = require("validator");
const bcrypt = require("bcrypt");
const cloudinary = require('cloudinary').v2;
const doctorModel = require("../models/DoctorModel");
const jwt = require("jsonwebtoken");
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
module.exports = { addDoctor, login };