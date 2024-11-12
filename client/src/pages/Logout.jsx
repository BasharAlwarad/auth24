import { useAuthContext } from '../contexts/userContext';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <button onClick={handleLogout} className="w-full btn btn-primary">
      Logout
    </button>
  );
};

export default Logout;
