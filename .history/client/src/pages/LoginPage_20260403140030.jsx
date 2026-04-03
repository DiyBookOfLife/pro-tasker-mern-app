import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import request from "../api";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await request("/users/login", {
        method: "POST",
        body: JSON.stringify(form),
      });

      login(data);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container auth-page">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="card form">
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
        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
      <p>
        No account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default LoginPage;
