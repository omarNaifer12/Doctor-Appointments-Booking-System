import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../Context/AppContext'
import { useNavigate } from 'react-router-dom';

const RelatedDoctors = ({speciality,docId}) => {
    const {doctors}=useContext(AppContext);
    const [relatedDoc,setRelatedDoc]=useState([]);
    const navigate=useNavigate();
useEffect(()=>{
const fetchRelatedDoc=()=>{
    
    const relDoc=doctors.filter((item)=>{
        return item.speciality===speciality&&docId!=item.docId
    });
    setRelatedDoc(relDoc);

}
if(doctors.length&&speciality){
    fetchRelatedDoc();
}

},[docId,speciality,doctors])
  return (
    <div className="py-10 bg-gray-50">
    <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">related Doctors</h1>
    <p className="text-lg text-center text-gray-600 mb-6">Simply browse through</p>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 px-4">
      {relatedDoc.slice(0, 10).map((doctor, index) => (
        <div onClick={()=>{navigate(`/appointment/${doctor._id}`); scrollTo(0,0)}}
          key={index} 
          className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200 ease-in-out hover:cursor-pointer transform hover:scale-105"
        >
          <img 
            src={doctor.image} 
            alt={doctor.name} 
            className="w-full h-48 object-cover rounded-md mb-4" 
          />
          <div>
            <div className="flex justify-between items-center mb-2">
              <p className="text-green-500 font-semibold">Available</p>
            </div>
            <p className="text-lg font-semibold text-gray-800">{doctor.name}</p>
            <p className="text-gray-600">{doctor.speciality}</p>
          </div>
        </div>
      ))}
    </div>

  </div>
  )
}

export default RelatedDoctors