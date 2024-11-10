const express =require("express");
const cors =require("cors");
const app=express();
const dotenv=require("dotenv/config");
const connectDB=require("./config/mongoDb");
const connectCloudinary=require('./config/cloudinary');
const port=process.env.PORT||4000;
app.use(express.json());
app.use(cors());
app.get("/",(req,res)=>{
    res.send("api workgggg");
})
connectDB();
connectCloudinary();
app.listen(port,()=>console.log("port is",port));
