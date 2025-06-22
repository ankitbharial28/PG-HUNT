import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ApprovePg = () => {
  const navigate = useNavigate();
  const [pgList, setPgList] = useState([]);

  const userId = localStorage.getItem("userId")
  console.log(userId)

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
      console.error(err);
      toast.error("Failed to fetch PGs.");
    }
  };

  const updatePgStatus = async (id, status) => {
    try {
      const res = await axios.post("http://localhost:2000/api/updatePgById", { id, status });
      console.log(res)
      if (res.data.success) {
        toast.success(`PG ${status} successfully.`);
        fetchAllPg(); // Refresh the list
      } else {
        toast.error(res.data.message || "Failed to update status.");
      }
    } catch (err) {
      toast.error("Server error: " + err.message);
    }
  };

  useEffect(() => {
    fetchAllPg();
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
        <aside
          className="col-md-2 d-flex flex-column justify-content-between"
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
              {[
                { name: "APPROVE PG", path: "/admin/approvePg" },
                { name: "RESOLVE COMPLAINT", path: "/admin/resolveComplaint" },
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
          <h3 className="mb-4">Approve/Reject PGs</h3>
          <div className="row">
            {pgList.length === 0 ? (
              <p>No PGs found.</p>
            ) : (
              pgList.map((pg) => (
                <div className="col-md-4 mb-4" key={pg._id}>
                  <div className="card h-100 shadow-sm">
                    {pg.image && (
                      <img
                        src={`http://localhost:2000/upload/${pg.image}`}
                        className="card-img-top"
                        alt={pg.title}
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                    )}
                    <div className="card-body">
                      <h5 className="card-title">{pg.title}</h5>
                      <p className="card-text">
                        <strong>Owner:</strong> {pg.ownername}<br />
                        <strong>City:</strong> {pg.city}<br />
                        <strong>Address:</strong> {pg.address}<br />
                        <strong>Rent:</strong> ₹{pg.rent}<br />
                        <strong>Status:</strong>{" "}
                        <span className={`badge bg-${pg.status === 'approved' ? 'success' : pg.status === 'rejected' ? 'danger' : 'warning'}`}>
                          {pg.status}
                        </span>
                      </p>

                      {pg.status === "pending" && (
                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-success"
                            onClick={() => updatePgStatus(pg._id, "approved")}
                          >
                            Approve
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => updatePgStatus(pg._id, "rejected")}
                          >
                            Reject
                          </button>
                        </div>
                      )}
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

export default ApprovePg;
