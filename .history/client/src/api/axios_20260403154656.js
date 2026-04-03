import axios from "axios";

const API = axios.create({
  baseURL: "https://pro-tasker-backend-t7ye.onrender.com",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;
