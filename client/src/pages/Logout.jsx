import { useAuthContext } from '../contexts/userContext';
import { useNavigate } from 'react-router-dom';

const Logout = ({ setMessage }) => {
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    setMessage('Logout successful!');
    navigate('/login');
  };

  return (
    <button onClick={handleLogout} className="w-full btn btn-primary">
      Logout
    </button>
  );
};

export default Logout;
