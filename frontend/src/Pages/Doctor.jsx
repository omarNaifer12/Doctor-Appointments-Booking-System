import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../Context/AppContext';
import { doctors } from '../assets/assets';

const Doctor = () => {
  const {speciality}=useParams();
  const {doctors}=useContext(AppContext);
  const [filterDoc,setFilterDoc]=useState([]);
  const navigate=useNavigate();
  const applyFilter=()=>{
    console.log("enter here ",doctors);
    
    if(speciality){
      setFilterDoc(doctors.filter(doc=>doc.speciality===speciality))
    }
    else{
      setFilterDoc(doctors);
    }
  }
  useEffect(()=>{
applyFilter();
  },[speciality])
  return (
    <div>
    <div className="flex flex-col lg:flex-row gap-8">
    {/* Left side - Specialties List */}
    <div className="p-6 bg-blue-50 rounded-lg shadow-md border border-blue-200">
      <p className="text-2xl font-bold text-blue-800 mb-4">Doctors Speciality</p>
      <ul className="space-y-3">
      <li 
  onClick={() => speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician')} 
  className={`${speciality === 'General physician' ? 'text-blue-700 font-bold' : 'text-gray-700 font-medium'} hover:text-blue-700 transition duration-200 cursor-pointer`}
>
  General physician
</li>

<li 
  onClick={()=> speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')} 
  className={`${speciality === 'Gynecologist' ? 'text-blue-700 font-bold' : 'text-gray-700 font-medium'} hover:text-blue-700 transition duration-200 cursor-pointer`}
>
  Gynecologist
</li>

<li 
  onClick={() => speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')} 
  className={`${speciality === 'Dermatologist' ? 'text-blue-700 font-bold' : 'text-gray-700 font-medium'} hover:text-blue-700 transition duration-200 cursor-pointer`}
>
  Dermatologist
</li>

<li 
  onClick={() => speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')} 
  className={`${speciality === 'Pediatricians' ? 'text-blue-700 font-bold' : 'text-gray-700 font-medium'} hover:text-blue-700 transition duration-200 cursor-pointer`}
>
  Pediatricians
</li>

<li 
  onClick={() => speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')} 
  className={`${speciality === 'Neurologist' ? 'text-blue-700 font-bold' : 'text-gray-700 font-medium'} hover:text-blue-700 transition duration-200 cursor-pointer`}
>
  Neurologist
</li>

<li 
  onClick={() => speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')} 
  className={`${speciality === 'Gastroenterologist' ? 'text-blue-700 font-bold' : 'text-gray-700 font-medium'} hover:text-blue-700 transition duration-200 cursor-pointer`}
>
  Gastroenterologist
</li>      </ul>
    </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"> 
          {
            filterDoc.map((doctor, index) => (
              <div onClick={()=>navigate(`/appointment/${doctor._id}`)}
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
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Doctor