import { type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './footer';

interface LayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: LayoutProps) => {
  const location = useLocation();

  // Lógica técnica para identificar las páginas donde NO queremos el Footer
  const hideFooter = 
    location.pathname.startsWith('/admin') || 
    location.pathname === '/login' || 
    location.pathname === '/registro';

  // Esto aparecerá en tu consola F12 si el archivo está bien conectado
  console.log("Ruta actual:", location.pathname, "¿Ocultar footer?:", hideFooter);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      {/* Contenedor principal que crece para ocupar el espacio */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Si hideFooter es true, el footer simplemente no existe en el DOM */}
      {!hideFooter ? <Footer /> : null}
    </div>
  );
};
