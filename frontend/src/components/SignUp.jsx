import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import API from '../api';

const SignUp = () => {
    const [form, setForm] = useState({ name: "", email: "", password: "" ,role:"user"});
  const [msg, setMsg] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange=(e)=>{
    setForm({...form,[e.target.name]:e.target.value})
  }
  const validate=()=>{
    let newErrors={}
    if(!form.name.trim()) newErrors.name="name required"
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
    return Object.keys(newErrors).length===0
  }
 const handleSubmit=async(e)=>{
    e.preventDefault()
    if(!validate()) return
 
 try{
    const res= await API.post("/auth/register",form)
    localStorage.setItem("token",res.data.token)
    navigate("/dashboard");
    console.log(res)
 }
 catch(err){
setMsg(err.response?.data?.message || "error")
 }}
  return (
    <div>
      <h2>register</h2>
      <form onSubmit={handleSubmit}>
        <div>
<input name='name' placeholder=" enter your name" onChange={handleChange}value={form.name}/>
{errors.name && <p style={{color:"red"}}>{errors.name}</p>}
</div>
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
   <select
          name="role"
          value={form.role}
          onChange={handleChange}
          
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </form>
          <p>{msg}</p>
    </div>
  )
}

export default SignUp
