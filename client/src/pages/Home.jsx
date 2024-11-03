import { useEffect } from 'react';
import { useAuthContext } from '@/contexts';

const Home = () => {
  const { user, dispatch } = useAuthContext();

  useEffect(() => {
    dispatch({ type: 'LOGIN', payload: { name: 'John Doe' } });
  }, []);

  console.log(user);

  return <div>Home</div>;
};

export default Home;
