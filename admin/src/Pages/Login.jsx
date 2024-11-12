import React, { useContext, useState } from 'react'
import { AdminContext } from '../Context/AdminContext';
import axios from "axios"
import {  toast } from 'react-toastify';
const Login = () => {
    const [state,setState]=useState('Admin');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('')
    const {setAtoken,backendUrl}=useContext(AdminContext);
    const onSubmitHandler=async(e)=>{
        e.preventDefault();
        try {
       
            
            if(state==="Admin"){
                const {data}=await axios.post(backendUrl+"/api/admin/login",{email,password});
                console.log("data result ",data);
                
                if(data.success){
                    console.log("data token",data.atoken);
                    setAtoken(data.atoken);
                    localStorage.setItem("atoken",data.atoken); 
                }
                else{
                    toast.error(data.message);
                }
            }
            else{

            }
        } catch (error) {
            console.log("error",error);
            
        }
    }
  return (
    <form onSubmit={(e)=>onSubmitHandler(e)}>
         <div>
            <p><span>{state}</span> Login</p>
            <div >
          <label >Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Enter your email"
           
            required 
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Enter your password"
           
            required 
          />
        </div>

        <button 
          type="submit">login</button>
          {
            state==='Admin'?<p><span onClick={()=>setState('Doctor')}>doctor login</span> Click here </p>:<p><span onClick={()=>setState('Admin')}>admin login</span> Click here </p>
          }

        </div>

    </form>
   
  )
}

export default Login