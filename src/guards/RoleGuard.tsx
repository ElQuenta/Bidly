import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../store/authStore";

const RoleGuard = () => {
  const user = useAuthStore((state) => state.user)
  return <>{user.role === 'admin' ? Outlet : (Navigate({ to: '/', replace: true }))}</>
};

export default RoleGuard;