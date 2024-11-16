const express=require('express');
const router=express.Router();

const paymentPaypalController=require('../controller/paypalPaymentController');
const authUser=require('../middleware/authUser');
router.post("/payment",authUser,paymentPaypalController.paypalPayment);
router.post("/handle-payment",paymentPaypalController.handlePayment);
router.get("/paypalcancel",paymentPaypalController.cancelPayment);
module.exports=router;