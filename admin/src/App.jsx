import React, { useContext, useEffect } from 'react'
import Login from './Pages/Login'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './Context/AdminContext';
import Navbar from './Components/Navbar';
import SideBar from './Components/SideBar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './Pages/Admin/Dashboard';
import AllAppointments from './Pages/Admin/AllAppointments';
import AddDoctor from './Pages/Admin/AddDoctor';
import DoctorsList from './Pages/Admin/DoctorsList';
import { DoctorContext } from './Context/DoctorContext';
import DoctorDashboard from './Pages/Doctor/DoctorDashboard';
import DoctorAppointments from './Pages/Doctor/DoctorAppointments';
import DoctorProfile from './Pages/Doctor/DoctorProfile';
const App = () => {
  const {atoken}=useContext(AdminContext);
  const {dtoken}=useContext(DoctorContext);
  useEffect(()=>{
    console.log("token",dtoken);
  },[]);
 
  
  return atoken||dtoken? (
    <div className="flex flex-col min-h-screen">
      <ToastContainer />
      {/* Navbar stays at the top */}
      <Navbar />

      <div className="flex flex-1">
        {/* Sidebar on the left */}
        <SideBar />

        {/* Main content area */}
        <div className="flex-1 ml-60 p-6 overflow-y-auto">
          <Routes>
            {/*admin route */}
            <Route path="/" element={<></>} />
            <Route path="/admin-dashboard" element={<Dashboard />} />
            <Route path="/all-appointments" element={<AllAppointments />} />
            <Route path="/add-doctor" element={<AddDoctor />} />
            <Route path="/doctor-list" element={<DoctorsList />} />
            {/*doctor route */}
            <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
            <Route path="/doctor-appointments" element={<DoctorAppointments />} />
            <Route path="/doctor-profile" element={<DoctorProfile />} />

          
          </Routes>
        </div>
      </div>
    </div>
  ):(<>
    <Login />
    <ToastContainer />
  </>)
  
}

export default App