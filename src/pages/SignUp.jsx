import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function SignupPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const handleSignup = async () => {
    const res = await fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, role: "student" })
    });

    if (!res.ok) {
      alert("Signup failed");
      return;
    }

    const data = await res.json();

    // auto login after signup
    login(data.token, data.user);

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
      </div>
    </div>
  );
}
