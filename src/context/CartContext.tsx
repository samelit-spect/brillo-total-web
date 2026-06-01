// src/context/CartContext.tsx
import React, { createContext, useContext, useState, type ReactNode } from 'react';
import { type Producto } from '../info/productos';

// Definimos la estructura de un ítem dentro del carrito
export interface CartItem {
  producto: Producto;
  cantidad: number;
}

// Definimos todo lo que el contexto va a exponer a la aplicación
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

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [esMayorista, setEsMayorista] = useState<boolean>(false); // Falso = Minorista por defecto

  const agregarAlCarrito = (producto: Producto) => {
    setCart((prevCart) => {
      const existe = prevCart.find((item) => item.producto.id === producto.id);
      if (existe) {
        return prevCart.map((item) =>
          item.producto.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...prevCart, { producto, cantidad: 1 }];
    });
  };

  const removerDelCarrito = (productoId: string) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.producto.id === productoId
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        )
        .filter((item) => item.cantidad > 0)
    );
  };

  const vaciarCarrito = () => setCart([]);

  const obtenerTotal = () => {
    return cart.reduce((acumulado, item) => {
      const precio = esMayorista ? item.producto.precioMayorista : item.producto.precioMinorista;
      return acumulado + precio * item.cantidad;
    }, 0);
  };

  const obtenerCantidadTotal = () => {
    return cart.reduce((acumulado, item) => acumulado + item.cantidad, 0);
  };

  return (
    <CartContext.Provider value={{
      cart,
      esMayorista,
      setEsMayorista,
      agregarAlCarrito,
      removerDelCarrito,
      vaciarCarrito,
      obtenerTotal,
      obtenerCantidadTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado para usar el carrito de forma simple en cualquier componente
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};