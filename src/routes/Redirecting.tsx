import { lazy, Suspense } from 'react';
import { Layout } from '../layout/layout';
import { useAuthStore } from '../store/authStore';

const Home = lazy(() => import('../pages/HomePage'))
const Landing = lazy(() => import('../pages/LandingPage'))

const Redirecting = () => {
  const isAuth = useAuthStore((state)=> state.isAuth)
  return isAuth ?
    <Layout>
      <Suspense fallback={<div>Cargando...</div>}>
        <Home />
      </Suspense>
    </Layout> : <Landing />;
}

export default Redirecting;