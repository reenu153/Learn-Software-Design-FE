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
  const [error, setError] = useState("");
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const handleSignup = async () => {
    setLoading(true);
    setError("")
    const res = await fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, role: "student" })
    });

    if (res.status === 401 || res.status === 400) {
      setError('This username is already taken. Please choose another one.')
      setLoading(false)
      return
   }
   if (!res.ok) {
      setError('Something went wrong. Please try again.')
      setLoading(false)
      return
   }

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
    <div className="flex flex-col justify-center items-center w-screen h-full bg-[#faf8ff] ">
      <div className="space-y-4 w-120 p-10 bg-white rounded-xl min-w-[400px]">

        <h2 className="text-xl font-bold">Sign Up</h2>
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
          {error && (
            <div
               role="alert"
               className="flex items-start gap-2 rounded-md border-l-4 border-[#ef4444] bg-[#fef2f2] px-3 py-2.5 text-sm text-red-700"
            >
               <svg
                  className="mt-0.5 h-4 w-4 shrink-0 text-red-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
               >
                  <path
                     fillRule="evenodd"
                     d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                     clipRule="evenodd"
                  />
               </svg>
               <span>{error}</span>
            </div>
         )}

        <div
          onClick={handleSignup}
          className="bg-primary-300 cursor-pointer text-center w-full py-2 rounded"
        >
          Sign Up
        </div>
          <div className="text-center">Already have an account? <span className="font-bold cursor-pointer" onClick={()=> navigate('/login')}>Login</span></div>
        {loading && (<div className="loader mx-[150px]"/>)}
      </div>
      <div className="flex mt-[40px] max-w-[50%] gap-2 items-center rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
        <span aria-hidden="true">ⓘ</span>
        <p>
          <span className="font-semibold">Note:</span> this app is hosted on a free-tier
          server that shuts down when not in use. The first request may take up to a
          minute while the server starts. After that, it responds normally.
        </p>
      </div>
    </div>
  );
}
