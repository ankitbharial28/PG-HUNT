import { useParams,useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


const ViewOwner = () => {
  const navigate = useNavigate()
  const { pgId } = useParams();
  const [ownerInfo, setOwnerInfo] = useState(null);

  const userId = localStorage.getItem("userId")

 useEffect(() => {
  if (!userId) {
    navigate("/login");
  }
}, [userId, navigate]);

  useEffect(() => {
    const fetchOwnerInfo = async () => {
      try {
        const res = await axios.post("http://localhost:2000/api/getPgById", { id: pgId });
        console.log(res)
        const pg = res.data.data;
        const ownerRes = await axios.post("http://localhost:2000/api/getUserById", { id: pg.ownerId });
        console.log(ownerRes)
        setOwnerInfo(ownerRes.data.data);
      } catch (error) {
        console.error("Error fetching owner info:", error);
      }
    };

    fetchOwnerInfo();
  }, [pgId]);

  if (!ownerInfo) return <p>Loading contact...</p>;

  return (
    <div>
      <h2>Owner Contact Information</h2>
      <p><strong>Name:</strong> {ownerInfo.name || ownerInfo.email}</p>
      <p><strong>Phone:</strong> {ownerInfo.phone}</p>
      <p><strong>Email:</strong> {ownerInfo.email}</p>
    </div>
  );
};

export default ViewOwner;
