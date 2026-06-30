const express =require("express");
const cors =require("cors");
const http=require("http");
const app=express();
const dotenv=require("dotenv/config");
const connectDB=require("./config/mongoDb");
const connectCloudinary=require('./config/cloudinary');
const adminRoute=require("./routes/adminRoute");
const doctorRoute=require("./routes/doctorRoute");
const paypalRoute=require("./routes/paypalPaymentRoute");
const userRoute=require("./routes/userRoutes");
const { initializeSocket, io } = require("./config/socketConfig");
const port=process.env.PORT||4000;
app.use(express.json());
app.use(cors({ origin: true }));

connectDB();
connectCloudinary();

app.use("/api/admin",adminRoute);
app.use("/api/paypal",paypalRoute);
app.use("/api/doctor",doctorRoute);
app.use("/api/user",userRoute);
const server=http.createServer(app);
initializeSocket(server);
console.log("io in the server.js",io);

server.listen(port,()=>console.log("port is",port));
