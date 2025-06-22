
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId")

  if(!userId){
    navigate("/login")
  }

  useEffect(() => {
  if (!userId) {
    navigate("/login");
  }
}, [userId, navigate]);
  
  const handleLogout = () =>{
   localStorage.clear()

    navigate("/login")
  }


  return (
    
    <div className="container-fluid">
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
          <div
            style={{
              backgroundImage: "url('https://png.pngtree.com/thumb_back/fh260/background/20210903/pngtree-guest-bedroom-interior-design-decoration-image_803663.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "100vw",
              height: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          ></div>
          </main>
        </div>
        
      </div>
    
  );
};

export default AdminDashboard;

