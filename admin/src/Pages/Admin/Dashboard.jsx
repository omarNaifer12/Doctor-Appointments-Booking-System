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
    <div className="p-6 space-y-8">
      {/* Summary Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Doctors */}
        <div className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-sm transition-all">
          <div className="bg-indigo-50 p-3 rounded-xl">
            <img src={assets.doctor_icon} alt="Doctors" className="w-8 h-8" />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-800">{dashData.doctors}</p>
            <p className="text-slate-500 text-sm">Doctors</p>
          </div>
        </div>
  
        {/* Appointments */}
        <div className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-sm transition-all">
          <div className="bg-indigo-50 p-3 rounded-xl">
            <img src={assets.appointments_icon} alt="Appointments" className="w-8 h-8" />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-800">{dashData.appointments}</p>
            <p className="text-slate-500 text-sm">Appointments</p>
          </div>
        </div>
  
        {/* Patients */}
        <div className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-sm transition-all">
          <div className="bg-indigo-50 p-3 rounded-xl">
            <img src={assets.patients_icon} alt="Patients" className="w-8 h-8" />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-800">{dashData.patients}</p>
            <p className="text-slate-500 text-sm">Patients</p>
          </div>
        </div>
      </div>
  
      {/* Latest Bookings Section */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200">
        <div className="flex items-center gap-2 mb-4">
          <img src={assets.list_icon} alt="Latest Booking" className="w-5 h-5" />
          <p className="text-lg font-bold text-slate-800">Latest Bookings</p>
        </div>
  
        <div className="space-y-3">
          {(dashData.latestAppointments || []).map((item, index) => (
            <div key={index} className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-100">
              {/* Appointment Info */}
              <div className="flex items-center gap-3">
                <img src={item.docData.image || assets.default_avatar} alt="Doctor" className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="font-semibold text-slate-800">{item.docData.name}</p>
                  <p className="text-sm text-slate-500">{slotDataFormat(item.slotDate)}</p>
                </div>
              </div>
  
              {/* Status or Cancel Button */}
              {item.isCompleted ?(
                <p className="text-emerald-600 font-medium text-sm text-center">Completed</p>
              ):item.isConcelled ? (
                <span className="text-sm text-rose-600 font-medium bg-rose-50 px-3 py-1 rounded-full">Canceled</span>
              ) : (
                <img
                  onClick={() => cancelAppointment(item._id)}
                  src={assets.cancel_icon}
                  className="w-7 h-7 cursor-pointer hover:scale-110 transition-transform"
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