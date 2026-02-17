import { useState } from 'react';
import { useCart } from '../context/Cartcontext';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag, MessageCircle, Clock, CheckCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ChatInterno } from '../components/products/ChatInterno';

export const MyOrders = () => {
  const { pedidos } = useCart();
  const { user } = useAuth();
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState<string | null>(null);

  // Filtramos los pedidos que pertenecen al usuario actual
  const misPedidos = pedidos.filter(p => p.cliente === user?.name);

  return (
    <div className="bg-arena min-h-screen py-12 px-5">
      <div className="max-w-[800px] mx-auto">
        
        <header className="flex justify-between items-end mb-10 border-b border-madera/10 pb-6">
          <div>
            <Link to="/" className="flex items-center gap-2 text-palma/60 hover:text-palma mb-2 text-[10px] font-black uppercase tracking-widest no-underline">
              <ArrowLeft size={14} /> Volver a la tienda
            </Link>
            <h1 className="text-palma text-4xl font-black uppercase tracking-tighter">Mis Pedidos</h1>
          </div>
          <div className="text-right">
            <p className="text-madera/40 text-[10px] font-bold uppercase tracking-widest">Coleccionista</p>
            <p className="text-palma font-black">{user?.name || 'Invitado'}</p>
          </div>
        </header>

        {misPedidos.length === 0 ? (
          <div className="bg-white p-20 rounded-[40px] text-center shadow-sm border border-madera/10">
            <ShoppingBag size={48} className="mx-auto text-madera/20 mb-4" />
            <h2 className="text-palma text-xl font-bold">Aún no tienes pedidos</h2>
            <p className="text-madera/60 text-sm mt-2 italic">"Tu próxima pieza artesanal te espera en la tienda."</p>
            <Link to="/" className="inline-block mt-8 bg-palma text-white px-8 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest no-underline">
              Explorar Tienda
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {misPedidos.map(pedido => (
              <div key={pedido.id} className="bg-white rounded-[30px] shadow-md border border-madera/5 overflow-hidden transition-all hover:shadow-xl">
                <div className="p-6 flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-2xl ${pedido.estado === 'Enviado' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-500'}`}>
                      {pedido.estado === 'Enviado' ? <CheckCircle size={24} /> : <Clock size={24} />}
                    </div>
                    <div>
                      <h3 className="text-palma font-black text-lg">Pedido {pedido.id}</h3>
                      <p className="text-madera/50 text-[10px] font-bold uppercase tracking-widest">{pedido.fecha} • ${pedido.total}</p>
                    </div>
                  </div>

                  <div className="flex gap-3 w-full md:w-auto">
                    <button 
                      onClick={() => setPedidoSeleccionado(pedidoSeleccionado === pedido.id ? null : pedido.id)}
                      className="flex-grow md:flex-grow-0 flex items-center justify-center gap-2 bg-palma text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest cursor-pointer hover:bg-madera transition-all border-none"
                    >
                      <MessageCircle size={16} /> {pedidoSeleccionado === pedido.id ? 'Cerrar Chat' : 'Chat con Tienda'}
                    </button>
                  </div>
                </div>

                {pedidoSeleccionado === pedido.id && (
                  <div className="p-6 bg-arena/20 border-t border-madera/5">
                    <ChatInterno pedidoId={pedido.id} emisor="cliente" />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
