import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5050/api",
});

// attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (req.url.includes("/users/register") || req.url.includes("/users/login")) {
    return req;
  }

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;
