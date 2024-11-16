import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { AppContext } from '../Context/AppContext';
import { useSearchParams } from 'react-router-dom';

const SuccessPayment = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const payerId = searchParams.get('PayerID');
  const paymentId = searchParams.get('paymentId');
  const appointmentId = searchParams.get('appointmentId');
  const {backendUrl}=useContext(AppContext);
  const handlePaymentSuccess=async()=>{
    console.log("payrid",payerId,"paymentid",paymentId,"appointmentid",appointmentId);
    try {
      const {data}=await axios.post(`${backendUrl}/api/paypal/handle-payment?PayerID=${payerId}&paymentId=${paymentId}`,{appointmentId});
      console.log("success payment",data);
    } catch (error) {
      console.log("error",error);
    }
  }
  useEffect(()=>{
    handlePaymentSuccess();
  },[])
  return (
    <div>SuccessPayment</div>
  )
}

export default SuccessPayment