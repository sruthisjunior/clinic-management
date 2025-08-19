import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/", // Django API base URL
});

// Add token automatically if it exists
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`; // ✅ use backticks and correct variable
  }
  return req;
});

export const login = (username, password) => {
  return API.post("token/", { username, password });
};

export default API;