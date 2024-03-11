import React, { useState } from 'react'
import './style.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const login = () => {

  const[values, setvalues]=useState({
    email:'',
    password:''
  })

  const navigate= useNavigate()
  axios.defaults.withCredentials=true;

const handleSubmit=(event)=>{
  event.preventDefault()
  axios.post('http://localhost:3000/auth/adminlogin' , values)
  .then(result => {
    if (result.data.loginStatus){}

    navigate('/dashboard') 
  })
  .catch(err => console.log(err))


}


  return (
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
      <div className='p-5 rounded w-25 border loginForm'>
        <h2><center>Welcome To The Login Page</center></h2>
        <form onSubmit={handleSubmit}>
            <div className='mb-3'>
                <label htmlFor='email'><strong>Email:</strong></label>
                <input type="email" name='email' autoComplete='off' placeholder='Enter Your Email'
                onChange={(e)=> setvalues({...values,email :e.target.value})} className='form-control rounded-0'/>
            </div>
            <br></br>

            <div className='mab-3'>
                <label htmlFor='password'><strong>Password:</strong></label>
                <input type="password" name='password'  placeholder='Enter Your Password'
                onChange={(e)=> setvalues({...values,password :e.target.value})}className='form-control rounded-0'/>
            </div>
            <br></br>
        
            <button class name='btn btn-success w-100 rounded-0 mb-2'>Log In</button>

            <br></br>
            <br></br>

            <div className='mb-1' ><center>
                <input type="checkbox" name="tick" id="tick" />
                You are agree with terms & conditions</center>  
            </div>
        </form>
      </div>
    </div>
  )
}

export default login
