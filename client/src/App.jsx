import { Routes, Route } from 'react-router-dom';
import { Nav, Footer } from './components';
import { Home, Posts, PostDetail, Login, Users, Register } from './pages';
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
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </>
  );
}

export default App;
