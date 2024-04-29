import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function RedirectToHome() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/');
  }, [navigate]);

  return null;
}

export default RedirectToHome;