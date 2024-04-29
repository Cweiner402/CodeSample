import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';

function Logout() {
    const { setIsAuthenticated, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
      setIsAuthenticated(false);
      setUser(null);
      localStorage.setItem('loggedInUser', null);
      navigate('/');
    }, [setIsAuthenticated, setUser, navigate]);

    return null;
}

export default Logout;