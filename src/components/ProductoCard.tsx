import React, { useState } from 'react';
import { type Producto } from '../info/productos';
import { useCart } from '../hooks/useCart';
import { formatearPrecio } from '../utils/constants';

interface ProductoCardProps {
  producto: Producto;
}

const CATEGORY_STYLES: Record<string, { color: string; bg: string; label: string; icon: string }> = {
  hogar: { color: '#16a34a', bg: '#dcfce7', label: 'Línea Hogar', icon: '🏡' },
  automotor: { color: '#2563eb', bg: '#dbeafe', label: 'Automotor', icon: '🚗' },
  insumos: { color: '#d97706', bg: '#fef3c7', label: 'Insumo', icon: '📦' },
};

export const ProductoCard: React.FC<ProductoCardProps> = React.memo(({ producto }) => {
  const { esMayorista, agregarAlCarrito } = useCart();
  const [showToast, setShowToast] = useState(false);

  const precioMostrar = esMayorista ? producto.precioMayorista : producto.precioMinorista;
  const precioFormateado = formatearPrecio(precioMostrar);
  const catStyle = CATEGORY_STYLES[producto.categoria] || CATEGORY_STYLES.hogar;

  const handleAdd = () => {
    agregarAlCarrito(producto);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 1500);
  };

  return (
    <div
      className="card-hover"
      style={{
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        backgroundColor: 'var(--color-bg-card)',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Imagen */}
      <div style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '16 / 9',
        overflow: 'hidden',
        backgroundColor: 'var(--color-border-light)',
      }}>
        <img
          src={producto.imagenUrl}
          alt={producto.nombre}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
          }}
          onMouseOver={(e) => { (e.target as HTMLImageElement).style.transform = 'scale(1.05)'; }}
          onMouseOut={(e) => { (e.target as HTMLImageElement).style.transform = 'scale(1)'; }}
        />
        {/* Badge de categoría sobre la imagen */}
        <span style={{
          position: 'absolute',
          top: 'var(--space-2)',
          left: 'var(--space-2)',
          fontSize: '10px',
          fontWeight: 700,
          textTransform: 'uppercase',
          color: catStyle.color,
          backgroundColor: catStyle.bg,
          padding: '3px 10px',
          borderRadius: 'var(--radius-full)',
          letterSpacing: '0.3px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }}>
          {catStyle.icon} {catStyle.label}
        </span>
        {!producto.stock && (
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            fontWeight: 700,
            fontSize: '14px',
            letterSpacing: '1px',
            textTransform: 'uppercase',
          }}>
            Sin Stock
          </div>
        )}
      </div>

      {/* Contenido */}
      <div style={{
        padding: 'var(--space-4)',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
      }}>
        <h3 style={{
          margin: '0 0 var(--space-1)',
          fontSize: '17px',
          fontWeight: 600,
          color: 'var(--color-text)',
          lineHeight: '1.3',
        }}>
          {producto.nombre}
        </h3>

        <p style={{
          fontSize: '13px',
          color: 'var(--color-text-muted)',
          margin: '0 0 var(--space-2)',
          lineHeight: '1.4',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {producto.descripcion}
        </p>

        <p style={{
          fontSize: '12px',
          color: 'var(--color-text-muted)',
          margin: '0 0 var(--space-3)',
        }}>
          {producto.presentacion}
        </p>

        <div style={{
          marginTop: 'auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 'var(--space-2)',
        }}>
          <div>
            <span style={{
              fontSize: '22px',
              fontWeight: 700,
              color: 'var(--color-primary)',
              letterSpacing: '-0.5px',
            }}>
              ${precioFormateado}
            </span>
            {esMayorista && (
              <span style={{
                fontSize: '10px',
                fontWeight: 700,
                color: 'var(--color-accent-dark)',
                display: 'block',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>
                Mayoreo
              </span>
            )}
          </div>

          <button
            disabled={!producto.stock}
            onClick={handleAdd}
            className="btn-primary"
            style={{
              backgroundColor: producto.stock ? 'var(--color-primary)' : 'var(--color-border)',
              color: producto.stock ? '#ffffff' : 'var(--color-text-muted)',
              border: 'none',
              padding: '10px 16px',
              borderRadius: 'var(--radius-sm)',
              cursor: producto.stock ? 'pointer' : 'not-allowed',
              fontWeight: 600,
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s',
            }}
          >
            <span>+</span>
            <span>Agregar</span>
          </button>
        </div>
      </div>

      {showToast && (
        <div className="toast-container">
          <span>✓</span> {producto.nombre} agregado
        </div>
      )}
    </div>
  );
});
