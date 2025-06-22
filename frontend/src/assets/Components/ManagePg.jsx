import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ManagePg() {
  const navigate = useNavigate();
  const formRef = useRef(null);

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
    image: null,
    address: '',
    rent: '',
  });

  const [pgs, setPgs] = useState([]);
  const [editingId, setEditingId] = useState(null);

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
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      if (editingId) {
        data.append("id", editingId);
        await axios.post("http://localhost:2000/api/updatePgById", data, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        toast.success("PG updated");
      } else {
        await axios.post("http://localhost:2000/api/createpg", data, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        toast.success("PG created");
      }

      setFormData({ title: '', ownername: '', city: '', image: null, address: '', rent: '' });
      setEditingId(null);

      const res = await axios.post("http://localhost:2000/api/getAllPg");
      setPgs(res.data.data);

    } catch (err) {
      console.error(err);
      toast.error("Operation failed");
    }
  };

  const handleEdit = (pg) => {
    setFormData({
      title: pg.title,
      ownername: pg.ownername,
      city: pg.city,
      image: null,
      address: pg.address,
      rent: pg.rent,
    });
    setEditingId(pg._id);

    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this PG?")) {
      try {
        await axios.post("http://localhost:2000/api/deletePgById", { id });
        toast.success("PG deleted");
        setPgs(prev => prev.filter(pg => pg._id !== id));
      } catch (err) {
        toast.error("Delete failed");
      }
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="container-fluid min-vh-100 d-flex p-0" style={{ background: 'linear-gradient(to right, #eafaf1, #dfffe7)' }}>
      <ToastContainer />

      {/* Sticky Sidebar */}
      <aside className="col-md-2 bg-white border-end p-3 shadow d-flex flex-column justify-content-between sticky-top" style={{ height: '100vh' }}>
        <div>
          <h4 className="text-center text-success fw-bold mb-4">PG-HUNT SYSTEM</h4>
           <button className="btn btn-outline-success w-100 mb-3" onClick={() => navigate("/owner/createPg")}>CREATE PG</button>
          <button className="btn btn-outline-success w-100 mb-3" onClick={() => navigate("/owner/managePg")}>MANAGE PG</button>
           <button className="btn btn-outline-success w-100 mb-3" onClick={() => navigate("/view/pg")}>VIEW PG</button>
           <button className="btn btn-outline-success w-100 mb-3" onClick={() => navigate("/view/review")}>VIEW REVIEW</button>
       
        </div>
        <button className="btn btn-danger w-100 mt-4" onClick={handleLogout}>LOG OUT</button>
      </aside>

      <main className="col-md-10 p-4">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow rounded-4 border-0 bg-white mb-4" ref={formRef}>
              <form onSubmit={handleSubmit} className="p-4">
                <h2 className="text-center text-success mb-4 fw-bold">{editingId ? "Edit PG" : "Create PG"}</h2>

                <input type="text" name="title" className="form-control mb-3" placeholder="Title" value={formData.title} onChange={handleChange} required />
                <input type="text" name="ownername" className="form-control mb-3" placeholder="Owner Name" value={formData.ownername} onChange={handleChange} required />
                <input type="text" name="city" className="form-control mb-3" placeholder="City" value={formData.city} onChange={handleChange} required />
                <input type="text" name="address" className="form-control mb-3" placeholder="Address" value={formData.address} onChange={handleChange} required />
                <input type="number" name="rent" className="form-control mb-3" placeholder="Rent" value={formData.rent} onChange={handleChange} required />
                <input type="file" name="image" className="form-control mb-3" onChange={handleChange} />

                <button type="submit" className="btn btn-success w-100">{editingId ? "Update PG" : "Create PG"}</button>
              </form>
            </div>

            <div className="mt-4">
              <h3 className="mb-3 text-success fw-bold">Your PG Listings</h3>
              <div className="row g-3">
                {pgs.map(pg => (
                  <div className="col-12" key={pg._id}>
                    <div className="card shadow-sm rounded-4 border border-success-subtle bg-white">
                      <div className="d-flex p-3 align-items-center">
                        {pg.image && (
                          <img
                            src={`http://localhost:2000/upload/${pg.image}`}
                            alt={pg.title}
                            className="rounded me-3"
                            style={{ width: '100px', height: '75px', objectFit: 'cover' }}
                          />
                        )}
                        <div className="flex-grow-1">
                          <h5 className="mb-1 text-success">{pg.title}</h5>
                          <p className="mb-0 text-muted"><strong>Owner:</strong> {pg.ownername}</p>
                          <p className="mb-0 text-muted"><strong>City:</strong> {pg.city} | <strong>Rent:</strong> ₹{pg.rent}</p>
                          <p className="mb-0 text-muted"><strong>Address:</strong> {pg.address}</p>
                        </div>
                        <div className="text-end">
                          <button className="btn btn-sm btn-outline-success me-2" onClick={() => handleEdit(pg)}>Edit</button>
                          <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(pg._id)}>Delete</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {pgs.length === 0 && <p className="text-muted">No PGs listed yet.</p>}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ManagePg;



