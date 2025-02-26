import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Doctor from './Pages/Doctor'
import Contact from './Pages/Contact'
import Login from './Pages/Login'
import MyProfile from './Pages/MyProfile'
import About from './Pages/About'
import MyAppointments from './Pages/MyAppointments'
import Appointment from './Pages/Appointment'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import SuccessPayment from './Pages/SuccessPayment'
import CancelPayment from './Pages/CancelPayment'
const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer />
    <Navbar />
  <Routes>
    <Route path='/' element={<Home />}/>
    <Route path='/doctors' element={<Doctor />}/>
    <Route path='/contact' element={<Contact />}/>
    <Route path='/doctors/:speciality' element={<Doctor />}/>
    <Route path='/login' element={<Login />}/>
    <Route path='/my-profile' element={<MyProfile />}/>
    <Route path='/about' element={<About />}/>
    <Route path='/my-appointments' element={<MyAppointments />}/>
    <Route path='/appointment/:docId' element={<Appointment />}/>
    <Route path='/paypalsuccess' element={<SuccessPayment />}/>
    <Route path='/paypalCancel' element={<CancelPayment />}/>
  </Routes>

    </div>
  )
}
export default App