import axios from "axios";

// create one central axios instance so I don’t have to repeat the base URL everywhere
const API = axios.create({
  baseURL: "https://pro-tasker-backend-t7ye.onrender.com/api",
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
