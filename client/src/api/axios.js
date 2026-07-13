import axios from "axios";

// create one central axios instance so I don’t have to repeat the base URL everywhere
const API = axios.create({
  baseURL: "http://127.0.0.1:10000/api",
});

// interceptor runs BEFORE every request is sent
API.interceptors.request.use((req) => {
  // grab token from localStorage (set after login)
  const token = localStorage.getItem("token");

  // if token exists, attach it to request headers for protected routes
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  // return the modified request so it can continue
  return req;
});

export default API;
