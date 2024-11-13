import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../Context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [state,setState]=useState('Sign Up');
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [name,setName]=useState('')
  const {setToken,backendUrl,token}=useContext(AppContext);
  const navigate=useNavigate();
  const onSubmitHandler=async(e)=>{
    e.preventDefault();
    let  url;
    if(state==='Sign Up'){
      url=backendUrl+"/api/user/register";
    }
    else{
      url=backendUrl+"/api/user/login";
    }
    try {
      const user={
        email,
        password,
        name
      }
      const {data}=await axios.post(url,user);
      console.log("data user after login or sign up",data);
      if(data.success){
       
        setToken(data.token);
        localStorage.setItem("utoken",data.token);
        setEmail("");
        setName("");
        setPassword("");

      }
      else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  useEffect(()=>{
    if(token){
      navigate('/');
    }

  },[token])
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form 
        onSubmit={onSubmitHandler} 
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">{state}</h2>
        <p className="text-center text-gray-600 mb-6">Please {state.toLowerCase()} to book an appointment</p>
        
        {state === 'Sign Up' && (
          <div className="mb-4">
            <label className="block text-gray-700">Full Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Enter your full name"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required 
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Enter your email"
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required 
          />
        </div>

        <button 
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          {state === 'Sign Up' ? 'Sign Up' : 'Login'}
        </button>

        <p 
          onClick={() => setState(state === 'Sign Up' ? 'Login' : 'Sign Up')}
          className="text-center text-blue-500 mt-4 cursor-pointer hover:underline"
        >
          {state === 'Sign Up' ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
        </p>
      </form>
    </div>
  )
}

export default Login