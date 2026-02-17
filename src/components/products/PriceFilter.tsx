import { useCart } from '../../context/Cartcontext';

export const PriceFilter = () => {
  // 1. Extraemos los filtros del estado global
  const { filters, setFilters } = useCart();

  // 2. Función técnica para actualizar el precio en tiempo real
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice = Number(e.target.value);
    setFilters({ ...filters, maxPrice: newPrice });
  };

  return (
    /* Contenedor con borde madera y fondo blanco premium */
    <div className="bg-white p-6 rounded-2xl border border-madera-clara shadow-sm mb-6">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-palma font-bold text-xs uppercase tracking-widest">
          Presupuesto
        </h4>
        {/* Badge con el precio actual resaltado en verde palma */}
        <span className="bg-arena text-palma px-2 py-1 rounded-md text-xs font-black border border-madera-clara">
          ${filters.maxPrice}
        </span>
      </div>

      {/* Input de rango con el color Palma en el control (accent) */}
      <input 
        type="range" 
        min="0" 
        max="1000" 
        step="10"
        value={filters.maxPrice} 
        onChange={handlePriceChange} 
        className="w-full h-1.5 bg-madera-clara rounded-lg appearance-none cursor-pointer accent-palma transition-all"
      />

      <div className="flex justify-between mt-3 text-[10px] font-bold text-madera uppercase tracking-tighter">
        <span>Mín: $0</span>
        <span>Máx: $1000</span>
      </div>
    </div>
  );
};
