import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/profile", { withCredentials: true });
        setUser(res.data);
      } catch (error) {
        navigate("/signin");
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/logout", {}, { withCredentials: true });
      Cookies.remove("token");
      navigate("/signin");
    } catch (error) {
      setMessage("Logout failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        {user ? <p className="text-gray-700">Welcome, {user.email}</p> : <p className="text-gray-500">Loading...</p>}
        <button onClick={handleLogout} className="mt-4 w-full bg-red-500 text-white p-2 rounded hover:bg-red-600">
          Logout
        </button>
        {message && <p className="text-red-500 mt-2">{message}</p>}
      </div>
    </div>
  );
};

export default Profile;
