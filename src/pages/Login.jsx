import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const BASE_URL = process.env.REACT_APP_API_BASE_URL;


  const handleLogin = async () => {
    setLoading(true);
    const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (!data.access_token) {
      alert("Invalid credentials");
      return;
    }

    login(data.access_token, username);
    setLoading(false);
    navigate("/");
  };

  return (
    <div className="w-full h-full flex justify-center items-center bg-[#faf8ff]">
      <div className="space-y-4 w-120 p-10 bg-white rounded-xl">
        <h2 className="text-xl font-bold">Login</h2>

    <div className="flex gap-4 items-center">
        <label className="block font-medium">Username</label>
        <input
          className="border p-2 w-full"
          placeholder="username"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>

      <div className="flex gap-4 items-center">
      <label className="block font-medium">Password</label>
        <input
          type="password"
          className="border p-2 w-full"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        </div>

        <div
          onClick={handleLogin}
          className="bg-primary-300 text-primary text-center w-full p-2 rounded"
        >
          Login
        </div>
        <div className="text-center">Do not have an account? <span className="font-bold cursor-pointer" onClick={()=> navigate('/signup')}>Sign up</span></div>
        {loading && (<div className="loader mx-[150px]"/>)}
      </div>
    </div>
  );
}
