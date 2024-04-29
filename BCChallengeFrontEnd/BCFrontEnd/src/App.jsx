import { useContext, useEffect  } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContext, AuthProvider } from './AuthContext';
import NavBar from './components/header/NavBar';
import Login from './pages/Login/Login';
import Register from './pages/Login/Register';
import PayNow from './pages/Payment/PayNow';
import Home from './pages/Home/Home';
import YourHistory from './pages/History/YourHistory';
import Logout from './pages/Login/Logout';
import RedirectToHome from './components/RedirectToHome';


function Main() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/paynow" element={<PayNow />} />
        <Route path="/yourhistory" element={<YourHistory />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </div>
  );
}

function App() {
  const { setUser, setIsAuthenticated, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const loggedInUsername = localStorage.getItem('loggedInUser');

    if (loggedInUsername) {
      const loggedInUser = users.find(user => user.username === loggedInUsername);
      if (loggedInUser) {
        setUser(loggedInUser);
        setIsAuthenticated(true);
      }
    }
  }, [setUser, setIsAuthenticated]);


  return (
    <Router>
      <Routes>
        {isAuthenticated ? (
          <Route path="/*" element={<Main />} />
        ) : (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/*" element={<RedirectToHome />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default function AppWithAuth() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}