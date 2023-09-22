import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
 const {auth} = useContext(AuthContext)

  useEffect(() => {
    if (auth) {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  }, [auth, navigate]);

  return <>{children}</>;
}

export default ProtectedRoute;