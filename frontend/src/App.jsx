import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './components/Login';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
function App() {
 
const token = localStorage.getItem("token");
  return (
    <BrowserRouter>
    <Routes>
<Route path='/login' element={<Login/>}/>
<Route path='/signUp' element={<SignUp/>}/>
<Route path='/dashboard' element={token ?<Dashboard/>: <Navigate to ="/login"/>}/>
<Route path='*' element={<Navigate to="/login"/>}/>

    </Routes>
    </BrowserRouter>
  )
}

export default App
