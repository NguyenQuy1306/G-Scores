import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = localStorage.getItem('token')
  if (token) {
    if (!config.headers) config.headers = {}
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Handle logout or redirect
      console.error('Unauthorized, logging out...')
    }
    return Promise.reject(error)
  },
)

export default axiosInstance
