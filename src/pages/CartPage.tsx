 import { useState } from 'react';
// Corregido: La ruta correcta para páginas suele ser '../../context/Cartcontext' 
// o '../context/Cartcontext' dependiendo de tu carpeta. 
// También nos aseguramos de que coincida con el nombre del archivo físico.
import { useCart } from '../context/Cartcontext'; 
import { ShoppingBag, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ChatInterno } from '../components/products/ChatInterno';

export const CartPage = () => {
  const { cart, totalPrice, paymentMethods, finalizarCompra, pedidos } = useCart();
  const [paso, setPaso] = useState<'carrito' | 'pago' | 'confirmado'>('carrito');
  const [nombre, setNombre] = useState('');
  
  // Obtenemos el pedido más reciente para el chat
  const ultimoPedido = pedidos.length > 0 ? pedidos[0] : null;

  const handleConfirmar = () => {
    if (!nombre.trim()) return alert("Por favor, ingresa tu nombre completo");
    finalizarCompra(nombre);
    setPaso('confirmado');
  };

  return (
    <div className="bg-arena min-h-screen py-12 px-5 font-sans">
      <div className="max-w-[600px] mx-auto bg-white p-8 rounded-[30px] shadow-xl border border-madera/10">
        
        {paso === 'carrito' && (
          <div className="animate-in fade-in duration-500">
            <h2 className="text-palma font-black text-2xl mb-6 uppercase tracking-tighter">Tu Selección</h2>
            <div className="space-y-1">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between py-3 border-b border-arena/50">
                  <span className="text-palma font-bold">{item.name} <span className="text-madera/50">x{item.quantity}</span></span>
                  <span className="text-palma font-black">${item.price * (item.quantity || 1)}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-between items-center">
              <span className="text-madera font-black text-[10px] uppercase tracking-widest">Total a pagar</span>
              <span className="text-3xl font-black text-palma">${totalPrice}</span>
            </div>
            <button 
              onClick={() => setPaso('pago')} 
              className="w-full bg-palma text-white py-4 rounded-2xl mt-8 font-black uppercase text-xs tracking-widest hover:bg-madera transition-all cursor-pointer shadow-lg shadow-palma/20"
            >
              CONTINUAR AL PAGO
            </button>
          </div>
        )}

        {paso === 'pago' && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <h2 className="text-palma font-black text-xl mb-4 uppercase flex items-center gap-2">
              <CreditCard size={20} /> Datos de Pago
            </h2>
            <div className="bg-arena/30 p-5 rounded-2xl mb-6 border border-madera/10">
              <p className="text-[9px] font-black text-madera/50 uppercase mb-1 tracking-widest">Banco Destino</p>
              <p className="text-palma font-black mb-4">{paymentMethods.banco || 'Pendiente de configurar'}</p>
              <p className="text-[9px] font-black text-madera/50 uppercase mb-1 tracking-widest">Número de Cuenta</p>
              <p className="text-palma font-black tracking-widest">{paymentMethods.numero || '---'}</p>
            </div>
            <label className="text-[10px] font-black text-madera/50 uppercase ml-2 mb-1 block">Nombre del Cliente</label>
            <input 
              type="text" 
              placeholder="Ej: Juan Pérez" 
              value={nombre} 
              onChange={(e) => setNombre(e.target.value)} 
              className="w-full p-4 bg-arena/20 border-none rounded-xl mb-6 font-bold text-palma outline-none focus:ring-2 focus:ring-palma/20" 
            />
            <button 
              onClick={handleConfirmar} 
              className="w-full bg-palma text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-madera transition-all cursor-pointer shadow-lg shadow-palma/20"
            >
              CONFIRMAR PEDIDO
            </button>
          </div>
        )}

        {paso === 'confirmado' && (
          <div className="text-center animate-in zoom-in duration-500">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
              <ShoppingBag className="text-green-600" size={28} />
            </div>
            <h2 className="text-palma font-black text-2xl uppercase mb-2">¡Pedido Exitoso!</h2>
            <p className="text-madera/60 text-sm mb-8 italic">"Gracias por valorar el arte sostenible. Coordina los detalles abajo."</p>
            
            {ultimoPedido && (
              <div className="text-left border-t border-arena pt-6">
                 <ChatInterno pedidoId={ultimoPedido.id} emisor="cliente" />
              </div>
            )}
            
            <Link to="/" className="block mt-8 text-palma font-black uppercase text-[10px] tracking-[0.3em] no-underline hover:text-madera transition-colors">
              ← Volver a la tienda
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
