import axios from "axios";

//Client API configured for the Gateway
const apiClient = axios.create({
  // Force correct URL as the environment variable seems to be mimicking a non-existent domain in some local setups
  baseURL: "https://api-gateway-bio-tech.up.railway.app/api",
  timeout: 30000,
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
        
        console.log("🔑 Auth Data:", {
          hasToken: !!authData?.state?.token,
          hasFarm: !!authData?.state?.selectedFarm?.id,
          hasUser: !!authData?.state?.user?.id,
          farmId: authData?.state?.selectedFarm?.id,
          userId: authData?.state?.user?.id
        });
        
        // Add Authorization header with JWT token
        if (authData?.state?.token) {
          config.headers.Authorization = `Bearer ${authData.state.token}`;
        }
        
        // Add X-Farm-Id header if selectedFarm exists (backend expects X-Farm-Id)
        if (authData?.state?.selectedFarm?.id) {
          config.headers['X-Farm-Id'] = authData.state.selectedFarm.id.toString();
        }
        
        // Add X-User-Id header if user exists
        if (authData?.state?.user?.id) {
          config.headers['X-User-Id'] = authData.state.user.id.toString();
        }
        
        // Add X-User-Email header if user email exists
        if (authData?.state?.user?.email) {
          config.headers['X-User-Email'] = authData.state.user.email;
        }
        
        // NOTE: X-Gateway-Secret is COMMENTED OUT because HerdService doesn't have it configured
        // and will reject requests if the secret doesn't match
        // If you need it for other services, configure it in HerdService appsettings.json first
        // const gatewaySecret = import.meta.env.VITE_GATEWAY_SECRET || 'your-shared-secret-between-gateway-and-microservice';
        // config.headers['X-Gateway-Secret'] = gatewaySecret;
        
        console.log("📤 Request Headers:", {
          Authorization: config.headers.Authorization ? 'Bearer ***' : 'missing',
          'X-Farm-Id': config.headers['X-Farm-Id'],
          'X-User-Id': config.headers['X-User-Id'],
          'X-Gateway-Secret': config.headers['X-Gateway-Secret'] ? '***' : 'missing'
        });
      } catch (error) {
        console.error("Error parsing auth token:", error);
      }
    } else {
      console.warn("⚠️ No auth-storage found in localStorage");
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
    console.error("❌ API Error:", {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      url: error.config?.url,
      headers: error.config?.headers
    });
    
    if (error.response?.status === 401) {
      // Check if it's a token issue or just missing farm
      const authStorage = localStorage.getItem("auth-storage");
      let shouldLogout = true;
      
      if (authStorage) {
        try {
          const authData = JSON.parse(authStorage);
          console.log("🔍 Checking auth on 401:", {
            hasToken: !!authData?.state?.token,
            hasFarm: !!authData?.state?.selectedFarm,
            farmId: authData?.state?.selectedFarm?.id
          });
          
          // If we have a valid token but no farm, don't logout, just let the error propagate
          if (authData?.state?.token && !authData?.state?.selectedFarm) {
            console.warn("⚠️ 401 error: No farm selected - NOT logging out");
            shouldLogout = false;
          } else if (authData?.state?.token && authData?.state?.selectedFarm) {
            // We have both token and farm but still got 401 - might be JWT validation issue
            console.error("⚠️ 401 error: Token and farm exist but backend rejected - checking token validity");
            // Let's not logout immediately, let the component handle it
            shouldLogout = false;
          }
        } catch (e) {
          console.error("Error checking auth:", e);
        }
      }
      
      if (shouldLogout) {
        console.error("🚪 401 Unauthorized - clearing session and redirecting to login");
        localStorage.removeItem("auth-storage");
        window.dispatchEvent(new Event("auth-change"));
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
