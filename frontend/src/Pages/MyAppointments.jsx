import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../Context/AppContext'

const MyAppointments = () => {
  const {doctors}=useContext(AppContext);

  return (
    <div className="container mx-auto px-4 py-6">
      <p className="text-2xl font-semibold text-gray-800 mb-4">My Appointments</p>
      <div className="space-y-4">
        {doctors.slice(0, 2).map((doc, index) => (
          <div
            key={index}
            className="flex items-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 hover:bg-gray-50"
          >
            {/* Doctor Profile */}
            <img
              src={doc.image}
              alt={doc.name}
              className="w-16 h-16 rounded-full object-cover mr-4"
            />
            <div className="flex-grow">
              <p className="text-lg font-semibold text-gray-700">{doc.name}</p>
              <p className="text-sm text-gray-500">{doc.speciality}</p>
              <div className="text-sm text-gray-600 mt-2">
                <p className="font-medium text-gray-800">Address:</p>
                <p>{doc.address.line1}</p>
                <p>{doc.address.line2}</p>
                {/* Date & Time Section */}
                <p className="font-semibold text-gray-800 mt-2">
                  Date & Time: 25, July, 2024 | 8:30 PM
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="ml-4 flex flex-col items-center justify-between">
              <button className="bg-white text-blue-500 py-2 px-4 rounded-lg border border-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-200">
                Pay Online
              </button>
              <button className="bg-white text-red-500 py-2 px-4 rounded-lg border border-red-500 hover:bg-red-500 hover:text-white transition-all duration-200 mt-2">
                Cancel Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyAppointments