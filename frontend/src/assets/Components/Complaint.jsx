import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

const Complaint = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = localStorage.getItem("userId")

 useEffect(() => {
  if (!userId) {
    navigate("/login");
  }
}, [userId, navigate]);

  const [complaintText, setComplaintText] = useState("");
  const [pgList, setPgList] = useState([]); // List of all PGs
  const [selectedPgId, setSelectedPgId] = useState(""); // Selected PG ID from dropdown
  // const userId = localStorage.getItem("userId");

  const getPgList = async () => {
    try {
      const res = await axios.post("http://localhost:2000/api/getAllPg");
      setPgList(res.data.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch PGs.");
    }
  };

  useEffect(() => {
    getPgList();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!complaintText || !selectedPgId) {
      toast.error("Please select a PG and enter complaint text.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:2000/api/createComplaint", {
        userId,
        pgId: selectedPgId,
        complaintText,
      });

      if (response.data.success) {
        toast.success("Complaint submitted successfully!");
        setComplaintText("");
        setSelectedPgId("");
      } else {
        toast.error(response.data.message || "Failed to submit complaint");
      }
    } catch (err) {
      toast.error("Server error: " + err.message);
    }
  };

  const menuItems = [
    { name: "Book PG", path: "/user/BookPg" },
    { name: "Review", path: "/user/reviewpg" },
    { name: "Complaint", path: "/user/complaint" },
    { name: "Get ALL PG", path: "/user/getAllPg" },
  ];

   const handleLogout = () => {
    localStorage.clear()
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

        <main className="col-md-10 p-4" style={{ background: "#f8f9fa", height: "100vh", overflowY: "auto" }}>
          <div className="container mt-4">
            <h3 className="mb-4">Submit a Complaint</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="pgId" className="form-label">Select PG</label>
                <select
                  className="form-select"
                  value={selectedPgId}
                  onChange={(e) => setSelectedPgId(e.target.value)}
                  required
                >
                  <option value="">-- Select PG --</option>
                  {pgList.map(pg => (
                    <option key={pg._id} value={pg._id}>
                      {pg.title || pg._id}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="complaintText" className="form-label">Complaint</label>
                <textarea
                  className="form-control"
                  id="complaintText"
                  rows="4"
                  value={complaintText}
                  onChange={(e) => setComplaintText(e.target.value)}
                  placeholder="Enter your complaint"
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-success">Submit</button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Complaint;
