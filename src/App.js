import './App.css';
import Admin from './Layout/Admin';
import { useEffect, useState } from 'react';
import UserAuth from './Layout/UserAuth';
import './styles/admin.css';
import './styles/client.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const navigate = useNavigate();
  const handleLogin = () => {
    sessionStorage.setItem("isAuthenticated", true);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    // navigate("/")
    sessionStorage.removeItem("isAuthenticated");
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
      {
        isAuthenticated? <Admin handleLogout={handleLogout}/>:<UserAuth handleLogin={handleLogin}/>
      }
    </div>
  );
}

export default App;
