import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

const BookPg = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const formRef = useRef(null);
  const userId = localStorage.getItem("userId")
useEffect(() => {
  if (!userId) {
    navigate("/login");
  }
}, [userId, navigate]);

  const [formData, setFormData] = useState({
    pgId: "",
    userId: "",
    ownerId: "",
    checkAt: "",
    status: "pending",
  });

  const [pgs, setPgs] = useState([]);
  const [owners, setOwners] = useState([]);
  const [userName, setUserName] = useState(""); // NEW STATE for displaying user name

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pgRes = await axios.post("http://localhost:2000/api/getAllPg");
        console.log(pgRes)
        setPgs(pgRes.data.data);

        const ownerRes = await axios.post("http://localhost:2000/api/getAllUser");
        console.log(ownerRes)
        const ownerOnly = ownerRes.data.data.filter((u) => u.userType === "owner");
        console.log(ownerOnly)
        setOwners(ownerOnly);

        const userRes = await axios.post("http://localhost:2000/api/getAllUser");
        const users = userRes.data.data;

        const storedUserId = localStorage.getItem("userId");
        if (storedUserId) {
          setFormData((prev) => ({ ...prev, userId: storedUserId }));

          const currentUser = users.find((u) => u._id === storedUserId);
          if (currentUser) {
            setUserName(currentUser.name || currentUser.email);
          }
        }
      } catch (error) {
        toast.error("Error fetching data");
        console.error("Error fetching PGs or Users:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:2000/api/createBooking", formData);
      toast.success("Booking created successfully");
      setFormData({
        pgId: "",
        userId: localStorage.getItem("userId") || "",
        ownerId: "",
        checkAt: "",
        status: "pending",
      });
    } catch (error) {
      console.error("Booking create error:", error);
      toast.error("Failed to create booking");
    }
  };

  const handleBookNow = (pg) => {
    const matchedOwner = owners.find((owner) => owner._id === pg.ownerId);
    setFormData((prev) => ({
      ...prev,
      pgId: pg._id,
      ownerId: matchedOwner ? matchedOwner._id : "",
    }));

    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
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

        {/* Main Section */}
        <main className="col-md-10 p-4" style={{ background: "#f8f9fa", height: "100vh", overflowY: "scroll" }}>
          <div className="d-flex justify-content-center mb-5" ref={formRef}>
            <form
              onSubmit={handleSubmit}
              className="p-4 bg-white shadow-lg rounded-3"
              style={{ width: "500px" }}
            >
              <h3 className="text-center text-success mb-4">Book a PG</h3>

              <select
                name="pgId"
                value={formData.pgId}
                onChange={handleChange}
                required
                className="form-select mb-3"
              >
                <option value="">Select PG</option>
                {pgs.map((pg) => (
                  <option key={pg._id} value={pg._id}>
                    {pg.title} ({pg.city})
                  </option>
                ))}
              </select>

              <select
                name="ownerId"
                value={formData.ownerId}
                onChange={handleChange}
                required
                className="form-select mb-3"
              >
                <option value="">Select Owner</option>
                {owners.map((owner) => (
                  <option key={owner._id} value={owner._id}>
                    {owner.ownername || owner.email}
                  </option>
                ))}
              </select>

              <input
                type="text"
                value={userName}
                className="form-control mb-3"
                readOnly
                placeholder="User Name"
              />

              <input
                type="date"
                name="checkAt"
                value={formData.checkAt}
                onChange={handleChange}
                required
                className="form-control mb-3"
              />

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="form-select mb-4"
              >
                <option value="pending">Pending</option>
              </select>

              <button type="submit" className="btn btn-success w-100">
                Book Now
              </button>
            </form>
          </div>

          <h3 className="text-success mb-3 text-center">Available PGs</h3>
          <div className="row">
            {pgs.map((pg) => (
              <div key={pg._id} className="col-md-4 mb-4">
                <div className="card h-100 shadow-sm">
                  <img
                    src={`http://localhost:2000/upload/${pg.image}`}
                    className="card-img-top"
                    alt="PG"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{pg.title}</h5>
                    <p className="card-text">
                      <strong>City:</strong> {pg.city} <br />
                      <strong>Rent:</strong> ₹{pg.rent} <br />
                      <strong>Address:</strong> {pg.address}<br/>
                      <strong>Owner:</strong> {pg.ownername}
                    </p>
                   <div className="d-flex justify-content-between mt-3">
  <button
    type="button"
    className="btn btn-outline-success"
    onClick={() => handleBookNow(pg)}
  >
    BOOK NOW
  </button>
 

</div>

                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default BookPg;

