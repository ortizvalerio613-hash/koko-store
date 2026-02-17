import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface ProtectedRouteProps {
  allowedRoles: string[];
}

export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { user } = useAuth(); // Usamos el hook que ya tienes

  // Si el usuario no está logueado o su rol no está en la lista permitida
  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />; // Lo mandamos a la tienda
  }

  return <Outlet />; // Si es admin/vendedor, lo deja pasar
};
