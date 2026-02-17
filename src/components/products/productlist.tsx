import { useCart } from '../../context/Cartcontext';
import { ProductCard } from './ProductCard'; 
import type { Product } from '../../types';

export const ProductList = () => {
  // 1. Extraemos el inventario y los filtros del contexto
  const { inventory, filters } = useCart();

  // 2. Lógica de Filtrado con validación de seguridad
  const filteredProducts = inventory.filter((product: Product) => {
    const matchesPrice = product.price <= filters.maxPrice;
    // Aseguramos que sizes exista y sea un array antes de usar includes
    const matchesSize = filters.size === '' || (product.sizes && product.sizes.includes(filters.size));
    
    return matchesPrice && matchesSize;
  });

  return (
    <section className="bg-arena py-6 px-0">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Encabezado con estilo Boutique */}
        <div className="border-b border-madera/20 mb-10 pb-4">
          <h2 className="text-palma text-2xl font-black uppercase tracking-tighter">
            Colección Reciente
          </h2>
          <p className="text-madera/60 text-xs font-bold uppercase tracking-widest mt-1">
            {filteredProducts.length} piezas encontradas
          </p>
        </div>

        {/* Estado Vacío */}
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="text-palma/50 italic text-lg">
              "No hay piezas que coincidan con tu búsqueda en esta temporada."
            </p>
          </div>
        ) : (
          /* Grid Responsivo Optimizado */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-10">
            {filteredProducts.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
