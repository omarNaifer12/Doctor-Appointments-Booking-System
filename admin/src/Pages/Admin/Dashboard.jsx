import React from 'react'
import { useContext } from 'react';
import { useState } from 'react'
import { AdminContext } from '../../Context/AdminContext';
import { useEffect } from 'react';
import axios from "axios"
import { assets } from '../../assets/assets';
import { AppContext } from '../../Context/AppContext';
const Dashboard = () => {
 const [dashData,setDashData]=useState(null);
  const {backendUrl,atoken,cancelAppointment}=useContext(AdminContext);
 const {slotDataFormat}=useContext(AppContext);
   const fetchDashData=async()=>{
    try {
      const {data}=await axios.get(backendUrl+"/api/admin/dashboard-data",{headers:{atoken}});
      console.log("data in numdoc",data);

      if(data.success){
       setDashData(data.dashData);
      }
  } catch (error) {
      console.log(error);
  }
   }
  useEffect(()=>{
if(atoken){
  fetchDashData();
}
  },[]);
  return dashData && (
    <div className="p-6 space-y-8 bg-gray-100">
      {/* Summary Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Doctors */}
        <div className="flex items-center p-4 bg-white rounded-lg shadow-md">
          <img src={assets.doctor_icon} alt="Doctors" className="w-12 h-12 mr-4" />
          <div>
            <p className="text-2xl font-semibold text-blue-500">{dashData.doctors}</p>
            <p className="text-gray-600">Doctors</p>
          </div>
        </div>
  
        {/* Appointments */}
        <div className="flex items-center p-4 bg-white rounded-lg shadow-md">
          <img src={assets.appointments_icon} alt="Appointments" className="w-12 h-12 mr-4" />
          <div>
            <p className="text-2xl font-semibold text-green-500">{dashData.appointments}</p>
            <p className="text-gray-600">Appointments</p>
          </div>
        </div>
  
        {/* Patients */}
        <div className="flex items-center p-4 bg-white rounded-lg shadow-md">
          <img src={assets.patients_icon} alt="Patients" className="w-12 h-12 mr-4" />
          <div>
            <p className="text-2xl font-semibold text-red-500">{dashData.patients}</p>
            <p className="text-gray-600">Patients</p>
          </div>
        </div>
      </div>
  
      {/* Latest Bookings Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center mb-4">
          <img src={assets.list_icon} alt="Latest Booking" className="w-6 h-6 mr-2" />
          <p className="text-lg font-medium text-gray-700">Latest Booking</p>
        </div>
  
        <div className="space-y-4">
          {(dashData.latestAppointments || []).map((item, index) => (
            <div key={index} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm">
              {/* Appointment Info */}
              <div className="flex items-center">
                <img src={item.docData.image || assets.default_avatar} alt="Doctor" className="w-10 h-10 rounded-full mr-4" />
                <div>
                  <p className="font-medium text-gray-800">{item.docData.name}</p>
                  <p className="text-sm text-gray-500">{slotDataFormat(item.slotDate)}</p>
                </div>
              </div>
  
              {/* Status or Cancel Button */}
              {item.isConcelled ? (
                <p className="text-sm text-red-500 font-medium">Canceled</p>
              ) : (
                <img
                  onClick={() => cancelAppointment(item._id)}
                  src={assets.cancel_icon}
                  className="w-8 h-8 cursor-pointer hover:opacity-80 transition m-2"
                  alt="Cancel Icon"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard