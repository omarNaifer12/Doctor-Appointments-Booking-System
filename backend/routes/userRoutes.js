const express=require('express');
const router=express.Router();

const userController=require('../controller/userController');
const authUser=require('../middleware/authUser');
const upload=require("../middleware/multer");
router.post("/register",userController.registerUser);
router.post("/login",userController.loginUser);
router.get("/profile",authUser,userController.getProfile);
router.put("/update",authUser,upload.single('image'),userController.updateProfile);
module.exports=router;