import axios from "axios";

// Base URL setup: ensures /api is included if needed
const API = axios.create({
  baseURL:
    process.env.REACT_APP_API_URL &&
    !process.env.REACT_APP_API_URL.endsWith("/api")
      ? `${process.env.REACT_APP_API_URL}/api`
      : process.env.REACT_APP_API_URL,
});

// Attach token to requests if user is logged in
API.interceptors.request.use((req) => {
  const userInfo = localStorage.getItem("userInfo");
  if (userInfo) {
    req.headers.Authorization = `Bearer ${JSON.parse(userInfo).token}`;
  }
  return req;
});

// Auth endpoints
export const login = (formData) => API.post("/auth/login", formData);
export const register = (formData) => API.post("/auth/register", formData);

// Reports endpoints
export const getCitizenReports = () => API.get("/reports");
export const submitReport = (reportData) => API.post("/reports", reportData);
export const getLeaderboard = () => API.get("/reports/leaderboard");

// Export default axios instance
export default API;
