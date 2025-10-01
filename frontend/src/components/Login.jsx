import React, { useState } from 'react'
import API from '../api'
import { Navigate, useNavigate } from 'react-router-dom'

const Login = () => {
  const[form,setForm]=useState({email:"",password:""})
  const[msg,setMsg]=useState("")
  const[errors,setErrors]=useState({})
    const navigate = useNavigate()

  const handleChange=(e)=>{
setForm({...form,[e.target.name]:e.target.value})
  }
  const validate=()=>{
    let newErrors={}
     if(!form.email){
        newErrors.email="eemail is required"
    }
    else if(!/\S+@\S+\.\S+/.test(form.email)){
newErrors.email="emaail not vallid"
    }
     if(!form.password) newErrors.password="passwordd required"
     else if(form.password.length<6){
        newErrors.password="password should be greateer than 6"
     }
     setErrors(newErrors)
   return  Object.keys(newErrors).length===0
  }
  const handleSubmit=async(e)=>{
e.preventDefault()
  if(!validate()) return
try{
const res=await API.post("/auth/login",form)
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard")
}catch(err){
setMsg(err.response?.data?.message ||"error")
}
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>

           <div>
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        </div>
         <div>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
          {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
        </div>
<button type="submit">Register</button>
      </form>
      <p>{msg}</p>
    </div>
  )
}

export default Login
