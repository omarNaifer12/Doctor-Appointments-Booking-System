const express=require('express');
const router=express.Router();
const authAdmin=require("../middleware/authAdmin");
const addminController=require('../controller/adminController');
const upload=require("../middleware/multer");
router.post("/add-doctor",authAdmin,upload.single("image"),addminController.addDoctor);
router.post("/login",addminController.login);
router.get("/all-doctors",authAdmin,addminController.AllDoctors);
router.get("/appointments",authAdmin,addminController.appointmentsAdmin);
router.post("/cancel-appointments",authAdmin,addminController.cancelAppointmentAdmin);

router.get("/dashboard-data",authAdmin,addminController.adminDashboard);
module.exports=router;