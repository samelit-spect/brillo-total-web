// src/context/CartContext.tsx
import React, { useState, useMemo, useEffect, type ReactNode } from 'react';
import { type Producto } from '../info/productos';
import { CartContext, type CartItem } from './contextDefinition';


const CART_STORAGE_KEY = 'brillo-cart';
const MAYORISTA_STORAGE_KEY = 'brillo-mayorista';

function cargarCarrito(): CartItem[] {
  try {
    const data = localStorage.getItem(CART_STORAGE_KEY);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.warn('Error al cargar carrito de localStorage:', e);
  }
  return [];
}

function guardarCarrito(items: CartItem[]) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.warn('Error al guardar carrito en localStorage:', e);
  }
}

export type { CartItem };

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(cargarCarrito);
  const [esMayorista, setEsMayorista] = useState<boolean>(() => {
    try {
      return localStorage.getItem(MAYORISTA_STORAGE_KEY) === 'true';
    } catch (e) {
      console.warn('Error al leer preferencia mayorista:', e);
      return false;
    }
  });

  useEffect(() => { guardarCarrito(cart); }, [cart]);
  useEffect(() => {
    try { localStorage.setItem(MAYORISTA_STORAGE_KEY, String(esMayorista)); } catch (e) { console.warn('Error al guardar preferencia mayorista:', e); }
  }, [esMayorista]);

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

  const value = useMemo(() => ({
    cart,
    esMayorista,
    setEsMayorista,
    agregarAlCarrito,
    removerDelCarrito,
    vaciarCarrito,
    obtenerTotal: () => cart.reduce((sum, item) => {
      const precio = esMayorista ? item.producto.precioMayorista : item.producto.precioMinorista;
      return sum + precio * item.cantidad;
    }, 0),
    obtenerCantidadTotal: () => cart.reduce((sum, item) => sum + item.cantidad, 0),
  }), [cart, esMayorista]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
