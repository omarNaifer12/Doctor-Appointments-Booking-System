import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
    const navigate=useNavigate();
  return (
    <div className=" py-10">
      <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto px-4 bg-white rounded-lg shadow-md">
        {/* Left Side */}
        <div className="flex flex-col items-start mb-6 md:mb-0 p-6">
          <p className="text-2xl font-bold text-gray-800">Book Appointment</p>
          <p className="text-lg text-gray-600">With 100 trusted doctors</p>
          <button
            onClick={() => {
              navigate('/login');
              window.scrollTo(0, 0);
            }}
            className="mt-4 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 ease-in-out"
          >
            Create Account
          </button>
        </div>

        {/* Right Side */}
        <div className="flex-shrink-0">
          <img 
            src={assets.appointment_img} 
            alt="Appointment" 
            className="w-full h-auto max-w-xs rounded-lg" 
          />
        </div>
      </div>
    </div>
  )
}

export default Banner