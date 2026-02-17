import { useCart } from '../../context/Cartcontext';
import type { Product } from '../../types';
import { ShoppingCart, Tag } from 'lucide-react';

export const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();

  // Función manejadora para evitar comportamientos extraños en el clic
  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <div className="bg-white border border-madera/20 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
      {/* Imagen con fondo arena */}
      <div className="relative h-72 overflow-hidden bg-arena">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        {/* Etiqueta de Categoría - Color Palma (Verde) */}
        <div className="absolute top-3 left-3 bg-palma text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 shadow-md">
          <Tag size={10} /> {product.category}
        </div>
      </div>

      {/* Info con tipografía en Verde Palma y Fondo Madera Suave */}
      <div className="p-5 bg-gradient-to-b from-white to-arena/30">
        <h3 className="text-palma font-bold text-lg mb-1 truncate">{product.name}</h3>
        
        {/* Verificación de tallas para evitar errores si el array viene vacío */}
        <p className="text-madera/70 text-xs mb-3 font-semibold uppercase tracking-wider">
          Tallas: {product.sizes && product.sizes.length > 0 ? product.sizes.join(', ') : 'Talla única'}
        </p>
        
        <div className="flex justify-between items-center mt-4">
          <div className="flex flex-col">
            <span className="text-[10px] text-madera/50 uppercase font-bold tracking-tighter">Precio</span>
            <span className="text-2xl font-black text-palma">${product.price}</span>
          </div>
          
          <button 
            onClick={handleAdd}
            aria-label={`Agregar ${product.name} al carrito`}
            className="bg-palma text-white p-3 rounded-xl hover:bg-madera hover:scale-105 active:scale-95 transition-all flex items-center justify-center shadow-lg shadow-palma/20"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
