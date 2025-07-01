import { BrowserRouter, Route, Routes } from 'react-router'
import { lazy, Suspense } from 'react'

import { Layout } from '../layout/layout'
import AuthGuard from '../guards/AuthGuard'
import RoleGuard from '../guards/RoleGuard'

const SignIn = lazy(() => import('../pages/auth/SignInPage'))
const SignUp = lazy(() => import('../pages/auth/SignUpPage'))
const Redirecting = lazy(() => import('./Redirecting'))
const AuctionRoom = lazy(() => import('../pages/AuctionRoomPage'))
const UserAdmin = lazy(() => import('../pages/admin/UserAdminPage'))
const ErrorPage = lazy(() => import('../pages/error/ErrorPage'))

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Redirecting />} />
        <Route path='signIn' element={<SignIn />} />
        <Route path='signUp' element={<SignUp />} />
        <Route element={
          <AuthGuard>
            <Layout />
          </AuthGuard>
        }>
          <Route path='auctionRoom/:id' element={<AuctionRoom />} />
          <Route element={<RoleGuard />}>
            <Route path='userAdmin' element={
              <Suspense fallback={<div>Cargando...</div>}>
                <UserAdmin />
              </Suspense>} />
          </Route>
        </Route>
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  )
}