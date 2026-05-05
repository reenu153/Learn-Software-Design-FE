import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { Loader } from "storybook/internal/components";

export default function SignupPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const handleSignup = async () => {
    setLoading(true);
    const res = await fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, role: "student" })
    });

    const data = await res.json();
    
    if(!data.username) {
      alert(data.detail || "Signup failed");
      setLoading(false);
      return;
    }


    localStorage.setItem("token",data.access_token);
    localStorage.setItem("user", JSON.stringify(data.username));

    setLoading(false);

    navigate("/");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="space-y-4 w-80">
        <h2 className="text-xl font-bold text-center">Sign Up</h2>
        <div>Enter username</div>
        <input
          className="border p-2 w-full"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <div>Enter Password</div>
        <input
          type="password"
          className="border p-2 w-full"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div
          onClick={handleSignup}
          className="bg-primary-300 cursor-pointer text-center w-full py-2 rounded"
        >
          Sign Up
        </div>
          <div className="text-center">Already have an account? <span className="font-bold cursor-pointer" onClick={()=> navigate('/login')}>Login</span></div>
        {loading && (<div className="loader mx-[150px]"/>)}
      </div>
    </div>
  );
}
