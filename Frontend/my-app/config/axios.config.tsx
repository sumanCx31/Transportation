import axios from "axios";

const baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL
    ? `${process.env.NEXT_PUBLIC_API_BASE_URL.replace(/\/$/, "")}/api/v1`
    : "http://localhost:9005/api/v1";

export const axiosInstance = axios.create({
  baseURL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// OPTIONAL: token only for protected routes
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


axiosInstance.interceptors.response.use(
  (response) => {
    return response.data
  },
  async (error) => {
    if(error.response) {
      // 
      const {status, data} = error.response;
        throw {
          status,
          data,
          message: error.message,
        };
    } 
    else if(error.request) {
      console.error("No Response: ", error.request)
    } else {
      console.error("Request Error", error.message)
    }
  }
);

export default axiosInstance
