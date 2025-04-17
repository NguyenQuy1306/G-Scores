import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:8080",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const uploadFileAPI = async (file: File): Promise<any> => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await API.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data; 
  } catch (error: any) {
    const message =
      error?.response?.data?.message || error.message || 'Upload failed';
    throw new Error(message);
  }
};
