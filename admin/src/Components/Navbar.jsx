import React, { useContext } from 'react'
import { AdminContext } from '../Context/AdminContext'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {
    const {atoken,setAtoken}=useContext(AdminContext);
    const navigate=useNavigate();
    const logout=()=>{
        navigate("/")
        atoken&&setAtoken("");
        atoken&&localStorage.removeItem("atoken");
    }
  return (
    <div>
        <div>
        <img src={assets.admin_logo}/>
        <p>{atoken?'Admin':'Doctor'}</p>
        </div>
        <button>logout</button>
        
    </div>
  )
}

export default Navbar