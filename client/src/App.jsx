import { Routes, Route } from 'react-router-dom';
import { Nav, Footer } from './components';
import { Home, Posts, Login, Users } from './pages';
import { AuthProvider } from '@/contexts';

function App() {
  return (
    <>
      <AuthProvider>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </>
  );
}

export default App;
