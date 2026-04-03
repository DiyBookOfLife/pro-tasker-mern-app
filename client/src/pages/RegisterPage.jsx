// ================= REGISTER PAGE =================

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

const RegisterPage = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth(); // reuse login after registering
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("CLICKED");
    setError("");

    try {
      // send new user data to backend
      const { data } = await API.post("/users/register", form);

      login(data); // auto-login after successful register
      navigate("/"); // go straight to dashboard
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };

  return (
    <div className="container auth-page">
      <h1>Register</h1>
      <form onSubmit={handleSubmit} className="card form">
        <input
          name="username"
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        <button type="submit">Register</button>
        {error && <p className="error">{error}</p>}
      </form>
      <p>
        Have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
