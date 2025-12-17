import axios from "axios";

//Client API configured for the Gateway
const apiClient = axios.create({
  baseURL: "https://api-gateway-bio-tech.up.railway.app/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

//Interceptor for adding JWT token in each request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth-storage");
    if (token) {
      try {
        const authData = JSON.parse(token);
        if (authData?.state?.token) {
          config.headers.Authorization = `Bearer ${authData.state.token}`;
        }
      } catch (error) {
        console.error("Error parsing auth token:", error);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//Interceptor for handling authentication errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      //Invalid or expired token
      localStorage.removeItem("auth-storage");
      window.dispatchEvent(new Event("auth-change"));
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default apiClient;
