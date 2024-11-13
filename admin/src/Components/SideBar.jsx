import React, { useContext } from 'react'
import { AdminContext } from '../Context/AdminContext'
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

const SideBar = () => {
    const {atoken}=useContext(AdminContext);
  return (
    <div className="h-full w-60 bg-white fixed top-25 left-0 shadow-md border-r border-gray-200 ">
            {atoken && (
                <ul className="flex flex-col space-y-4 p-4">
                    <NavLink 
                        to={'/admin-dashboard'} 
                        className="flex items-center space-x-3 hover:bg-gray-100 px-3 py-2 rounded-md transition duration-200"
                        
                    >
                        <img src={assets.home_icon} alt="Dashboard" className="h-6 w-6" />
                        <p className="text-gray-800 text-lg">Dashboard</p>
                    </NavLink>

                    <NavLink 
                        to={'/all-appointments'} 
                        className="flex items-center space-x-3 hover:bg-gray-100 px-3 py-2 rounded-md transition duration-200"
                     
                    >
                        <img src={assets.appointment_icon} alt="Appointments" className="h-6 w-6" />
                        <p className="text-gray-800 text-lg">Appointments</p>
                    </NavLink>

                    <NavLink 
                        to={'/add-doctor'} 
                        className="flex items-center space-x-3 hover:bg-gray-100 px-3 py-2 rounded-md transition duration-200"
                        
                    >
                        <img src={assets.add_icon} alt="Add Doctor" className="h-6 w-6" />
                        <p className="text-gray-800 text-lg">Add Doctor</p>
                    </NavLink>

                    <NavLink 
                        to={'/doctor-list'} 
                        className="flex items-center space-x-3 hover:bg-gray-100 px-3 py-2 rounded-md transition duration-200"
                       
                    >
                        <img src={assets.people_icon} alt="Doctors List" className="h-6 w-6" />
                        <p className="text-gray-800 text-lg">Doctors List</p>
                    </NavLink>
                </ul>
            )}
        </div>
  )
}

export default SideBar