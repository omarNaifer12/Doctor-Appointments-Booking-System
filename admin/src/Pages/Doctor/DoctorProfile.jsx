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
    <div className="p-6 max-w-md mx-auto bg-gradient-to-r from-white to-blue-100 shadow-lg rounded-lg border border-gray-200">
      {isEdit ? (
        <label htmlFor="image" className="relative cursor-pointer group">
          <div className="relative">
            {/* Profile Image */}
            <img
              src={image ? URL.createObjectURL(image) : doctorInfo.image}
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
          src={image ? URL.createObjectURL(image) : doctorInfo.image}
          alt="Profile"
          className="w-32 h-32 rounded-full mx-auto mb-4 shadow-md border-4 border-blue-500"
        />
      )}
  
      <div className="text-center">
        {isEdit ? (
          <input
            value={doctorInfo.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className="text-center w-full p-2 mb-2 border rounded-md border-gray-300"
            placeholder="Full Name"
          />
        ) : (
          <h1 className="text-2xl font-semibold text-gray-700">{doctorInfo.name}</h1>
        )}
      </div>
  
      <hr className="my-4" />
  
      <div className="mt-4">
        <p className="text-xl font-semibold text-gray-800 mb-2">Details</p>
  
        {/* Email */}
        <div className="mt-2">
          <p className="text-gray-600 font-medium">Email</p>
          {isEdit ? (
            <input
              value={doctorInfo.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="w-full p-2 border rounded-md border-gray-300"
              placeholder="Email Address"
            />
          ) : (
            <p className="text-gray-800">{doctorInfo.email}</p>
          )}
        </div>
  
        {/* Speciality */}
        <div className="mt-2">
          <p className="text-gray-600 font-medium">Speciality</p>
          {isEdit ? (
            <input
              value={doctorInfo.speciality}
              onChange={(e) => handleInputChange("speciality", e.target.value)}
              className="w-full p-2 border rounded-md border-gray-300"
              placeholder="Speciality"
            />
          ) : (
            <p className="text-gray-800">{doctorInfo.speciality}</p>
          )}
        </div>
  
        {/* Degree */}
        <div className="mt-2">
          <p className="text-gray-600 font-medium">Degree</p>
          {isEdit ? (
            <input
              value={doctorInfo.degree}
              onChange={(e) => handleInputChange("degree", e.target.value)}
              className="w-full p-2 border rounded-md border-gray-300"
              placeholder="Degree"
            />
          ) : (
            <p className="text-gray-800">{doctorInfo.degree}</p>
          )}
        </div>
  
        {/* Experience */}
        <div className="mt-2">
          <p className="text-gray-600 font-medium">Experience</p>
          {isEdit ? (
            <input
              value={doctorInfo.experience}
              onChange={(e) => handleInputChange("experience", e.target.value)}
              className="w-full p-2 border rounded-md border-gray-300"
              placeholder="Experience"
            />
          ) : (
            <p className="text-gray-800">{doctorInfo.experience}</p>
          )}
        </div>
  
        {/* Address */}
        <div className="mt-2">
          <p className="text-gray-600 font-medium">Address</p>
          {isEdit ? (
            <div>
              <input
                value={doctorInfo.address.line1}
                onChange={(e) => handleAddressChange("line1", e.target.value)}
                className="w-full p-2 mb-2 border rounded-md border-gray-300"
                placeholder="Address Line 1"
              />
              <input
                value={doctorInfo.address.line2}
                onChange={(e) => handleAddressChange("line2", e.target.value)}
                className="w-full p-2 border rounded-md border-gray-300"
                placeholder="Address Line 2"
              />
            </div>
          ) : (
            <p className="text-gray-800">
              {doctorInfo?.address?.line1}
              <br />
              {doctorInfo?.address?.line2}
            </p>
          )}
        </div>
         {/* Fees */}
      <div className="mt-2">
        <p className="text-gray-600 font-medium">Fees</p>
        {isEdit ? (
          <input
            value={doctorInfo.fees}
            onChange={(e) => handleInputChange("fees", e.target.value)}
            className="w-full p-2 border rounded-md border-gray-300"
            placeholder="Consultation Fees"
          />
        ) : (
          <p className="text-gray-800">{doctorInfo.fees}</p>
        )}
      </div>

      {/* About */}
      <div className="mt-2">
        <p className="text-gray-600 font-medium">About</p>
        {isEdit ? (
          <textarea
            value={doctorInfo.about}
            onChange={(e) => handleInputChange("about", e.target.value)}
            className="w-full p-2 border rounded-md border-gray-300"
            placeholder="About the Doctor"
          />
        ) : (
          <p className="text-gray-800">{doctorInfo.about}</p>
        )}
      </div>
      </div>
  
      {/* Toggle Edit Mode */}
      <button
        onClick={(e) => submit(e)}
        className={`mt-6 w-full py-2 rounded-md font-semibold text-white transition ${
          isEdit
            ? "bg-green-500 hover:bg-green-600"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {isEdit ? "Save Changes" : "Edit Profile"}
      </button>
    </div>
  );
  
}

export default DoctorProfile