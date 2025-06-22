import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetWithOtp = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    setLoading(true);
    setMessage('');
    try {
      const res = await axios.post('http://localhost:2000/api/verifyOtp', {
        email,
        otp,
        newPassword,
      });
      console.log(res)
      if(!res.status === 200){
        toast.error("password is not reset successfully")
      }else{
        toast.success("password is reset successfully")
        setTimeout(() => {
          
          navigate("/login")
        }, 3000);
      }
      setMessage(res.data.message);
    } catch (err) {
      setMessage('OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1508780709619-79562169bc64")',
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
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          padding: '30px',
          borderRadius: '15px',
          boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
          width: '100%',
          maxWidth: '400px',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#2c3e50' }}>
          Reset Password with OTP
        </h2>
        <input
          placeholder="Email"
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            marginBottom: '12px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#f1f8e9',
            fontSize: '16px',
            color: '#33691e',
          }}
        />
        <input
          placeholder="OTP"
          value={otp}
          type="text"
          onChange={(e) => setOtp(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            marginBottom: '12px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#e3f2fd',
            fontSize: '16px',
            color: '#0d47a1',
          }}
        />
        <input
          placeholder="New Password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            marginBottom: '20px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#fce4ec',
            fontSize: '16px',
            color: '#880e4f',
          }}
        />
        <button
          onClick={handleReset}
          disabled={loading}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#6a1b9a',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#4a148c')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#6a1b9a')}
        >
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
        {message && (
          <p style={{ marginTop: '15px', color: '#d84315', textAlign: 'center' }}>{message}</p>
        )}
      </div>
    </div>
  );
};

export default ResetWithOtp;