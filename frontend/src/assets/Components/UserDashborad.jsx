import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();


  const userId = localStorage.getItem("userId")

  useEffect(() => {
  if (!userId) {
    navigate("/login");
  }
}, [userId, navigate]);
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
  const darkText = "#1B4332";
  const logoutRed = "#A4161A";
  const logoutHover = "#7E1013";

  return (
    <div className="container-fluid">
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
        <main
          className="col-md-10 p-0"
          style={{
            height: "100vh",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              backgroundImage:
                "url('https://png.pngtree.com/thumb_back/fh260/background/20210903/pngtree-guest-bedroom-interior-design-decoration-image_803663.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h1
              style={{
                color: "white",
                backgroundColor: "rgba(46, 139, 87, 0.6)",
                padding: "20px",
                borderRadius: "10px",
                fontSize: "2rem",
              }}
            >
              Welcome to PG Hunt User Panel
            </h1>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;


