import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_BACKEND_URL, 
  headers: { 
    "Content-Type": "application/json"
  },
  withCredentials: true, // Important for cookies
});

const request = async ({ route, type, body, routeParams }) => {
  let finalRoute = route;

  // Replace route parameters (e.g., /users/:id) with actual values
  if (routeParams) {
    Object.entries(routeParams).forEach(([key, value]) => {
      finalRoute = finalRoute.replace(`:${key}`, encodeURIComponent(value));
    });
  }

  const makeRequest = async (isRetry = false) => {
    try
    {
      let response;
      switch (type.toUpperCase()) {
        case "GET":
          response = await api.get(finalRoute);
          break;
        case "POST":
          response = await api.post(finalRoute, body);
          break;
        case "PUT":
          response = await api.put(finalRoute, body);
          break;
        case "DELETE":
          response = await api.delete(finalRoute, { data: body });
          break;
        default:
          throw new Error(`Invalid request type: ${type}`);
      }

      // Standardize success response
      return {
        data: response.data,
        success: true,
        status: response.status,
        warning: null,
      };
    }
    catch (error)
    {
      console.log("Request error:", error.response?.status, finalRoute);
      
      // Handle 401/403 errors (token expiration)
      if (!isRetry && (error.response?.status === 401 || error.response?.status === 403)) {
        try {
          console.log("Attempting token refresh...");
          // Attempt to refresh the token
          const refreshResponse = await api.get('/refresh');
          
          if (refreshResponse && [200, 201].includes(refreshResponse.status)) {
            console.log("Token refreshed successfully, retrying original request");
            // Retry the original request after refreshing the token
            const retriedResponse = await makeRequest(true);
            return {
              ...retriedResponse,
              warning: refreshResponse.data?.warning || null,
            };
          }
        }
        catch (refreshError) {
          console.log("Refresh failed:", refreshError.response?.status);
          // If refresh fails, log the user out
          if (refreshError.response?.status === 401 || refreshError.response?.status === 403) {
            try {
              await api.post('/logout');
            } catch (logoutError) {
              console.log("Logout failed:", logoutError);
            }
            
            throw {
              message: "Session expired. Please log in again.",
              status: 403,
              data: null,
              warning: null,
              sessionExpired: true
            };
          }
          
          // Re-throw the original error if we couldn't refresh
          throw {
            message: error.response?.data?.message || "Authentication error",
            status: error.response?.status || 401,
            data: error.response?.data || null,
            warning: null,
          };
        }
      }

      // Standardize error response for non-auth errors
      const errorData = error.response?.data || { message: error.message };
      console.log("Error data:", errorData);
      throw {
        message: errorData || "An error occurred",
        status: error.response?.status || 500,
        data: errorData.data || null,
        warning: null,
      };
    }
  };

  // Execute the request and propagate errors
  return await makeRequest();
};

export default request;