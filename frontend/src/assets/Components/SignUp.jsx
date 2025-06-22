import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function SignUp() {
  const navigate= useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    userType: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };
    
  console.log(formData)
  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const res = await axios.post("http://localhost:2000/api/createUser",formData)
      console.log(res.data)
      if(!res.data.success){
        toast.error("user is already exist")
      }else{
        toast.success("user is registerd successfully")
        setTimeout(() => {
          navigate("/login")
        }, 3000);
      }

    }catch(err){
       console.log(err)
       toast.success("user is not registered due to internal server error")
    }
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    padding: '20px',
  };

  const cardStyle = {
    width: '100%',
    maxWidth: '430px',
    background: '#fff',
    borderRadius: '7px',
    boxShadow: '0 5px 10px rgba(0,0,0,0.1)',
  };

  const formStyle = {
    padding: '2rem',
  };

  const headerStyle = {
    fontSize: '2rem',
    fontWeight: 500,
    textAlign: 'center',
    marginBottom: '1.5rem',
    color: '#009579',
  };

  const inputStyle = {
    height: '50px',
    width: '100%',
    padding: '0 15px',
    fontSize: '16px',
    marginBottom: '1.2rem',
    border: '1px solid #ddd',
    borderRadius: '5px',
    outline: 'none',
  };

  const buttonStyle = {
    ...inputStyle,
    background: '#009579',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
    border: 'none',
    transition: 'background 0.3s',
    marginTop: '1rem',
  };

  const signupTextStyle = {
    fontSize: '15px',
    textAlign: 'center',
    marginTop: '1rem',
  };

  return (
    <div style={containerStyle}>
      <ToastContainer/>
      <div style={cardStyle}>
        <form onSubmit={handleSubmit} style={formStyle}>
          <header style={headerStyle}>Sign Up</header>

          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            style={inputStyle}
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="Number"
            name="phone"
            placeholder="Enter your phone no."
            style={inputStyle}
            value={formData.phone}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            style={inputStyle}
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Enter your address"
            style={inputStyle}
            value={formData.address}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Create password"
            style={inputStyle}
            value={formData.password}
            onChange={handleChange}
          />
          <select
            name="userType"
            style={inputStyle}
            value={formData.userType}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select user type</option>
            <option value="user">User</option>
            <option value="owner">Owner</option>
          </select>

          <input type="submit" value="Sign Up" style={buttonStyle} />

          <div style={signupTextStyle}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#009579', textDecoration: 'none' }}>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
