import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await axios.post('http://localhost:2000/api/sendOtp', { email });
      console.log(res)
      console.log(res.data)
      if(!res.data.data.success){
        toast.error("failed to send email")
      }else{
        toast.success("send email is successfully")
        navigate("/resetpassword")
      }
      
    } catch (err) {
      // setMessage('Failed to send OTP');
      toast.error("failed to send OTP")
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
    <ToastContainer/>
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: '30px',
          borderRadius: '15px',
          boxShadow: '0 0 20px rgba(0,0,0,0.3)',
          width: '100%',
          maxWidth: '400px',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>
          Forget Password
        </h2>
        <form onSubmit={handleSendOtp}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '12px',
              marginBottom: '15px',
              border: 'none',
              borderRadius: '8px',
              backgroundColor: '#e0f7fa',
              color: '#00796b',
              fontSize: '16px',
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#00796b',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#004d40')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#00796b')}
          >
            {loading ? 'Sending...' : 'Send OTP'}
          </button>
        </form>
        {message && (
          <p style={{ marginTop: '15px', color: '#d32f2f', textAlign: 'center' }}>{message}</p>
        )}
      </div>
    </div>
  );
};

export default ForgetPassword;