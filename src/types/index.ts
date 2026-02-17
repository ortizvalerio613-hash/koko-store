export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  sizes: string[];
  category: string;
  quantity?: number; 
  // Agregamos esto para saber qué tienda subió el producto
  vendorId?: string; 
}

export interface User {
  id: string;
  name: string;
  email: string;
  // Agregamos 'vendor' para las tiendas que se registran solas
  role: 'admin' | 'customer' | 'vendor'; 
}
