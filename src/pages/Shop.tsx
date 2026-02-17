import { PriceFilter } from '../components/products/PriceFilter';
import { SizeFilter } from '../components/products/sizefilter';
import { ProductList } from '../components/products/productlist';
import { Filter } from 'lucide-react';
import { useCart } from '../context/Cartcontext';

export const Shop = () => {
  // CORRECCIÓN: Se agregó 'const' y ahora usamos 'inventory' en el render para que no marque error de "no utilizado"
  const { inventory } = useCart();

  return (
    <div className="bg-arena min-h-screen">
      <div className="max-w-[1200px] mx-auto px-5 py-10">
        
        {/* Encabezado de la página - Color Palma (Verde) */}
        <div className="flex items-center gap-3 mb-10 text-palma">
          <Filter size={24} />
          <h1 className="text-3xl font-black uppercase tracking-tighter">
            Explorar Colección ({inventory.length})
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* BARRA LATERAL DE FILTROS */}
          <aside className="w-full lg:w-72 flex flex-col gap-6 shrink-0">
            <div className="sticky top-24">
              <h3 className="text-madera font-black text-[10px] uppercase tracking-[0.2em] mb-6 border-b border-madera/20 pb-2">
                Filtrar por
              </h3>
              
              <div className="flex flex-col gap-8">
                <PriceFilter />
                <SizeFilter />
              </div>
              
              {/* Nota de estilo */}
              <p className="mt-8 text-[11px] text-palma/60 italic leading-relaxed">
                * Todas nuestras piezas son de origen sostenible y curadas artesanalmente.
              </p>
            </div>
          </aside>

          {/* LISTADO DE PRODUCTOS */}
          <main className="flex-grow">
            <ProductList />
          </main>
        </div>
      </div>
    </div>
  );
};
