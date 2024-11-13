import { useAuthContext } from '@/contexts';

const Home = () => {
  const { user } = useAuthContext();

  console.log(user);

  return <div>Home</div>;
};

export default Home;
