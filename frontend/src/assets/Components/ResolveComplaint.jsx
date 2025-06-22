import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ResolveComplaint = () => {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);

  const userId = localStorage.getItem("userId")

  useEffect(() => {
  if (!userId) {
    navigate("/login");
  }
}, [userId, navigate]);

  const fetchComplaints = async () => {
    try {
      const res = await axios.post("http://localhost:2000/api/getAllComplaints");
      if (res.data.success) {
        setComplaints(res.data.data || []);
      } else {
        toast.error("Failed to load complaints");
      }
    } catch (err) {
      toast.error("Error fetching complaints");
    }
  };

  const updateComplaint = async (id, status) => {
    try {
      const res = await axios.post("http://localhost:2000/api/updateComplaintStatus", { id, status });
      if (res.data.success) {
        toast.success(`Complaint ${status} successfully`);
        fetchComplaints(); // Refresh the list
      } else {
        toast.error("Failed to update complaint status");
      }
    } catch (err) {
      toast.error("Error updating complaint");
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

   const handleLogout = () => {
    localStorage.clear()
    navigate("/login");
  };

  return (
    <div className="container-fluid">
      <ToastContainer />
      <div className="row">
        {/* Sidebar */}
        <aside className="col-md-2 d-flex flex-column justify-content-between"
          style={{
            backgroundColor: "#F0F2F5",
            padding: "20px",
            height: "100vh",
            borderRight: "1px solid #ddd",
          }}
        >
          <div>
            <h4 className="text-center mb-4" style={{ color: "green", fontWeight: "bold" }}>
              PG-HUNT SYSTEM
            </h4>
            <ul className="nav flex-column">
              {[{ name: "APPROVE PG", path: "/admin/approvePg" },
                { name: "RESOLVE COMPLAINT", path: "/admin/resolveComplaint" }
              ].map((item) => (
                <li key={item.name} className="mb-3">
                  <button
                    onClick={() => navigate(item.path)}
                    style={{
                      width: "100%",
                      backgroundColor: "white",
                      color: "green",
                      border: "none",
                      padding: "10px",
                      borderRadius: "5px",
                      fontWeight: "500",
                    }}
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <button className="btn btn-success w-100 mt-3" onClick={handleLogout}>
            LOG OUT
          </button>
        </aside>

        {/* Main Content */}
        <main className="col-md-10 p-4" style={{ backgroundColor: "#FFFFFF" }}>
          <h3 className="mb-4">Resolve Complaints</h3>

          {complaints.length === 0 ? (
            <p>No complaints found.</p>
          ) : (
            <div className="row">
              {complaints.map((complaint) => (
                <div className="col-md-6 mb-4" key={complaint._id}>
                  <div className="card shadow-sm">
                    <div className="card-body">
                      <h5 className="card-title">Complaint</h5>
                      <p className="card-text">
                        <strong>User:</strong> {complaint.userId?.name || "N/A"}<br />
                        <strong>PG Title:</strong> {complaint.pgId?.title || "N/A"}<br />
                        <strong>Text:</strong> {complaint.complaintText}<br />
                        <strong>Status:</strong>{" "}
                        <span className={`badge bg-${complaint.status === 'resolved' ? 'success' : complaint.status === 'rejected' ? 'danger' : 'warning'}`}>
                          {complaint.status}
                        </span>
                      </p>
                      {complaint.status === "pending" && (
                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-success"
                            onClick={() => updateComplaint(complaint._id, "resolved")}
                          >
                            Resolve
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => updateComplaint(complaint._id, "rejected")}
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ResolveComplaint;
