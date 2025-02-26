import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';
export const AdminContext=createContext();
const AdminContextProvider=(props)=>{
    const [atoken,setAtoken]=useState(localStorage.getItem('atoken')?localStorage.getItem('atoken'):"");
    const [doctors,setDoctors]=useState([]);
    const [appointments,setAppointments]=useState([]);
    

    const backendUrl=import.meta.env.VITE_BACKEND_URL;
    const getDoctors=async()=>{
        console.log('token',atoken);
        
        try {
            const {data}=await axios.get(backendUrl+'/api/admin/all-doctors',{headers:{atoken}});
           
           console.log("data doctors",data);
           
            if(data.success){
            setDoctors(data.doctors);
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {
            console.log("error",error);
            toast.error(error.message);
        }
    }
    const getAllAppointments=async()=>{
        try {
            const {data}=await axios.get(backendUrl+'/api/admin/appointments',{headers:{atoken}});
            if(data.success){
                setAppointments(data.appointments);

            }
        } catch (error) {
            console.log(error)
        }
    }
    const cancelAppointment=async(appointmentId)=>{
        try {
          const {data}=await axios.post(backendUrl+"/api/admin/cancel-appointments",{appointmentId},{headers:{atoken}});
          if(data.success){
      toast.success(data.message);
      getAllAppointments();
          }
          else{
            toast.error(data.message);
          }
        } catch (error) {
          console.log("error",error);
          toast.error(error.message);
          
        }
      }
    const value={
        atoken,
        setAtoken,
        backendUrl,
        doctors,
        getDoctors,
        setDoctors,
        appointments,getAllAppointments,cancelAppointment
    }
    return <AdminContext.Provider value={value}>
        {
            props.children
        }
    </AdminContext.Provider>
}
export default AdminContextProvider;