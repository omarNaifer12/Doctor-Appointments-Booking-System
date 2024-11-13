import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../Context/AppContext';
const Navbar = () => {
    const navigate=useNavigate();
    const {token,setToken}=useContext(AppContext);
    const logout=()=>{
        setToken("");
        localStorage.removeItem("utoken");
    }
  return (
    <div className='flex items-center  justify-between text-sm py-4 mb-4 border-b border-b-gray-400'> 
        <img className='w-44 cursor-pointer' src={assets.logo}/>
        <ul className='hidden md:flex items-center gap-5 font-medium'>
        <NavLink to='/'>
            <li className='py-1'>Home</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto'/>
        </NavLink>
        <NavLink to='/doctors'>
            <li className='py-1'>All Doctors</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto'/>
        </NavLink>
         <NavLink to='/about'>
            <li className='py-1'>About</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto'/>
        </NavLink>
         <NavLink to='/contact'>
            <li className='py-1'>Contact</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto'/>
        </NavLink>
        </ul>
        <div className='flex items-center gap-4'>
            {
                token?<div className='flax items-center gap-2 cursor-pointer group relative'> 
                  
                    <img  className='w-8 rounded-full' src={assets.profile_pic}/>
                    <img className='w-2.5' src={assets.dropdown_icon}/>
                    <div className=' absolute top-0 right-0 pt-14 text-base text-gray-600 z-20 hidden group-hover:block'>
                        <div className='min-w-48 bg-stone-100 flex flex-col gap-4 p-4'>
                            <p onClick={()=>navigate('/my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                            <p  onClick={()=>navigate('/my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                            <p onClick={()=>logout()} className='hover:text-black cursor-pointer'>logout</p>
                        </div>
                    </div>

                </div>:<button onClick={()=>navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'>create account</button>

            }    
            </div>
    </div>
  )
}

export default Navbar