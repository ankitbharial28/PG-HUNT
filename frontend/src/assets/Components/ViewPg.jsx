import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewPg = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [pgList, setPgList] = useState([]);

  const userId = localStorage.getItem("userId")

  useEffect(() => {
  if (!userId) {
    navigate("/login");
  }
}, [userId, navigate]);

  const fetchAllPg = async () => {
    try {
      const res = await axios.post("http://localhost:2000/api/getAllPg");
      setPgList(res.data.data || []);
    } catch (err) {
      toast.error("Failed to fetch PGs");
    }
  };

  useEffect(() => {
    fetchAllPg();
  }, []);

  const menuItems = [
    { name: "Create PG", path: "/owner/CreatePg" },
    { name: "Manage PG", path: "/owner/managePg" },
    { name: "VIEW PG", path: "/view/pg" },
     { name: "VIEW REVIEW", path: "/view/review" },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const primaryGreen = "#2E8B57";
  const hoverGreen = "#276749";
  const lightBackground = "#F0FFF4";
  const logoutRed = "#A4161A";
  const logoutHover = "#7E1013";

  return (
    <div className="container-fluid">
      <ToastContainer />
      <div className="row">
        {/* Sidebar */}
        <aside
          className="col-md-2 d-flex flex-column justify-content-between"
          style={{
            backgroundColor: lightBackground,
            padding: "20px",
            height: "100vh",
            borderRight: `1px solid ${primaryGreen}`,
          }}
        >
          <div>
            <h4 className="text-center mb-4" style={{ color: primaryGreen, fontWeight: "bold" }}>
              PG-HUNT SYSTEM
            </h4>
            <nav>
              <ul className="nav flex-column">
                {menuItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <li key={item.name} className="mb-3">
                      <button
                        onClick={() => navigate(item.path)}
                        style={{
                          width: "100%",
                          backgroundColor: isActive ? primaryGreen : "#FFF",
                          color: isActive ? "#FFF" : primaryGreen,
                          border: `1px solid ${primaryGreen}`,
                          padding: "10px",
                          borderRadius: "5px",
                          fontWeight: "500",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
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
            </nav>
          </div>
          <button
            className="w-100 mt-3"
            onClick={handleLogout}
            style={{
              backgroundColor: logoutRed,
              color: "#fff",
              border: "none",
              padding: "10px",
              borderRadius: "5px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = logoutHover;
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = logoutRed;
            }}
          >
            Log Out
          </button>
        </aside>

        {/* Main Content */}
        <main className="col-md-10 p-4" style={{ backgroundColor: "#f8f9fa", height: "100vh", overflowY: "auto" }}>
          <h3 className="mb-4">Your PG Listings</h3>
          <div className="row">
            {pgList.length === 0 ? (
              <p>No PGs found.</p>
            ) : (
              pgList.map((pg) => (
                <div className="col-md-4 mb-4" key={pg._id}>
                  <div className="card shadow-sm h-100">
                    {pg.image && (
                      <img
                        src={`http://localhost:2000/upload/${pg.image}`}
                        alt={pg.title}
                        className="card-img-top"
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                    )}
                    <div className="card-body">
                      <h5 className="card-title">{pg.title}</h5>
                      <p className="card-text">
                        <strong>City:</strong> {pg.city}<br />
                        <strong>Address:</strong> {pg.address}<br />
                        <strong>Rent:</strong> ₹{pg.rent}<br />
                        <strong>Status:</strong>{" "}
                        <span className={`badge bg-${pg.status === "approved" ? "success" : pg.status === "rejected" ? "danger" : "warning"}`}>
                          {pg.status}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ViewPg;
