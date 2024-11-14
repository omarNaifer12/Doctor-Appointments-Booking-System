import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../Context/AppContext'
import axios from 'axios';

const MyAppointments = () => {
  const {doctors,backendUrl,token}=useContext(AppContext);
const [appointments,setAppointments]=useState([]);
const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const fetchAppointment=async()=>{
  try {
    const {data}=await axios.get(backendUrl+"/api/user/all-appointment",{headers:{token}});
    if(data.success){
      setAppointments(data.appointments);
    }
  } catch (error) {
    console.log(error);
  }
}
useEffect(()=>{
  if(token){ 
  fetchAppointment();
  }
},[token])
const slotDataFormat=(slotDate)=>{
const dateArray=slotDate.split('_');
return dateArray[0]+' '+months[Number(dateArray[1])]+' '+dateArray[2];
}
  return (
    <div className="container mx-auto px-4 py-6">
      <p className="text-2xl font-semibold text-gray-800 mb-4">My Appointments</p>
      <div className="space-y-4">
        {appointments.map((appointment, index) => (
          <div
            key={index}
            className="flex items-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 hover:bg-gray-50"
          >
            {/* Doctor Profile */}
            <img
              src={appointment.docData.image}
              alt={appointment.docData.name}
              className="w-16 h-16 rounded-full object-cover mr-4"
            />
            <div className="flex-grow">
              <p className="text-lg font-semibold text-gray-700">{appointment.docData.name}</p>
              <p className="text-sm text-gray-500">{appointment.docData.speciality}</p>
              <div className="text-sm text-gray-600 mt-2">
                <p className="font-medium text-gray-800">Address:</p>
                <p>{appointment.docData.address.line1}</p>
                <p>{appointment.docData.address.line2}</p>
                {/* Date & Time Section */}
                <p className="font-semibold text-gray-800 mt-2">
                  Date & Time: {slotDataFormat(appointment.slotDate)}|{appointment.slotTime}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="ml-4 flex flex-col items-center justify-between">
              <button className="bg-white text-blue-500 py-2 px-4 rounded-lg border border-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-200">
                Pay Online
              </button>
              <button className="bg-white text-red-500 py-2 px-4 rounded-lg border border-red-500 hover:bg-red-500 hover:text-white transition-all duration-200 mt-2">
                Cancel Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyAppointments