import { lazy, Suspense } from 'react';
import { useAuth } from '../context/UserContext';
import { Layout } from '../layout/layout';

const Home = lazy(() => import('../pages/HomePage'))
const Landing = lazy(() => import('../pages/LandingPage'))

const Redirecting = () => {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ?
    <Layout>
      <Suspense fallback={<div>Cargando...</div>}>
        <Home />
      </Suspense>
    </Layout> : <Landing />;
}

export default Redirecting;