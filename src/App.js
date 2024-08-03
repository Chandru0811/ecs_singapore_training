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

  const handleLogin = () => {
    sessionStorage.setItem("isAuthenticated", true);
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    try {
      const response = await api.post("logout");
      if (response.status === 200) {
        toast.success(response.data.message);
        setIsAuthenticated(false);
        sessionStorage.removeItem("isAuthenticated");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("role");
        sessionStorage.removeItem("userName");
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("token");
      }
    } catch (error) {
      toast.error("Logout Unsuccessfull");
    }
  };

  useEffect(() => {
    const isAuthenticatedFromStorage =
      sessionStorage.getItem("isAuthenticated");
    if (isAuthenticatedFromStorage === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <div className="App">
      {isAuthenticated ? (
        <Admin handleLogout={handleLogout} />
      ) : (
        <UserAuth handleLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
