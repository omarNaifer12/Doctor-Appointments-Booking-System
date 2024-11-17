import { useState } from "react";
import { createContext } from "react";
import axios from 'axios'
import { toast } from 'react-toastify';
export const DoctorContext=createContext();
const DoctorContextProvider=(props)=>{
    const backendUrl=import.meta.env.VITE_BACKEND_URL;
    const [dtoken,setDtoken]=useState(localStorage.getItem("dtoken")?localStorage.getItem("dtoken"):null);
    const [appointmentsDoc,setAppointmentsDoc]=useState([]);
    const cancelAppointmentDoc=async(appointmentId)=>{
        try {
            const {data}=await axios.post(backendUrl+"/api/doctor/cancel-appointment",{appointmentId},{headers:{dtoken}});
            if(data.success){
                toast.success(data.message);
                fetchAppointmentsDoc();
            }
            else{
                toast.error(data.message);

            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
            
        }
    }
    const completedAppointmentDoc=async(appointmentId)=>{
        try {
            const {data}=await axios.post(backendUrl+"/api/doctor/completed-appointment",{appointmentId},{headers:{dtoken}});
            if(data.success){
                toast.success(data.message);
                fetchAppointmentsDoc();
            }
            else{
                toast.error(data.message);

            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
            
        }
    }
    const fetchAppointmentsDoc=async()=>{
        try {
            const {data}=await axios.get(backendUrl+"/api/doctor/appointments",{headers:{dtoken}});
            console.log("data after appoint doc",data);
            if(data.success){
                setAppointmentsDoc(data.appointments.reverse());
            }
        } catch (error) {
            console.log(error);
        }
    }
   
    const value={
        backendUrl,
        dtoken,setDtoken,fetchAppointmentsDoc,appointmentsDoc,setAppointmentsDoc,
        cancelAppointmentDoc,completedAppointmentDoc

        

    }
    return <DoctorContext.Provider value={value}>
        {
            props.children
        }
    </DoctorContext.Provider>
}
export default DoctorContextProvider;