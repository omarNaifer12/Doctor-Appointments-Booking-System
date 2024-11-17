import React, { useContext } from 'react'
import { AdminContext } from '../Context/AdminContext'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
const Navbar = () => {
    const {atoken,setAtoken}=useContext(AdminContext);
    const navigate=useNavigate();
    const logout=()=>{
        navigate("/")
        atoken&&setAtoken("");
        atoken&&localStorage.removeItem("atoken");
    }
  
  return (
    <div className="w-full bg-white text-gray-800 px-6 py-4 flex justify-between items-center shadow-md">
            <div className="flex items-center space-x-4">
                <img src={assets.admin_logo} alt="Admin Logo" className="h-12 w-12" />
                <p className="text-xl font-semibold">{atoken ? 'Admin' : 'Doctor'}</p>
            </div>
            <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white font-semibold transition duration-200"
            >
                Logout
            </button>
        </div>
  )
}

export default Navbar