const paypal = require("../config/paypal");
const appointmentModel = require('../models/AppointmentModel');
const paypalPayment = async (req, res) => {
  const frontendUrl = "http://localhost:5173"
  try {

    const { appointmentId } = req.body;
    const userId = req.user.id;
    const appointmentData = await appointmentModel.findById(appointmentId);
    console.log("appouintment in payment is ", appointmentData, "useris", userId);
    if (!appointmentData) {
      res.json({ success: false, message: "no appointment with this id " });
    }
    if (appointmentData.userId !== userId) {
      res.json({ success: false, message: "not authorized user" });
    }


    const items = [{
      "name": appointmentData.docData.name,
      "sku": appointmentData.docId,
      "price": parseFloat(appointmentData.amount),
      "currency": "USD",
      "quantity": 1,

    }
    ]

    const amount = {
      "currency": "USD",
      "total": parseFloat(appointmentData.amount)
    }

    const paymentData = {

      "intent": "sale",
      "payer": {
        "payment_method": "paypal"
      },
      "redirect_urls": {
        "return_url": `${frontendUrl}/paypalsuccess?appointmentId=${appointmentId}`,
        "cancel_url": `${frontendUrl}/paypalcancel?appointmentId=${appointmentId}`
      },
      "transactions": [{
        "item_list": {
          "items": items
        },
        "amount": amount,
        "description": "Payment using PayPal"
      }]
    }
    console.log("payment data in payment try",paymentData);

    paypal.payment.create(paymentData, function (err, payment) {
      if (err) {
        console.log("eroro in throw",err);
        throw err;
      } else {
        for (let i = 0; i < payment.links.length; i++) {
          if (payment.links[i].rel === "approval_url") {
            
            res.json({success:true,url:payment.links[i].href})
          }
        }
      }
    })




  } catch (error) {
    console.log("error", error);
    return res.json({ success: false, message: error.message });
  }

}
const handlePayment =(req,res)=>{
  try {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
    const { appointmentId } = req.body;
    const executePayment = {
      payer_id: payerId,
    };

    paypal.payment.execute(paymentId, executePayment, async (error, payment) => {
      if (error) {
        console.error('Error executing PayPal payment:', error);
        res.redirect('/api/paypal/paypalcancel');
      } else {
  
        await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true, payment: true });
        res.json({ success: true, message: 'Payment Success' });
      }
    });
  }
  catch (error) {
    console.log("error", error);
    return res.json({ success: false, message: error.message });
  }
}
const cancelPayment = (req, res) => {
  try {
    const frontendUrl = "http://localhost:5173"
    res.json({success:false,url:`${frontendUrl}/paypalcancel`});
  }
  catch (error) {
    console.log("error", error);
    return res.json({ success: false, message: error.message });
  }
};
module.exports = { paypalPayment, handlePayment,cancelPayment};