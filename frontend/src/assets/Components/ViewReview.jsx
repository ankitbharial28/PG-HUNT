import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const ViewReview = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [reviews, setReviews] = useState([]);

    const userId = localStorage.getItem("userId")

  useEffect(() => {
  if (!userId) {
    navigate("/login");
  }
}, [userId, navigate]);

    const fetchReviews = async () => {
        try {
            const res = await axios.post("http://localhost:2000/api/getAllReviews"); // Adjust to your route
            if (res.data.success) {
                setReviews(res.data.data);
            }
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    const menuItems = [
        { name: "Create PG", path: "/owner/CreatePg" },
        { name: "Manage PG", path: "/owner/managePg" },
        { name: "VIEW PG", path: "/view/pg" },
        { name: "VIEW REVIEW", path: "/view/review" },
    ];

    const primaryGreen = "#2E8B57";
    const hoverGreen = "#276749";
    const lightBackground = "#F0FFF4";
    const logoutRed = "#A4161A";
    const logoutHover = "#7E1013";

    return (
        <div className="container-fluid">
            <div className="row">
                {/* Sidebar */}
                <aside className="col-md-2 d-flex flex-column justify-content-between" style={{
                    backgroundColor: lightBackground,
                    padding: "20px",
                    height: "100vh",
                    borderRight: `1px solid ${primaryGreen}`,
                }}>
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
                <main className="col-md-10 p-4" style={{ height: "100vh", overflowY: "auto", backgroundColor: "#F9F9F9" }}>
                    <h2 style={{ color: primaryGreen, marginBottom: "20px" }}>All Reviews</h2>
                    {reviews.length === 0 ? (
                        <p>No reviews found.</p>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-bordered">
                                <thead style={{ backgroundColor: primaryGreen, color: "#fff" }}>
                                    <tr>
                                        <th>User Name</th>
                                        <th>PG Title</th>
                                        <th>Rating</th>
                                        <th>Review</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reviews.map((review) => (
                                        <tr key={review._id}>
                                            <td>{review.userId?.name || "N/A"}</td>
                                            <td>{review.pgId?.title || "N/A"}</td>
                                            <td>{review.rating}</td>
                                            <td>{review.reviewText}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default ViewReview;
