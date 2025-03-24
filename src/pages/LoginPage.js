 
 import React, { useState } from "react";
 import { Link, useNavigate } from "react-router-dom";
 import "./LoginPage.css";
 
 const LoginPage = ({ setIsAuthenticated }) => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);
   const navigate = useNavigate();
 
   const handleLogin = async (e) => {
     e.preventDefault();
     setLoading(true);
     setError(null);
 
     try {
          const response = await fetch("http://localhost:5000/api/auth/login", {
           method: "POST",
           headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
       });
 
       const data = await response.json();
 
       if (!response.ok) {
         throw new Error(data.message || "Login failed");
       }
 
       localStorage.setItem("token", data.token);
       setIsAuthenticated(true);
       navigate("/dashboard");
     } catch (err) {
       setError(err.message);
     } finally {
       setLoading(false);
     }
   };
 
   return (
     <div className="auth-container">
       <div className="auth-box">
         <h2>Login</h2>
         {error && <p className="error-message">{error}</p>}
         <form onSubmit={handleLogin}>
           <input
             type="email"
             placeholder="Email"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
             required
             className="input-field"
           />
           <input
             type="password"
             placeholder="Password"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
             required
             className="input-field"
           />
           <button type="submit" className="auth-button" disabled={loading}>
             {loading ? "Logging in..." : "Login"}
           </button>
         </form>
         <p className="auth-link">
           Don't have an account? <Link to="/register">Register</Link>
         </p>
       </div>
     </div>
   );
 };
 
 export default LoginPage;
 