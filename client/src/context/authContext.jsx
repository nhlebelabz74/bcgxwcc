// In your authContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const encryptedEmail = localStorage.getItem("encryptedEmail");
      setIsAuthenticated(!!encryptedEmail);
      setLoading(false);
    };
    checkAuth();
  }, []);

  const login = (encryptedEmail) => {
    localStorage.setItem("encryptedEmail", encryptedEmail);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("encryptedEmail");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated, 
        login, 
        logout,
        loading 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);