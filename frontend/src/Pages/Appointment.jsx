import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';
import { assets } from '../assets/assets';

const Appointment = () => {
  const {docId}=useParams();
  const {doctors,currencySymbol}=useContext(AppContext);
  const [doctorInfo,setDoctorInfo]=useState(null);
  const fetchDoctorInfo=async()=>{

      const response=doctors.find(doc=>doc._id===docId);
      setDoctorInfo(response);
console.log("response doctor",response);
  }
  useEffect(()=>{
fetchDoctorInfo();

  },[docId,doctors])

  return doctorInfo && (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Doctor Details */}
      <div className="flex flex-col md:flex-row items-start md:items-center">
        {/* Doctor Image */}
        <div className="md:w-1/3 w-full mb-6 md:mb-0">
          {console.log("image", doctorInfo.image)}
          <img 
            src={doctorInfo.image} 
            alt={doctorInfo.name} 
            className="w-full h-60 object-cover rounded-lg shadow-md"
          />
        </div>
        
        {/* Doctor Info */}
        <div className="md:ml-6 md:w-2/3 w-full space-y-4">
          <div>
            <p className="text-2xl font-semibold text-gray-800 flex items-center">
              {doctorInfo.name}
              <img 
                src={assets.verified_icon} 
                alt="verified icon" 
                className="ml-2 w-5 h-5 inline-block"
              />
            </p>
            <div className="flex items-center space-x-2 text-gray-600">
              <p className="font-medium">{doctorInfo.degree}</p>
              <span className="text-gray-400">|</span>
              <p>{doctorInfo.speciality}</p>
              <button className="ml-4 px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-md shadow-sm">
                {doctorInfo.experience}  experience
              </button>
            </div>
          </div>
          
          <div>
            <p className="font-semibold text-gray-800 flex items-center">
              About
              <img 
                src={assets.info_icon} 
                alt="info icon" 
                className="ml-2 w-4 h-4"
              />
            </p>
            <p className="text-gray-600 mt-2 leading-relaxed">{doctorInfo.about}</p>
          </div>
  
          <p className="text-lg font-semibold text-gray-800">
            Appointment Fees: <span className="text-green-500">{currencySymbol}{doctorInfo.fees}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Appointment