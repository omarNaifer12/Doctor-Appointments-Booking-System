import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../Context/AppContext';
import axios from 'axios';
import {  toast } from 'react-toastify';
const MyProfile = () => {
  const {userData,setUserData,token,backendUrl}=useContext(AppContext);
  const [image,setImage]=useState(false);
  const [isEdit,setIsEdit]=useState(false);
  
  const handleInputChange = (field, value) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const handleAddressChange = (line, value) => {
    setUserData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [line]: value
      }
    }));
  };
const handleSubmitUpdate=async(e)=>{
  e.preventDefault();
  const formData = new FormData();

 
  formData.append("name",userData.name);
  formData.append("speciality",  userData.speciality);
  formData.append("address", JSON.stringify(userData.address));
  formData.append("gender",  userData.gender);
  formData.append("dob",userData.dob);
  formData.append("phone",userData.phone);
image&&formData.append("image",image);



 
try {
  const {data}=await axios.put(backendUrl+"/api/user/update",formData,{headers:{token}});
if(data.success){
toast.success(data.message);
}
  else{
    toast.error(data.message);
  }
} catch (error) {
  console.log(error);
  toast.error(error.message);
  
}
}
const submit=async(e)=>{
  if(isEdit){
   await handleSubmitUpdate(e);
    setIsEdit(!isEdit);
  }
  else{
    setIsEdit(!isEdit);
  }
}
  
  return userData&&(
    <div className="p-6 max-w-md mx-auto bg-gradient-to-r from-white to-blue-100 shadow-lg rounded-lg border border-gray-200">
     {isEdit ? (
    <label htmlFor="image" className="relative cursor-pointer group">
      <div className="relative">
        {/* Profile Image */}
        <img
          src={image ? URL.createObjectURL(image) : userData.image}
          alt="Profile"
          className="w-32 h-32 rounded-full mx-auto mb-4 shadow-lg border-4 border-blue-500 transition-transform transform group-hover:scale-105"
        />
        
        {/* Overlay Icon for Editing */}
        <div className="absolute inset-0 bg-blue-500 bg-opacity-40 flex items-center justify-center rounded-full transition-opacity opacity-0 group-hover:opacity-100">
          <img src={assets.upload_icon} alt="Upload" className="w-10 h-10 opacity-80" />
        </div>
      </div>
      <input
        onChange={(e) => setImage(e.target.files[0])}
        type="file"
        id="image"
        hidden
      />
    </label>
  ) : (
    <img
      src={image ? URL.createObjectURL(image) : userData.image}
      alt="Profile"
      className="w-32 h-32 rounded-full mx-auto mb-4 shadow-md border-4 border-blue-500"
    />
  )}
      <div className="text-center">
               
        {isEdit ? (
          <input 
            value={userData.name} 
            onChange={(e) => handleInputChange('name', e.target.value)} 
            className="text-center w-full p-2 mb-2 border rounded-md border-gray-300"
            placeholder="Full Name"
          />
        ) : (
          <h1 className="text-2xl font-semibold text-gray-700">{userData.name}</h1>
        )}
      </div>

      <hr className="my-4" />

      <div className="mt-4">
        <p className="text-xl font-semibold text-gray-800 mb-2">Contact Information</p>

        {/* Email */}
        <div className="mt-2">
          <p className="text-gray-600 font-medium">Email</p>
          {isEdit ? (
            <input 
              value={userData.email} 
              onChange={(e) => handleInputChange('email', e.target.value)} 
              className="w-full p-2 border rounded-md border-gray-300"
              placeholder="Email Address"
            />
          ) : (
            <p className="text-gray-800">{userData.email}</p>
          )}
        </div>

        {/* Phone */}
        <div className="mt-2">
          <p className="text-gray-600 font-medium">Phone</p>
          {isEdit ? (
            <input 
              value={userData.phone} 
              onChange={(e) => handleInputChange('phone', e.target.value)} 
              className="w-full p-2 border rounded-md border-gray-300"
              placeholder="Phone Number"
            />
          ) : (
            <p className="text-gray-800">{userData.phone}</p>
          )}
        </div>

        {/* Address */}
        <div className="mt-2">
          <p className="text-gray-600 font-medium">Address</p>
          {isEdit ? (
            <div>
              <input 
                value={userData.address.line1} 
                onChange={(e) => handleAddressChange('line1',e.target.value)} 
                className="w-full p-2 mb-2 border rounded-md border-gray-300"
                placeholder="Address Line 1"
              />
              <input 
               value={userData.address.line2} 
                onChange={(e) => handleAddressChange('line2', e.target.value)} 
                className="w-full p-2 border rounded-md border-gray-300"
                placeholder="Address Line 2"
              />
            </div>
          ) : (
            <p className="text-gray-800">{userData?.address?.line1}<br />{userData?.address?.line2}</p>
          )}
        </div>

        {/* Gender */}
        <div className="mt-2">
          <p className="text-gray-600 font-medium">Gender</p>
          {isEdit ? (
            <select 
              value={userData.gender} 
              onChange={(e) => handleInputChange('gender', e.target.value)}
              className="w-full p-2 border rounded-md border-gray-300"
            >
              <option value="Not Selected">Not Selected</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className="text-gray-800">{userData.gender}</p>
          )}
        </div>

        {/* Date of Birth */}
        <div className="mt-2">
          <p className="text-gray-600 font-medium">Date of Birth</p>
          {isEdit ? (
            <input 
              type="date"
              value={userData.dob==="Not Selected"?"":userData.dob} 
              onChange={(e) => handleInputChange('dob', e.target.value)} 
              className="w-full p-2 border rounded-md border-gray-300"
            />
          ) : (
            <p className="text-gray-800">{userData.dob}</p>
          )}
        </div>
      </div>

      {/* Toggle Edit Mode */}
      <button 
        onClick={(e) => submit(e)} 
        className={`mt-6 w-full py-2 rounded-md font-semibold text-white transition ${
          isEdit ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {isEdit ? "Save Changes" : "Edit Profile"}
      </button>
    </div>
  );
};

export default MyProfile