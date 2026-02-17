import { createContext, useContext, useState, type ReactNode } from 'react';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Intentamos recuperar al usuario del navegador al cargar la app
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('trendstore_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('trendstore_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('trendstore_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de un AuthProvider");
  return context;
};
