import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/Cartcontext';
import { 
  LogOut, 
  User as UserIcon, 
  Store, 
  ChevronDown, 
  LayoutDashboard, 
  LogIn, 
  ShoppingCart, 
  ShoppingBag, 
  X, 
  ClipboardList,
  Search
} from 'lucide-react';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart, totalPrice, searchTerm, setSearchTerm } = useCart(); 
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

  const totalItems = cart.reduce((acc, item) => acc + (item.quantity || 0), 0);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/');
  };

  return (
    <nav className="bg-palma py-3 shadow-lg sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-6 flex justify-between items-center gap-8">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 text-madera-clara no-underline shrink-0">
          <Store size={26} />
          <span className="text-xl font-black tracking-tighter uppercase">KOKO STORE</span>
        </Link>

        {/* BUSCADOR "COMO LA SEDA" */}
        <div className="flex-1 max-w-xl relative group hidden md:block">
          <div className="relative flex items-center">
            <Search 
              size={18} 
              className="absolute left-4 text-arena/40 group-focus-within:text-arena transition-colors duration-300" 
            />
            <input 
              type="text"
              placeholder="Buscar ropa artesana o tiendas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/10 border border-white/5 py-2.5 pl-11 pr-10 rounded-2xl outline-none text-arena placeholder:text-arena/30 text-sm font-medium transition-all duration-500 ease-in-out focus:bg-white/20 focus:ring-4 focus:ring-white/5 focus:border-arena/20"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-4 text-arena/40 hover:text-arena transition-colors cursor-pointer border-none bg-transparent"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* ACCIONES */}
        <div className="flex items-center gap-6 shrink-0">
          
          {/* SECCIÓN DEL CARRITO */}
          <div className="relative">
            <div 
              onClick={() => setIsCartOpen(!isCartOpen)} 
              className="relative cursor-pointer flex items-center p-2 hover:scale-110 transition-transform"
            >
              <ShoppingCart size={22} className="text-arena" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-palma text-[10px] font-bold rounded-full px-1.5 py-0.5 border border-palma shadow-sm animate-pulse">
                  {totalItems}
                </span>
              )}
            </div>

            {/* DROPDOWN DEL CARRITO */}
            {isCartOpen && (
              <div className="absolute right-0 mt-4 w-72 bg-white border border-madera-clara rounded-2xl shadow-2xl p-5 animate-in fade-in zoom-in duration-200 z-50">
                <div className="flex justify-between items-center mb-4 border-b border-arena pb-2">
                  <h3 className="text-palma font-black text-[10px] uppercase tracking-widest">Resumen</h3>
                  <button onClick={() => setIsCartOpen(false)} className="text-madera/40 hover:text-palma cursor-pointer border-none bg-transparent">
                    <X size={14} />
                  </button>
                </div>

                {cart.length === 0 ? (
                  <div className="py-8 text-center flex flex-col items-center gap-3">
                    <ShoppingBag size={32} className="text-madera/20" />
                    <p className="text-palma font-bold text-sm">Carrito vacío</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="max-h-48 overflow-y-auto pr-2 space-y-2">
                      {cart.map(item => (
                        <div key={item.id} className="flex justify-between items-center text-xs border-b border-arena pb-2">
                          <span className="text-palma font-semibold truncate w-32">{item.name}</span>
                          <span className="text-palma font-black">${item.price * (item.quantity || 1)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="pt-3">
                      <div className="flex justify-between mb-4">
                        <span className="text-[9px] font-bold uppercase text-madera/60">Total</span>
                        <span className="text-base font-black text-palma">${totalPrice}</span>
                      </div>
                      <Link 
                        to="/carrito" 
                        onClick={() => setIsCartOpen(false)}
                        className="block w-full bg-palma text-white text-center py-3 rounded-xl font-black text-[10px] uppercase tracking-widest no-underline shadow-md"
                      >
                        Ver Carrito
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* SECCIÓN DE USUARIO */}
          {user ? (
            <div className="relative">
              <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="flex items-center gap-2 bg-madera-clara/20 text-arena border-none py-1.5 px-3 rounded-full cursor-pointer hover:bg-madera-clara/30 transition-all"
              >
                <div className="w-6 h-6 bg-madera-clara rounded-full flex items-center justify-center">
                  <UserIcon size={14} className="text-palma" />
                </div>
                <span className="text-sm font-medium">{user.name}</span>
                <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              {isOpen && (
                <div className="absolute right-0 top-11 bg-white border border-madera-clara rounded-xl shadow-2xl w-52 overflow-hidden animate-in fade-in slide-in-from-top-2 z-50">
                  <div className="p-3 bg-arena/50 flex flex-col">
                    <strong className="text-sm text-palma">{user.name}</strong>
                    <span className="text-[11px] text-madera capitalize font-bold">{user.role}</span>
                  </div>
                  
                  <div className="py-1">
                    {user.role === 'admin' ? (
                      <Link to="/admin" className="flex items-center gap-2 p-3 text-sm text-gray-700 no-underline hover:bg-arena" onClick={() => setIsOpen(false)}>
                        <LayoutDashboard size={16} className="text-palma" /> Panel Admin
                      </Link>
                    ) : (
                      <Link to="/mis-pedidos" className="flex items-center gap-2 p-3 text-sm text-gray-700 no-underline hover:bg-arena" onClick={() => setIsOpen(false)}>
                        <ClipboardList size={16} className="text-palma" /> Mis Pedidos
                      </Link>
                    )}
                  </div>
                  
                  <div className="border-t border-gray-100" />
                  <button onClick={handleLogout} className="flex items-center gap-2 w-full p-3 text-sm text-red-500 bg-none border-none cursor-pointer hover:bg-red-50 text-left font-bold">
                    <LogOut size={16} /> Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="flex items-center gap-1.5 text-arena no-underline text-sm font-semibold hover:text-madera-clara">
                <LogIn size={18} /> Entrar
              </Link>
              <Link to="/registro" className="bg-madera-clara text-palma py-2 px-4 rounded-lg no-underline text-sm font-bold shadow-md hover:bg-white transition-all">
                Vender
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
