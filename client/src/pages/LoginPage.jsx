import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
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

    console.log("STEP 1: submit fired");

    try {
      console.log("STEP 2: before request");

      const res = await API.post("/users/login", form);

      console.log("STEP 3: response", res);

      login(res.data);
      navigate("/");
    } catch (err) {
      console.log("STEP 4: error", err);
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
