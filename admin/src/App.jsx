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
const App = () => {
  const {atoken}=useContext(AdminContext);
  useEffect(()=>{
    console.log("token",atoken);
  })
 
  
  return atoken? (
    <div >
      
      <ToastContainer /> 
      <Navbar />
      <div>
        <SideBar />
        <Routes>
          <Route path='/' element={<></>}/>
          <Route path='/admin-dashboard' element={<Dashboard />}/>
          <Route path='/all-appointments' element={< AllAppointments/>}/>
          <Route path='/add-doctor' element={<AddDoctor />}/>
          <Route path='/doctor-list' element={<DoctorsList />}/>
        </Routes>
      </div>
    </div>
  ):(<>
    <Login />
    <ToastContainer />
  </>)
  
}

export default App