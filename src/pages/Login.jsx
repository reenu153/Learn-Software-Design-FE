import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const BASE_URL = process.env.REACT_APP_API_BASE_URL;


  const handleLogin = async () => {
    const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
      body: JSON.stringify({ username, password })
    });

    if (!res.ok) {
      alert("Invalid credentials");
      return;
    }

    const data = await res.json();

    login(data.access_token, username);

    navigate("/");
  };

  return (
    <div className="w-full h-full  flex justify-center items-center h-screen">
      <div className="space-y-4 w-80">
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
      </div>
    </div>
  );
}
