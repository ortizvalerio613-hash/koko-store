import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { products as initialData } from '../data/product';
import type { Product } from '../types';

// 1. Estructura de Mensajería
interface Mensaje {
  emisor: 'cliente' | 'admin';
  texto: string;
  fecha: string;
}

// 2. Estructura de Pedido con Chat
interface Pedido {
  id: string;
  cliente: string;
  productos: Product[];
  total: number;
  estado: 'Pendiente' | 'Enviado';
  fecha: string;
  mensajes: Mensaje[];
}

interface PaymentMethods {
  banco: string;
  tipoCuenta: string;
  numero: string;
  titular: string;
  documento: string;
}

interface Filters { size: string; maxPrice: number; }

// 3. Interfaz del Contexto actualizada con búsqueda
interface CartContextType {
  inventory: Product[];
  cart: Product[];
  pedidos: Pedido[];
  filters: Filters;
  searchTerm: string; // <--- Nuevo: Estado de búsqueda
  totalPrice: number;
  paymentMethods: PaymentMethods;
  setFilters: (f: Filters) => void;
  setSearchTerm: (term: string) => void; // <--- Nuevo: Función de búsqueda
  setPaymentMethods: (m: PaymentMethods) => void;
  addToCart: (p: Product) => void;
  removeFromCart: (id: number | string) => void;
  clearCart: () => void;
  addInventoryProduct: (p: Product) => void;
  removeInventoryProduct: (id: number | string) => void;
  finalizarCompra: (nombreCliente: string) => void;
  actualizarEstadoPedido: (id: string) => void;
  enviarMensaje: (pedidoId: string, texto: string, emisor: 'cliente' | 'admin') => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [inventory, setInventory] = useState<Product[]>(() => {
    const saved = localStorage.getItem('trendstore_inventory');
    return saved ? JSON.parse(saved) : initialData;
  });

  const [cart, setCart] = useState<Product[]>(() => {
    const saved = localStorage.getItem('trendstore_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [pedidos, setPedidos] = useState<Pedido[]>(() => {
    const saved = localStorage.getItem('trendstore_pedidos');
    return saved ? JSON.parse(saved) : [];
  });

  const [paymentMethods, setPaymentMethodsState] = useState<PaymentMethods>(() => {
    const saved = localStorage.getItem('trendstore_payment');
    return saved ? JSON.parse(saved) : { banco: '', tipoCuenta: '', numero: '', titular: '', documento: '' };
  });

  const [filters, setFiltersState] = useState<Filters>({ size: '', maxPrice: 1000 });
  const [searchTerm, setSearchTerm] = useState(''); // <--- Estado inicial vacío

  // Persistencia
  useEffect(() => {
    localStorage.setItem('trendstore_inventory', JSON.stringify(inventory));
  }, [inventory]);

  useEffect(() => {
    localStorage.setItem('trendstore_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('trendstore_pedidos', JSON.stringify(pedidos));
  }, [pedidos]);

  useEffect(() => {
    localStorage.setItem('trendstore_payment', JSON.stringify(paymentMethods));
  }, [paymentMethods]);

  // Lógica del Carrito
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const exists = prev.find((item) => String(item.id) === String(product.id));
      if (exists) {
        return prev.map((item) =>
          String(item.id) === String(product.id) ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number | string) => {
    setCart((prev) => prev.filter(item => String(item.id) !== String(id)));
  };

  const clearCart = () => setCart([]);

  const totalPrice = cart.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);

  // Lógica de Pedidos
  const finalizarCompra = (nombreCliente: string) => {
    if (cart.length === 0) return;
    const nuevoPedido: Pedido = {
      id: `#${Math.floor(1000 + Math.random() * 9000)}`,
      cliente: nombreCliente,
      productos: [...cart],
      total: totalPrice,
      estado: 'Pendiente',
      fecha: new Date().toLocaleDateString(),
      mensajes: []
    };
    setPedidos(prev => [nuevoPedido, ...prev]);
    clearCart();
    alert("¡Pedido realizado!");
  };

  const actualizarEstadoPedido = (id: string) => {
    setPedidos(prev => prev.map(p => p.id === id ? { ...p, estado: 'Enviado' } : p));
  };

  const enviarMensaje = (pedidoId: string, texto: string, emisor: 'cliente' | 'admin') => {
    setPedidos(prev => prev.map(p => {
      if (p.id === pedidoId) {
        const nuevoMensaje: Mensaje = {
          emisor,
          texto,
          fecha: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        return { ...p, mensajes: [...(p.mensajes || []), nuevoMensaje] };
      }
      return p;
    }));
  };

  const addInventoryProduct = (product: Product) => setInventory((prev) => [...prev, product]);
  const removeInventoryProduct = (id: number | string) => {
    setInventory((prev) => prev.filter(p => String(p.id) !== String(id)));
  };

  const setFilters = (newFilters: Filters) => setFiltersState(newFilters);
  const setPaymentMethods = (methods: PaymentMethods) => setPaymentMethodsState(methods);

  return (
    <CartContext.Provider value={{ 
      inventory, cart, pedidos, filters, searchTerm, totalPrice, paymentMethods, 
      setFilters, setSearchTerm, setPaymentMethods, addToCart, removeFromCart, clearCart, 
      addInventoryProduct, removeInventoryProduct, finalizarCompra, actualizarEstadoPedido,
      enviarMensaje 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart debe usarse dentro de un CartProvider");
  return context;
};
