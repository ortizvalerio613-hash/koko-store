import { useCart } from '../../context/Cartcontext';
import { X } from 'lucide-react';

export const SizeFilter = () => {
  // 1. Extraemos los filtros actuales y la función para cambiarlos
  const { filters, setFilters } = useCart();

  // 2. Definimos las tallas disponibles
  const sizes = ['S', 'M', 'L', 'XL'];

  // 3. Función técnica para alternar la selección
  const handleSizeClick = (size: string) => {
    const newSize = filters.size === size ? '' : size;
    setFilters({ ...filters, size: newSize });
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-madera-clara shadow-sm">
      <div className="flex justify-between items-center mb-5">
        <h4 className="text-palma font-bold text-xs uppercase tracking-widest">
          Tallas
        </h4>
        {/* Botón de limpiar inteligente: solo aparece si hay algo seleccionado */}
        {filters.size && (
          <button 
            onClick={() => setFilters({ ...filters, size: '' })}
            className="flex items-center gap-1 text-[10px] font-black text-red-700 uppercase bg-red-50 px-2 py-1 rounded-md hover:bg-red-100 transition-colors"
          >
            <X size={10} /> Limpiar
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        {sizes.map((size) => (
          <button
            key={size}
            type="button"
            onClick={() => handleSizeClick(size)}
            className={`
              w-12 h-12 rounded-full text-sm font-bold border transition-all duration-200 flex items-center justify-center
              ${filters.size === size 
                ? 'bg-palma text-arena border-palma scale-110 shadow-md' 
                : 'bg-transparent text-palma border-madera hover:border-palma hover:bg-arena'
              }
            `}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};
