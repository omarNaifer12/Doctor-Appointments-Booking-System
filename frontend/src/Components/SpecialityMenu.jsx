import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'
const SpecialityMenu = () => {
  return (
    <div id="speciality" className="py-10 bg-gray-100">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Find By Speciality</h1>
      <p className="text-lg text-center text-gray-600 mb-6">Simply browse through</p>
      <div className="flex overflow-x-auto space-x-4 p-4">
        {specialityData.map((item, index) => {
          console.log("reach map doctors", item);

          return (
            <Link onClick={()=>scrollTo(0,0)}
              key={index} 
              to={`/doctors/${item.speciality}`} 
              className=" flex flex-col items-center bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-200 ease-in-out"
            >
              <img 
                src={item.image} 
                alt={item.speciality} 
                className="w-24 h-24 rounded-full mb-2 object-cover" 
              />
              <p className="text-lg font-semibold text-gray-700">{item.speciality}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
export default SpecialityMenu