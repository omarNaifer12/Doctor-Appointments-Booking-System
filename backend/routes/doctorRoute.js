const express=require('express');
const router=express.Router();
const authAdmin=require("../middleware/authAdmin");
const doctorController=require('../controller/doctorController');
router.put('/change-availability',authAdmin,doctorController.changeAvailability);
router.get('/list',doctorController.getDoctorsData);
module.exports=router;