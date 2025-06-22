

import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Login() {
  const navigate = useNavigate()
  const [formData,setFormData] = useState({
    email:"",
    password:"",
    userType:""
  })

  const handleChange = (e) =>{
    const {name,value} = e.target 
    setFormData((prev)=>({
      ...prev,[name]:value
    }))
  }

  const handleSubmit = async(e) =>{
    e.preventDefault()
    try{

      const res = await axios.post("http://localhost:2000/api/loginUser",formData)
      console.log(res.data)
      const {status,success,token,user} = res.data 
      // console.log(status)
      // console.log(success)
      // console.log(token)
      // console.log(user)
      if(!success){
        toast.error("user is not login successfully")
      }else{
        toast.success("user is successfully login")
        localStorage.setItem("token",token)
        localStorage.setItem("userType",user.userType)
        localStorage.setItem("userId",user.id)

        const userType = localStorage.getItem("userType")

      setTimeout(() => {
        if(userType === "admin"){
          navigate("/admin/dashboard")
        }
        if(userType === "user"){
          navigate("/user/dashboard")
        }
        if(userType === "owner"){
          navigate("/owner/dashboard")
        }else{
          toast.error("userType is not match")
        }

      }, 3000);
      }

    }catch(err){
      console.log(err)
    }
  }
  
  return (
    <div style={containerStyle}>
      <ToastContainer />
      <input type="checkbox" id="check" style={{ display: 'none' }} />

      {/* Login Form */}
      <div className="login form" style={formStyle}>
        <header style={headerStyle}>Login</header>
        <form action="submit" onSubmit={handleSubmit}>

          <input
  type="text"
  name="email"     
  value={formData.email}
  placeholder="Enter your email"
  onChange={handleChange}
  style={inputStyle}
/>

<input
  type="password"
  name="password"  
  placeholder="Enter your password"
  value={formData.password}
  onChange={handleChange}
  style={inputStyle}
/>

          <label htmlFor="userType"></label>
          <select id="userType" 
          name="userType" 
           onChange={handleChange}
           value={formData.userType}
          required style={selectStyle}>
            <option value="" disabled selected>Select user type</option>
            <option value="admin">Admin</option>
            <option value="owner">Owner</option>
            <option value="user">User</option>
          </select>
          <a href="/ForgetPassword" style={linkStyle}>Forgot password?</a>
          {/* <Link to="/forget/password"> Forgot password</Link> */}
          <input type="submit" value="Login" style={buttonStyle} />
        </form>
        <div style={signupTextStyle}>
          <span>
            Don't have an account?{' '}
            <Link to={'/signup'}>SignUp</Link>
          </span>
        </div>
      </div>

      {/* Registration Form */}
      <div className="registration form" style={{ ...formStyle, display: 'none' }}>
        <header style={headerStyle}>Signup</header>
        <form action="#">
          <input type="text" placeholder="Enter your Full Name" style={inputStyle} />
          <input type="text" placeholder="Enter your email" style={inputStyle} />
          <input type="number" placeholder="Enter your Phone No." style={inputStyle} />
          <input type="text" placeholder="Enter your Address" style={inputStyle} />
          <input type="password" placeholder="Create a password" style={inputStyle} />
          <Link to={'/signup'} style={buttonStyle}>SignUp</Link>
          {/* <input type="button" value="Signup" style={buttonStyle}/> */}


        </form>
        <div style={signupTextStyle}>
          <span>
            Already have an account?{' '}
            <label htmlFor="check" style={labelStyle}>Login</label>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;

// Inline styles as JavaScript objects
const containerStyle = {
  position: 'relative',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: '430px',
  width: '100%',
  background: '#fff',
  borderRadius: '7px',
  boxShadow: '0 5px 10px rgba(0,0,0,0.3)',
};

const formStyle = {
  marginTop: '25rem',
  padding: '2rem',
};

const headerStyle = {
  fontSize: '2rem',
  fontWeight: 500,
  textAlign: 'center',
  marginBottom: '1.5rem',
  color:'#009579',
};

const inputStyle = {
  height: '60px',
  width: '100%',
  padding: '0 15px',
  fontSize: '17px',
  marginBottom: '1.3rem',
  border: '1px solid #ddd',
  borderRadius: '6px',
  outline: 'none',
};

const buttonStyle = {
  ...inputStyle,
  color: '#fff',
  background: '#009579',
  fontSize: '1.2rem',
  fontWeight: 500,
  letterSpacing: '1px',
  marginTop: '1.7rem',
  cursor: 'pointer',
  transition: '0.4s',
};

const linkStyle = {
  fontSize: '16px',
  color: '#009579',
  textDecoration: 'none',
};

const signupTextStyle = {
  fontSize: '17px',
  textAlign: 'center',
};

const labelStyle = {
  color: '#009579',
  cursor: 'pointer',
};

const selectStyle = {
  ...inputStyle,
};