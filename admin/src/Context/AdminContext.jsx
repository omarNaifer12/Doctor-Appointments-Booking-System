import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';
export const AdminContext=createContext();
const AdminContextProvider=(props)=>{
    const [atoken,setAtoken]=useState(localStorage.getItem('atoken')?localStorage.getItem('atoken'):"");
    const [doctors,setDoctors]=useState([]);

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
    
    const value={
        atoken,
        setAtoken,
        backendUrl,
        doctors,
        getDoctors,
        setDoctors
    }
    return <AdminContext.Provider value={value}>
        {
            props.children
        }
    </AdminContext.Provider>
}
export default AdminContextProvider;