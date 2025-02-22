import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/signin", { email, password }, { withCredentials: true });
      setMessage(res.data.message);
      navigate("/profile");
    } catch (error) {
      setMessage(error.response?.data?.message || "Signin failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>
        <form onSubmit={handleSignin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Sign In
          </button>
        </form>
        <p className="text-center mt-4">
          Don't have an account? <Link to="/signup" className="text-blue-500">Sign Up</Link>
        </p>
        {message && <p className="text-center text-red-500 mt-2">{message}</p>}
      </div>
    </div>
  );
};

export default Signin;
