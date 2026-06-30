import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../Context/AppContext'
import axios from 'axios';
import {  toast } from 'react-toastify';
const MyAppointments = () => {
  const {doctors,backendUrl,token}=useContext(AppContext);
const [appointments,setAppointments]=useState([]);
const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const slotDataFormat=(slotDate)=>{
  const dateArray=slotDate.split('_');
  return dateArray[0]+' '+months[Number(dateArray[1])]+' '+dateArray[2];
  }
const fetchAppointment=async()=>{
  try {
    const {data}=await axios.get(backendUrl+"/api/user/all-appointment",{headers:{token}});
    if(data.success){
      setAppointments(data.appointments.reverse());
    
    }
  } catch (error) {
    console.log(error);
  }
}
const cancellAppointment=async(appointmentId)=>{
  try {
    const {data}=await axios.post(backendUrl+'/api/user/cancel-appointment',{appointmentId},{headers:{token}});
    if(data.success){
      toast.success(data.message);
      setAppointments(appointments.map((item)=>item._id===appointmentId?{...item,isConcelled:true}:item));
    }
    else{
      toast.error(data.message);

    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
    
  }
}
const handlePaymentClick=async(appointmentId)=>{
try {
  const {data}=await axios.post(`${backendUrl}/api/paypal/payment`,{appointmentId},{headers:{token}});
  console.log("data payment",data);
  if(data.success){
    window.location.href=data.url;
  }
} catch (error) {
  console.log("error",error);
}
}
useEffect(()=>{
  if(token){ 
  fetchAppointment();
  }
},[token])

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-2xl font-bold text-slate-800 mb-1">My Appointments</h1>
      <p className="text-sm text-slate-500 mb-6">View, pay, or cancel your upcoming visits</p>
      <div className="flex flex-col gap-5">
        {appointments.map((appointment, index) => (
          <div
            key={index}
            className="grid grid-cols-[auto_1fr_auto] gap-4 items-center bg-slate-50 border border-slate-200 p-4 rounded-xl hover:border-indigo-300 hover:shadow-sm transition-all duration-300"
          >
            {/* Doctor Profile */}
            <img
              src={appointment.docData.image}
              alt={appointment.docData.name}
              className="w-20 h-20 rounded-xl object-cover ring-1 ring-slate-200"
            />
            <div>
              <p className="text-lg font-semibold text-slate-800">{appointment.docData.name}</p>
              <span className="inline-block text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full mt-1">{appointment.docData.speciality}</span>
              <div className="text-sm text-slate-600 mt-3 space-y-0.5">
                <p className="font-medium text-slate-700">Address</p>
                <p>{appointment.docData.address.line1}</p>
                <p>{appointment.docData.address.line2}</p>
                {/* Date & Time Section */}
                <p className="font-semibold text-slate-800 mt-2 flex items-center gap-2">
                  <span className="text-indigo-500">📅</span>
                  {slotDataFormat(appointment.slotDate)} &middot; {appointment.slotTime}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col items-stretch gap-2 min-w-[150px]">
              {(!appointment.isConcelled&&!appointment.isCompleted)&&<button onClick={()=>handlePaymentClick(appointment._id)} className="bg-indigo-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200">
                Pay Online
              </button>} 
             {(!appointment.isConcelled&&!appointment.isCompleted)&&<button onClick={()=>cancellAppointment(appointment._id)} className="bg-white text-slate-600 py-2 px-4 rounded-lg border border-slate-300 font-medium hover:bg-rose-50 hover:text-rose-600 hover:border-rose-300 transition-colors duration-200">
                Cancel
              </button>} 
              {appointment.isConcelled&&<span className="text-center text-rose-600 bg-rose-50 py-2 px-4 rounded-lg text-sm font-medium">Cancelled</span>}
              {appointment.isCompleted&&<span className="text-center text-emerald-600 bg-emerald-50 py-2 px-4 rounded-lg text-sm font-medium">Completed</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyAppointments