import { useState, useEffect, useRef } from 'react';
import { Send, User, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/Cartcontext';

interface ChatProps {
  pedidoId: string;
  emisor: 'cliente' | 'admin';
}

export const ChatInterno = ({ pedidoId, emisor }: ChatProps) => {
  const { pedidos, enviarMensaje } = useCart();
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Encontrar el pedido actual para mostrar sus mensajes
  const pedido = pedidos.find(p => p.id === pedidoId);

  // Auto-scroll al último mensaje
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [pedido?.mensajes]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoMensaje.trim()) return;
    
    enviarMensaje(pedidoId, nuevoMensaje, emisor);
    setNuevoMensaje('');
  };

  if (!pedido) return null;

  return (
    <div className="bg-white border border-madera/10 rounded-2xl flex flex-col h-[450px] overflow-hidden shadow-xl animate-in fade-in zoom-in duration-300">
      {/* Cabecera del Chat */}
      <div className="bg-palma p-4 text-white flex justify-between items-center shadow-md">
        <div className="flex items-center gap-2">
          <div className="bg-white/20 p-2 rounded-full">
            {emisor === 'admin' ? <User size={16} /> : <ShieldCheck size={16} />}
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em]">Chat de Soporte</h4>
            <p className="text-[9px] opacity-70 font-bold">Pedido: {pedidoId}</p>
          </div>
        </div>
      </div>

      {/* Caja de Mensajes */}
      <div 
        ref={scrollRef}
        className="flex-grow p-4 overflow-y-auto bg-arena/10 space-y-4 scroll-smooth"
      >
        {pedido.mensajes?.length === 0 && (
          <div className="text-center py-10 text-madera/30 italic text-xs">
            "Inicia la conversación sobre este pedido..."
          </div>
        )}

        {pedido.mensajes?.map((m, i) => (
          <div key={i} className={`flex ${m.emisor === emisor ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-2xl shadow-sm ${
              m.emisor === emisor 
                ? 'bg-palma text-white rounded-tr-none' 
                : 'bg-white text-palma border border-madera/10 rounded-tl-none'
            }`}>
              <div className="flex items-center gap-1 mb-1 opacity-60 text-[8px] font-black uppercase tracking-widest">
                {m.emisor === 'admin' ? <ShieldCheck size={8}/> : <User size={8}/>}
                {m.emisor} • {m.fecha}
              </div>
              <p className="text-sm leading-relaxed font-medium">{m.texto}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input de Envío */}
      <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-madera/10 flex gap-2 items-center">
        <input 
          type="text" 
          value={nuevoMensaje}
          onChange={(e) => setNuevoMensaje(e.target.value)}
          placeholder="Escribe un mensaje..."
          className="flex-grow p-3 bg-arena/30 border-none rounded-xl text-sm outline-none focus:ring-2 focus:ring-palma/20 text-palma font-medium transition-all"
        />
        <button 
          type="submit" 
          className="bg-palma text-white p-3 rounded-xl hover:bg-madera hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-lg shadow-palma/20"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};
