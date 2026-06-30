import React from 'react'
import { useContext } from 'react'
import { DoctorContext } from '../../Context/DoctorContext'
import { useEffect } from 'react';
import { AppContext } from '../../Context/AppContext';
import { assets } from '../../assets/assets';

const DoctorAppointments = () => {
    const {appointmentsDoc,fetchAppointmentsDoc,setAppointmentsDoc,dtoken,completedAppointmentDoc,
      cancelAppointmentDoc}=useContext(DoctorContext);
    const {calculateAge,slotDataFormat}=useContext(AppContext)
    useEffect(()=>{
        if(dtoken){
            fetchAppointmentsDoc();
        }

    },[dtoken])
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-slate-800 mb-1">Appointments</h1>
      <p className="text-sm text-slate-500 mb-5">Manage your patient bookings</p>
      <div className="overflow-x-auto bg-white rounded-2xl border border-slate-200">
        <div className="grid grid-cols-7 gap-4 text-left text-xs font-semibold uppercase tracking-wide text-indigo-600 bg-indigo-50 p-4 rounded-t-2xl">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Payment</p>
          <p>Fees</p>
          <p className="text-center">Action</p>
        </div>
        {
          appointmentsDoc.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-7 gap-4 text-left items-center p-4 border-b border-slate-100 hover:bg-slate-50 transition-colors"
            >
              <p className="text-slate-500">{index + 1}</p>
              <div className="flex items-center gap-2">
                <img
                  src={item.userData.image}
                  className="w-9 h-9 rounded-full object-cover"
                  alt="User"
                />
                <p className="text-slate-800 font-medium">{item.userData.name}</p>
              </div>
              <p className="text-slate-600">{calculateAge(item.userData.dob)??""}</p>
              <p className="text-slate-600">{slotDataFormat(item.slotDate)}, {item.slotTime}</p>
              <div>
               <span className={`text-xs font-semibold px-2 py-1 rounded-full ${item.payment?"bg-indigo-50 text-indigo-600":"bg-slate-100 text-slate-600"}`}>{item.payment?"Online":"Cash"}</span>
              </div>
              <p className="text-slate-800 font-medium">${item.amount}</p>
              {item.isCompleted ?(
                <p className="text-emerald-600 font-medium text-sm text-center">Completed</p>
              ):item.isConcelled ? (
                <p className="text-rose-600 font-medium text-sm text-center">Canceled</p>
              ):(
              <div className="flex items-center justify-center gap-3">
                <img
               onClick={()=>completedAppointmentDoc(item._id)}
               src={assets.tick_icon}
               className="w-8 h-8 cursor-pointer hover:scale-110 transition-transform"
               alt="tick Icon"/>
                <img
               onClick={()=>cancelAppointmentDoc(item._id)}
               
                src={assets.cancel_icon}
                className="w-8 h-8 cursor-pointer hover:scale-110 transition-transform"
                alt="Cancel Icon"/>
              </div>

              )}
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default DoctorAppointments