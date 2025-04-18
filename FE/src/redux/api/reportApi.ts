import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:8080",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getSubjectStatistics = async () => {
    return await API.get("/scores/statistics/subjects");  
  };

