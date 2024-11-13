import { createContext, useEffect, useState } from "react";
import { doctors } from "../assets/assets";
import axios from "axios"
import {  toast } from 'react-toastify';
export const AppContext=createContext();
const AppContextProvider=(props)=>{
    const currencySymbol='$';
    const backendUrl=import.meta.env.VITE_BACKEND_URL;
    const [doctors,setDoctors]=useState([]);
    const [token,setToken]=useState(localStorage.getItem("utoken")?localStorage.getItem("utoken"):"");
    const [userData,setUserData]=useState({});
    const fetchUserData=async()=>{
        try {
            const {data}=await axios.get(backendUrl+"/api/user/profile",{headers:{token}});
            console.log('user data',data.user);
            if(data.success){
                setUserData(data.user);
            }
        } catch (error) {
            console.log(error);
            
            toast.error(error.message);
        }
    }
const getDoctorsData=async()=>{
    try {
        const {data}=await axios.get(backendUrl+"/api/doctor/list");
        if(data.success){
            setDoctors(data.doctors);
        }else{
            toast.error(data.message);
        }
    } catch (error) {
        console.log(error);
        toast.error(error.message)
    }
}
useEffect(()=>{
if(token){
    fetchUserData();
}
else{
    setUserData({});
}
},[token])
useEffect(()=>{
    getDoctorsData();
},[doctors])
    const value={
doctors,currencySymbol,
backendUrl,
token,
setToken,
userData,
setUserData,
fetchUserData
    }
    return(
        <AppContext.Provider value={value}>
{
    props.children
}
        </AppContext.Provider>
    )
}
export default AppContextProvider