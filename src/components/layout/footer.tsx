import { Store, Mail, Instagram, Facebook, Twitter } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    /* bg-[#3a2a1a] es el tono madera oscura para el cierre | text-madera-clara para contraste */
    <footer className="bg-[#3a2a1a] text-madera-clara pt-16 pb-8 mt-auto border-t border-palma/20">
      <div className="max-w-[1200px] mx-auto px-5 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Sección 1: Información de marca */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-arena">
            <Store size={28} />
            <span className="text-2xl font-black tracking-tighter uppercase">Koko Store</span>
          </div>
          <p className="text-sm opacity-80 leading-relaxed">
            Inspirados por la naturaleza, diseñados para tu estilo. Moda consciente y exclusiva en cada pieza.
          </p>
          <div className="flex gap-4 pt-2">
            <Instagram size={18} className="cursor-pointer hover:text-arena transition-colors" />
            <Facebook size={18} className="cursor-pointer hover:text-arena transition-colors" />
            <Twitter size={18} className="cursor-pointer hover:text-arena transition-colors" />
          </div>
        </div>

        {/* Sección 2: Enlaces de Compra */}
        <div>
          <h4 className="text-arena font-bold mb-6 uppercase text-xs tracking-widest">Categorías</h4>
          <ul className="list-none p-0 flex flex-col gap-3 text-sm opacity-80">
            <li><a href="/hombre" className="no-underline text-inherit hover:text-arena">Hombre</a></li>
            <li><a href="/mujer" className="no-underline text-inherit hover:text-arena">Mujer</a></li>
            <li><a href="/accesorios" className="no-underline text-inherit hover:text-arena">Accesorios</a></li>
          </ul>
        </div>

        {/* Sección 3: Soporte al cliente */}
        <div>
          <h4 className="text-arena font-bold mb-6 uppercase text-xs tracking-widest">Ayuda</h4>
          <ul className="list-none p-0 flex flex-col gap-3 text-sm opacity-80">
            <li><a href="/faq" className="no-underline text-inherit hover:text-arena">Preguntas Frecuentes</a></li>
            <li><a href="/envios" className="no-underline text-inherit hover:text-arena">Información de Envío</a></li>
            <li><a href="/devoluciones" className="no-underline text-inherit hover:text-arena">Cambios y Devoluciones</a></li>
          </ul>
        </div>

        {/* Sección 4: Newsletter/Contacto */}
        <div>
          <h4 className="text-arena font-bold mb-6 uppercase text-xs tracking-widest">Newsletter</h4>
          <p className="text-xs mb-4 opacity-80 flex items-center gap-2">
            <Mail size={14} /> Únete para recibir novedades.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-2">
            <input 
              type="email" 
              placeholder="Tu email" 
              className="bg-white/5 border border-madera-clara/20 rounded px-4 py-2 text-sm text-arena outline-none focus:border-madera"
            />
            <button 
              type="submit" 
              className="bg-palma text-arena py-2 rounded font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-palma transition-all"
            >
              Suscribirse
            </button>
          </form>
        </div>
      </div>

      {/* Barra de Copyright */}
      <div className="max-w-[1200px] mx-auto px-5 mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest opacity-50">
        <p>&copy; {currentYear} KOKO STORE. Todos los derechos reservados.</p>
        <div className="flex gap-6">
          <a href="/privacidad" className="no-underline text-inherit hover:text-arena">Privacidad</a>
          <a href="/terminos" className="no-underline text-inherit hover:text-arena">Términos</a>
        </div>
      </div>
    </footer>
  );
};
