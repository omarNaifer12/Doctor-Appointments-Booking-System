import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../Context/AdminContext'
import axios from 'axios';
import { toast } from 'react-toastify';

const DoctorsList = () => {
  const {atoken,getDoctors,doctors,backendUrl,setDoctors}=useContext(AdminContext);
  useEffect(()=>{
    if(atoken){
      getDoctors();
    }

  },[atoken])
const changeAvailability=async(docId)=>{
  try {
    const {data}=await axios.put(backendUrl+"/api/doctor/change-availability",{docId},{headers:{atoken}});
    if(data.success){
      toast.success(data.message);
      setDoctors(doctors.map((doc,index)=>doc._id===docId?{ ...doc, available: !doc.available }:doc));
    }
    else{
      toast.error(data.message);
    }
  } catch (error) {
    console.log("error",error);
    toast.error(error.message);
  }
}
  return (
    <div className="bg-white p-6">
    <h1 className="text-3xl font-semibold mb-6">All Doctors</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {
        doctors.map((item, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
            <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded-md mb-4" />
            <div className="text-center">
              <p className="text-xl font-medium">{item.name}</p>
              <p className="text-gray-600">{item.speciality}</p>
              <div className="flex items-center justify-center mt-4">
                <input onChange={()=>changeAvailability(item._id)} type="checkbox" checked={item.available} className="mr-2 cursor-pointer" />
                <p className="text-gray-500">Available</p>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  </div>
  )
}

export default DoctorsList