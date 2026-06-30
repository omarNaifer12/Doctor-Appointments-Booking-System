import React from 'react'
import { useContext } from 'react'
import { DoctorContext } from '../../Context/DoctorContext'
import { useState } from 'react';
import { useEffect } from 'react';
import { assets } from '../../assets/assets';
import axios from "axios"
const DoctorProfile = () => {
  const {doctorInfo,setDoctorInfo,getDoctorInfo,dtoken,backendUrl}=useContext(DoctorContext);
  const [image,setImage]=useState(false);
  const [isEdit, setIsEdit] = useState(false);
  useEffect(()=>{
if(dtoken){
  getDoctorInfo();
}
  },[dtoken])
  const handleInputChange = (field, value) => {
    setDoctorInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddressChange = (field, value) => {
    setDoctorInfo((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value,
      },
    }));
  };
  const handleUpdateSubmit=async(e)=>{
    e.preventDefault();

    try {
      const formData = new FormData();

     
      for (const key in doctorInfo) {
        if (key === "address") {
          formData.append(key, JSON.stringify(doctorInfo[key])); // Handle nested object
        } else if(key!=="image"){
          formData.append(key, doctorInfo[key] || "");
        }
      }

      // Append the selected image if available
      if (image) {
        formData.append("image", image);
      }

      const response = await axios.put(
        backendUrl+"/api/doctor/update", // Adjust API endpoint as needed
        formData,
        {
          headers: {
           dtoken
          },
        }
      );

      if (response.data.success) {
        setDoctorInfo(response.data.doctor); // Update the context
        alert("Profile updated successfully!");
      } else {
        alert(response.data.message || "Update failed!");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating the profile.");
    }

  }
  const submit=(e)=>{
    if(isEdit){
      handleUpdateSubmit(e);
    setIsEdit(false);
    }
    else{
      setIsEdit(true);
    }
  }

  return doctorInfo && (
    <div className="p-8 max-w-md mx-auto bg-white shadow-sm rounded-2xl border border-slate-200">
      {isEdit ? (
        <label htmlFor="image" className="relative cursor-pointer group block">
          <div className="relative w-32 h-32 mx-auto mb-4">
            {/* Profile Image */}
            <img
              src={image ? URL.createObjectURL(image) : doctorInfo.image}
              alt="Profile"
              className="w-32 h-32 rounded-2xl object-cover shadow-sm ring-2 ring-indigo-500 transition-transform transform group-hover:scale-105"
            />
            {/* Overlay Icon for Editing */}
            <div className="absolute inset-0 bg-indigo-600 bg-opacity-40 flex items-center justify-center rounded-2xl transition-opacity opacity-0 group-hover:opacity-100">
              <img src={assets.upload_icon} alt="Upload" className="w-10 h-10 opacity-90" />
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
          src={image ? URL.createObjectURL(image) : doctorInfo.image}
          alt="Profile"
          className="w-32 h-32 rounded-2xl object-cover mx-auto mb-4 shadow-sm ring-2 ring-indigo-500"
        />
      )}
  
      <div className="text-center">
        {isEdit ? (
          <input
            value={doctorInfo.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className="text-center w-full p-2 mb-2 border rounded-lg border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Full Name"
          />
        ) : (
          <h1 className="text-2xl font-bold text-slate-800">{doctorInfo.name}</h1>
        )}
      </div>
  
      <div className="my-5 border-t border-slate-100" />
  
      <div className="mt-4">
        <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wide mb-3">Details</p>
  
        {/* Email */}
        <div className="mt-3">
          <p className="text-slate-500 text-sm font-medium">Email</p>
          {isEdit ? (
            <input
              value={doctorInfo.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="w-full p-2 border rounded-lg border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Email Address"
            />
          ) : (
            <p className="text-slate-800">{doctorInfo.email}</p>
          )}
        </div>
  
        {/* Speciality */}
        <div className="mt-3">
          <p className="text-slate-500 text-sm font-medium">Speciality</p>
          {isEdit ? (
            <input
              value={doctorInfo.speciality}
              onChange={(e) => handleInputChange("speciality", e.target.value)}
              className="w-full p-2 border rounded-lg border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Speciality"
            />
          ) : (
            <p className="text-slate-800">{doctorInfo.speciality}</p>
          )}
        </div>
  
        {/* Degree */}
        <div className="mt-3">
          <p className="text-slate-500 text-sm font-medium">Degree</p>
          {isEdit ? (
            <input
              value={doctorInfo.degree}
              onChange={(e) => handleInputChange("degree", e.target.value)}
              className="w-full p-2 border rounded-lg border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Degree"
            />
          ) : (
            <p className="text-slate-800">{doctorInfo.degree}</p>
          )}
        </div>
  
        {/* Experience */}
        <div className="mt-3">
          <p className="text-slate-500 text-sm font-medium">Experience</p>
          {isEdit ? (
            <input
              value={doctorInfo.experience}
              onChange={(e) => handleInputChange("experience", e.target.value)}
              className="w-full p-2 border rounded-lg border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Experience"
            />
          ) : (
            <p className="text-slate-800">{doctorInfo.experience}</p>
          )}
        </div>
  
        {/* Address */}
        <div className="mt-3">
          <p className="text-slate-500 text-sm font-medium">Address</p>
          {isEdit ? (
            <div>
              <input
                value={doctorInfo.address.line1}
                onChange={(e) => handleAddressChange("line1", e.target.value)}
                className="w-full p-2 mb-2 border rounded-lg border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Address Line 1"
              />
              <input
                value={doctorInfo.address.line2}
                onChange={(e) => handleAddressChange("line2", e.target.value)}
                className="w-full p-2 border rounded-lg border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Address Line 2"
              />
            </div>
          ) : (
            <p className="text-slate-800">
              {doctorInfo?.address?.line1}
              <br />
              {doctorInfo?.address?.line2}
            </p>
          )}
        </div>
         {/* Fees */}
      <div className="mt-3">
        <p className="text-slate-500 text-sm font-medium">Fees</p>
        {isEdit ? (
          <input
            value={doctorInfo.fees}
            onChange={(e) => handleInputChange("fees", e.target.value)}
            className="w-full p-2 border rounded-lg border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Consultation Fees"
          />
        ) : (
          <p className="text-slate-800">{doctorInfo.fees}</p>
        )}
      </div>

      {/* About */}
      <div className="mt-3">
        <p className="text-slate-500 text-sm font-medium">About</p>
        {isEdit ? (
          <textarea
            value={doctorInfo.about}
            onChange={(e) => handleInputChange("about", e.target.value)}
            className="w-full p-2 border rounded-lg border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="About the Doctor"
          />
        ) : (
          <p className="text-slate-800">{doctorInfo.about}</p>
        )}
      </div>
      </div>
  
      {/* Toggle Edit Mode */}
      <button
        onClick={(e) => submit(e)}
        className={`mt-6 w-full py-2.5 rounded-full font-semibold text-white transition-colors duration-200 ${
          isEdit
            ? "bg-emerald-500 hover:bg-emerald-600"
            : "bg-indigo-600 hover:bg-indigo-700"
        }`}
      >
        {isEdit ? "Save Changes" : "Edit Profile"}
      </button>
    </div>
  );
  
}

export default DoctorProfile