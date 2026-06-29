// src/components/ProductoCard.tsx
import React from 'react';
import { type Producto } from '../info/productos';
import { useCart } from '../context/CartContext';

interface ProductoCardProps {
  producto: Producto;
}

export const ProductoCard: React.FC<ProductoCardProps> = ({ producto }) => {
  const { esMayorista, agregarAlCarrito } = useCart();

  const precioMostrar = esMayorista ? producto.precioMayorista : producto.precioMinorista;

  // 🔥 OPTIMIZACIÓN DE PRECIOS: Formateo con separador de miles para Argentina
  const precioFormateado = precioMostrar.toLocaleString('es-AR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });

  return (
    <div style={{
      border: '1px solid var(--color-border)',
      borderRadius: '12px',
      padding: '20px',
      backgroundColor: 'var(--color-bg-card)',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      transition: 'transform 0.2s',
    }}>
      {/* Contenedor de la Imagen */}
      <div style={{ textAlign: 'center', marginBottom: '15px' }}>
        <img
          src={producto.imagenUrl}
          alt={producto.nombre}
          loading="lazy"
          style={{ width: '100%', maxHeight: '180px', objectFit: 'cover', borderRadius: '8px' }}
        />
      </div>

      {/* Información del Producto */}
      <div style={{ flexGrow: 1 }}>
        <span style={{
          fontSize: '12px',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          color: producto.categoria === 'insumos' ? '#e67e22' : '#2ecc71',
          backgroundColor: producto.categoria === 'insumos' ? '#fdf2e9' : '#e8f8f5',
          padding: '4px 8px',
          borderRadius: '20px'
        }}>
          {producto.categoria === 'insumos' ? 'Insumo' : 'Línea Hogar'}
        </span>

        <h3 style={{ margin: '10px 0 5px 0', fontSize: '18px', color: 'var(--color-text)' }}>
          {producto.nombre}
        </h3>

        <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', margin: '0 0 10px 0', minHeight: '40px' }}>
          {producto.descripcion}
        </p>

        <p style={{ fontSize: '14px', fontWeight: '500', color: 'var(--color-text-muted)', margin: '0 0 15px 0' }}>
          Presentación: <strong>{producto.presentacion}</strong>
        </p>
      </div>

      {/* Precio y Acción */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
        <div>
          <span style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--color-primary)' }}>
            ${precioFormateado} {/* <-- Ahora usa el formato limpio con puntos */}
          </span>
          {esMayorista && <span style={{ fontSize: '11px', color: 'var(--color-success-dark)', display: 'block', fontWeight: 'bold' }}>Precio Mayorista</span>}
        </div>

        <button
          disabled={!producto.stock}
          onClick={() => agregarAlCarrito(producto)}
          style={{
            backgroundColor: producto.stock ? 'var(--color-primary)' : 'var(--color-border)', // Gris más suave si está inactivo
            color: producto.stock ? '#ffffff' : 'var(--color-text-secondary)',         // Letra gris en lugar de blanca pura para dar efecto apagado
            border: 'none',
            padding: '10px 15px',
            borderRadius: '8px',
            cursor: producto.stock ? 'pointer' : 'not-allowed',
            fontWeight: '600',
            fontSize: '14px',
            transition: 'background-color 0.2s'
          }}
        >
          {producto.stock ? 'Agregar' : 'Sin Stock'}
        </button>
      </div>
    </div>
  );
};