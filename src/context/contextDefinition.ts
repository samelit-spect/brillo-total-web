import { createContext } from 'react';
import { type Producto } from '../info/productos';

export interface CartItem {
  producto: Producto;
  cantidad: number;
}

interface CartContextType {
  cart: CartItem[];
  esMayorista: boolean;
  setEsMayorista: (val: boolean) => void;
  agregarAlCarrito: (producto: Producto) => void;
  removerDelCarrito: (productoId: string) => void;
  vaciarCarrito: () => void;
  obtenerTotal: () => number;
  obtenerCantidadTotal: () => number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);
