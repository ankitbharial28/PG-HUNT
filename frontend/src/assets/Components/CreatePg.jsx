import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreatePg() {
  const navigate = useNavigate();
  const location = useLocation();

  const userId = localStorage.getItem("userId")

  useEffect(() => {
  if (!userId) {
    navigate("/login");
  }
}, [userId, navigate]);

  const [formData, setFormData] = useState({
    title: '',
    ownername: '',
    city: '',
    image: '',
    address: '',
    rent: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData(prev => ({ ...prev, image: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("ownername", formData.ownername);
    data.append("city", formData.city);
    data.append("address", formData.address);
    data.append("rent", formData.rent);
    data.append("image", formData.image);

    try {
      await axios.post("http://localhost:2000/api/createPg", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("PG created successfully");

      setTimeout(() => {
        window.location.reload(); // Refresh after toast
      }, 1000);
    } catch (err) {
      console.error(err);
      toast.error("Creation failed. Please try again later.");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const primaryGreen = "#2E8B57";
  const hoverGreen = "#276749";
  const activeBg = "#2E8B57";
  const activeText = "#ffffff";

  const menuItems = [
    { name: "CREATE PG", path: "/owner/CreatePg" },
    { name: "MANAGE PG", path: "/owner/managePg" },
     { name: "VIEW PG", path: "/view/pg" },
       { name: "VIEW REVIEW", path: "/view/review" },
  ];

  return (
    <div className="container-fluid min-vh-100 d-flex p-0 bg-light">
      <ToastContainer />

      {/* Sidebar */}
      <aside className="col-md-2 d-flex flex-column justify-content-between p-3 border-end" style={{ backgroundColor: "#fff" }}>
        <div>
          <h4 className="text-center fw-bold mb-4" style={{ color: primaryGreen }}>PG-HUNT SYSTEM</h4>
          <ul className="nav flex-column">
            {menuItems.map(item => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.name} className="mb-3">
                  <button
                    onClick={() => navigate(item.path)}
                    style={{
                      width: "100%",
                      backgroundColor: isActive ? activeBg : "#FFF",
                      color: isActive ? activeText : primaryGreen,
                      border: `1px solid ${primaryGreen}`,
                      padding: "10px",
                      borderRadius: "5px",
                      fontWeight: "500",
                      transition: "all 0.3s ease",
                      cursor: "pointer"
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.target.style.backgroundColor = hoverGreen;
                        e.target.style.color = "#FFF";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.target.style.backgroundColor = "#FFF";
                        e.target.style.color = primaryGreen;
                      }
                    }}
                  >
                    {item.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <button
          className="w-100 mt-4"
          onClick={handleLogout}
          style={{
            backgroundColor: "#A4161A",
            color: "#fff",
            border: "none",
            padding: "10px",
            borderRadius: "5px",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "all 0.3s ease"
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = "#7E1013"}
          onMouseLeave={(e) => e.target.style.backgroundColor = "#A4161A"}
        >
          LOG OUT
        </button>
      </aside>

      {/* Main Content */}
      <main className="col-md-10 d-flex justify-content-center align-items-center p-4">
        <div className="card shadow-lg rounded-4 border-0" style={{ maxWidth: '600px', width: '100%', background: '#ffffffee' }}>
          <form onSubmit={handleSubmit} className="p-5">
            <h2 className="text-center mb-4 fw-bold" style={{ color: primaryGreen }}>Create PG</h2>

            <div className="form-floating mb-3">
              <input
                type="text"
                name="title"
                className="form-control rounded-3"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                required
              />
              <label>PG Title</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="text"
                name="ownername" // ✅ Fixed name
                className="form-control rounded-3"
                placeholder="Owner Name"
                value={formData.ownername}
                onChange={handleChange}
                required
              />
              <label>Owner Name</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="text"
                name="city"
                className="form-control rounded-3"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                required
              />
              <label>City</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="text"
                name="address"
                className="form-control rounded-3"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                required
              />  
              <label>Address</label>
            </div>

            <div className="form-floating mb-4">
              <input
                type="number"
                name="rent"
                className="form-control rounded-3"
                placeholder="Rent"
                value={formData.rent}
                onChange={handleChange}
                required
              />
              <label>Monthly Rent</label>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Upload Image</label>
              <input
                type="file"
                name="image"
                className="form-control rounded-3"
                onChange={handleChange}
                required
              />
              {formData.image && (
                <img
                  src={URL.createObjectURL(formData.image)}
                  alt="Preview"
                  className="img-fluid rounded mt-2"
                  style={{ maxHeight: '200px' }}
                />
              )}
            </div>

            <button
              type="submit"
              className="btn w-100 py-2 fw-bold rounded-3 shadow-sm"
              style={{ backgroundColor: primaryGreen, color: "#fff" }}
              onMouseEnter={(e) => e.target.style.backgroundColor = hoverGreen}
              onMouseLeave={(e) => e.target.style.backgroundColor = primaryGreen}
            >
              Create PG
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default CreatePg;

