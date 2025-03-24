import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // ✅ Import axios for API call
import "./LoginPage.css";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault(); // ✅ Prevents page refresh

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        username: name, // ✅ Backend expects "username", not "name"
        email,
        password,
      });

      console.log("Registration successful:", response.data);
      alert("Registration successful! Please login.");
      navigate("/login"); // ✅ Redirect to login after successful registration
    } catch (error) {
      console.error("Registration failed:", error.response?.data?.message || error.message);
      alert("Registration Failed: " + (error.response?.data?.message || "Try again"));
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input-field"
          />
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
          <button type="submit" className="auth-button">Register</button>
        </form>
        <p className="auth-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
