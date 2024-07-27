import React from 'react'
import {  useNavigate } from 'react-router-dom';

const Login = ({handleLogin}) => { 
 const navigate = useNavigate();
  const  handleLoginClick =()=>{
    handleLogin();
    navigate("/dashborad")
  }
  return (
    <div className='d-flex justify-content-center '>
        <h1>Login</h1>
        <button className='btn btn-outline-success my-5' onClick={handleLoginClick}>login</button>
    </div>
  )
}

export default Login