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
        
        } catch (error) {
            console.log("error",error);
            
        }
    }
    return (
      <form 
        onSubmit={(e) => onSubmitHandler(e)} 
        className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg space-y-6 border border-gray-200"
      >
        <div className="text-center">
          <p className="text-2xl font-semibold text-gray-800">
            <span className="text-blue-500">{state}</span> Login
          </p>
        </div>
    
        <div>
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Enter your email"
            required
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
    
        <div>
          <label className="block text-gray-700 font-medium mb-2">Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Enter your password"
            required 
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
    
        <button 
          type="submit"
          className="w-full py-2 mt-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
        >
          Login
        </button>
    
        <div className="text-center mt-4">
          {state === 'Admin' ? (
            <p className="text-gray-600">
              Want to login as a Doctor?{' '}
              <span 
                onClick={() => setState('Doctor')}
                className="text-blue-500 hover:underline cursor-pointer font-medium"
              >
                Click here
              </span>
            </p>
          ) : (
            <p className="text-gray-600">
              Want to login as an Admin?{' '}
              <span 
                onClick={() => setState('Admin')}
                className="text-blue-500 hover:underline cursor-pointer font-medium"
              >
                Click here
              </span>
            </p>
          )}
        </div>
      </form>
   
  )
}

export default Login