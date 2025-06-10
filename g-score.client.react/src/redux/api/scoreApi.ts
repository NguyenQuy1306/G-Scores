import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:8080",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getScoreByRegistration = async (registrationNumber: string) => {
  const response = await API.get(`/api/scores/${registrationNumber}`);
  return response.data;
};

export const getScoreStatistics = async () => {
  const response = await API.get(`/api/scores/statistics`);
  return response.data;
};

export const getTopStudentsBySubjects = async (params: { limit: number; subjects?: string[] }) => {
  const query = new URLSearchParams();
  query.append('limit', String(params.limit));
  params.subjects?.forEach(subject => query.append('subjects', subject));

  return await API.get(`/api/scores/top?${query.toString()}`);
};
