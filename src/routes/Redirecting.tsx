import { lazy } from 'react';
import { useAuth } from '../context/UserContext';

const Home = lazy(() => import('../pages/HomePage'))
const Landing = lazy(() => import('../pages/LandingPage'))

const Redirecting = () => {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <Home /> : <Landing />;
}

export default Redirecting;