import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import AppContextProvider from './Context/AppContext.jsx'
import DoctorContextProvider from './Context/DoctorContext.jsx'
import AdminContextProvider from './Context/AdminContext.jsx'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AppContextProvider>
    <DoctorContextProvider>
      <AdminContextProvider>
      <App />
      </AdminContextProvider>
    </DoctorContextProvider>
  </AppContextProvider>
  
  </BrowserRouter>,
)
