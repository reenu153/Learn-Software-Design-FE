import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function SignupPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    if (!res.ok) {
      alert("Signup failed");
      return;
    }

    const data = await res.json();

    // auto login after signup
    login(data.token, data.user);

    navigate("/dashboard");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="space-y-4 w-80">
        <h2 className="text-xl font-bold">Sign Up</h2>

        <input
          className="border p-2 w-full"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          className="border p-2 w-full"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSignup}
          className="bg-green-600 text-white w-full py-2 rounded"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
