import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../Context/AdminContext'
import { useEffect } from 'react';
import { AppContext } from '../../Context/AppContext';
import { assets } from '../../assets/assets';


const AllAppointments = () => {
  const {getAllAppointments,appointments,atoken}=useContext(AdminContext);
  const {calculateAge,slotDataFormat}=useContext(AppContext);
  useEffect(()=>{
    if(atoken){
      getAllAppointments();
    }
  },[])

  return (
    <div className="p-4">
      <p className="text-xl font-bold mb-4">All Appointments</p>
      <div className="overflow-x-auto">
        <div className="grid grid-cols-7 gap-4 text-center bg-gray-100 font-bold p-4 rounded-t-lg">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {
          appointments.map((item, index) => (
            <div
              key={index}
              className={`grid grid-cols-7 gap-4 text-center items-center p-4 ${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              } border-b`}
            >
              <p>{index + 1}</p>
              <div className="flex items-center gap-2">
                <img
                  src={item.userData.image}
                  className="w-10 h-10 rounded-full object-cover"
                  alt="User"
                />
                <p>{item.userData.name}</p>
              </div>
              <p>{calculateAge(item.userData.dob)}</p>
              <p>{slotDataFormat(item.slotDate)}, {item.slotTime}</p>
              <div>
                <img
                  src={item.docData.image}
                  className="w-10 h-10 rounded-full object-cover"
                  alt="Doctor"
                />
              </div>
              <p>{item.amount}$</p>
              {item.isConcelled ? (
                <p className="text-red-500 font-medium">Canceled</p>
              ) : (
                <img
                  src={assets.cancel_icon}
                  className="w-6 h-6 cursor-pointer"
                  alt="Cancel Icon"
                />
              )}
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default AllAppointments