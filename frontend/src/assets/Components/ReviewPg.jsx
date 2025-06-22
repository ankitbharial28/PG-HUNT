import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const ReviewPg = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const userId = localStorage.getItem("userId")

  useEffect(() => {
  if (!userId) {
    navigate("/login");
  }
}, [userId, navigate]);

  const [pgs, setPgs] = useState([]);
  const [formData, setFormData] = useState({
    userId: localStorage.getItem("userId") || "",
    pgId: "",
    rating: "",
    reviewText: "",
  });

  useEffect(() => {
    const fetchPgs = async () => {
      try {
        const res = await axios.post("http://localhost:2000/api/getAllPg");
        setPgs(res.data.data);
      } catch (err) {
        toast.error("Failed to fetch PGs");
      }
    };
    fetchPgs();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.pgId || !formData.rating) {
      toast.error("PG and Rating are required");
      return;
    }

    try {
      const res = await axios.post("http://localhost:2000/api/createReview", formData);
      if (res.data.success) {
        toast.success("Review submitted successfully");
        setFormData({
          ...formData,
          pgId: "",
          rating: "",
          reviewText: "",
        });
      } else {
        toast.error(res.data.message || "Failed to submit review");
      }
    } catch (err) {
      toast.error("Submission error");
    }
  };

  const menuItems = [
    { name: "Book PG", path: "/user/BookPg" },
    { name: "Review", path: "/user/reviewpg" },
    { name: "Complaint", path: "/user/complaint" },
    { name: "Get All PG", path: "/user/getAllPg" },
  ];

   const handleLogout = () => {
    localStorage.clear()
    navigate("/login");
  };


  // Theme Colors
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

        {/* Review Form Section */}
        <main className="col-md-10 p-5" style={{ background: "#f8f9fa", height: "100vh", overflowY: "auto" }}>
          <div className="d-flex justify-content-center">
            <form
              onSubmit={handleSubmit}
              className="p-4 bg-white shadow-lg rounded-3"
              style={{ width: "500px" }}
            >
              <h3 className="text-center text-success mb-4">Submit a PG Review</h3>

              <div className="mb-3">
                <label className="form-label">Select PG <span className="text-danger">*</span></label>
                <select
                  className="form-select"
                  name="pgId"
                  value={formData.pgId}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Select PG --</option>
                  {pgs.map((pg) => (
                    <option key={pg._id} value={pg._id}>
                      {pg.title} ({pg.city})
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Rating (1-5) <span className="text-danger">*</span></label>
                <select
                  className="form-select"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Select Rating --</option>
                  {[1, 2, 3, 4, 5].map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Review</label>
                <textarea
                  className="form-control"
                  name="reviewText"
                  value={formData.reviewText}
                  onChange={handleChange}
                  placeholder="Write your review (optional)..."
                  rows="4"
                />
              </div>

              <button type="submit" className="btn btn-success w-100">
                Submit Review
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ReviewPg;
