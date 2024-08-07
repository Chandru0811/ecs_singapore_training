import "./App.css";
import Admin from "./layouts/Admin";
import { useEffect, useState } from "react";
import UserAuth from "./layouts/UserAuth";
import "./styles/admin.css";
import "./styles/client.css";
import toast from "react-hot-toast";
import api from "./config/BaseUrl";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isClientAuthenticated, setIsClientAuthenticated] = useState(false);

  const handleLogin = () => {
    sessionStorage.setItem("isAuthenticated", true);
    sessionStorage.setItem("user", "Admin");
    setIsAuthenticated(true);
  };
  const handleClientLogin = () => {
    sessionStorage.setItem("isClientAuthenticated", true);
    sessionStorage.setItem("user", "Client");
    setIsClientAuthenticated(true);
  };

  const handleLogout = async () => {
    try {
      const response = await api.post("logout");
      if (response.status === 200) {
        toast.success(response.data.message);
        setIsAuthenticated(false);
        sessionStorage.removeItem("isAuthenticated");
        sessionStorage.removeItem("isClientAuthenticated");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("role");
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("userName");
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("token");
      }
    } catch (error) {
      toast.error("Logout Unsuccessfull");
    }
  };
  useEffect(() => {
    const isAuthenticatedFromStorage = sessionStorage.getItem("isAuthenticated") === "true";
    const isClientAuthenticatedFromStorage = sessionStorage.getItem("isClientAuthenticated") === "true";
  
    if (isAuthenticatedFromStorage) {
      setIsAuthenticated(true);
    }
  
    if (isClientAuthenticatedFromStorage) {
      setIsClientAuthenticated(true);
    }
  }, []);
  

  return (
    <div className="App">
      {isAuthenticated ? (
        <Admin handleLogout={handleLogout} />
      ) : (
        <UserAuth handleLogin={handleLogin} handleClientLogin={handleClientLogin} handleLogout={handleLogout}/>
      )}
    </div>
  );
}

export default App;
