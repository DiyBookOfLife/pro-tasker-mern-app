import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5050/api",
  timeout: 5000,
});

export default API;
