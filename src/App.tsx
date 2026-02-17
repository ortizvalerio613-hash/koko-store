import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; 
import { CartProvider } from './context/Cartcontext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/footer';
import { Shop } from './pages/Shop'; 
import { Register } from './pages/Register'; 
import { Login } from './pages/login'; 
import { AdminDashboard } from './pages/AdminDashboard'; 
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import { CartPage } from './pages/CartPage';
// Nueva importación para el historial de clientes
import { MyOrders } from './pages/MyOrders'; 

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  const hideFooter = 
    location.pathname === '/registro' || 
    location.pathname === '/login' || 
    location.pathname.startsWith('/admin') ||
    location.pathname === '/carrito' ||
    location.pathname === '/mis-pedidos'; // Ocultamos footer en el historial para mejor visualización

  return (
    <div className="min-h-screen flex flex-col bg-arena">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
};

function App() {
  return (
    <AuthProvider> 
      <BrowserRouter>
        <CartProvider>
          <MainLayout>
            <Routes>
              {/* --- RUTA PRINCIPAL --- */}
              <Route path="/" element={<Shop />} /> 

              {/* --- CARRITO Y PAGOS --- */}
              <Route path="/carrito" element={<CartPage />} />

              {/* --- HISTORIAL DE PEDIDOS CLIENTE --- */}
              <Route path="/mis-pedidos" element={<MyOrders />} />

              {/* --- AUTENTICACIÓN --- */}
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Register />} />

              {/* --- PANEL ADMINISTRATIVO --- */}
              <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                <Route path="/admin" element={<AdminDashboard />} />
              </Route>

              {/* REDIRECCIÓN POR DEFECTO */}
              <Route path="*" element={<Shop />} />
            </Routes>
          </MainLayout>
        </CartProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
