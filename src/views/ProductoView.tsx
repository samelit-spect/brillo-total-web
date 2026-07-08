import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { type Producto } from '../info/productos';
import { obtenerProductos } from '../services/productos';
import { useCart } from '../hooks/useCart';
import { formatearPrecio, CATEGORY_STYLES } from '../utils/constants';

export const ProductoView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { esMayorista, agregarAlCarrito } = useCart();

  const [producto, setProducto] = useState<Producto | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const cargar = async () => {
      try {
        setCargando(true);
        const lista = await obtenerProductos();
        const encontrado = lista.find((p) => p.id === id);
        if (!encontrado) {
          setError('Producto no encontrado');
        } else {
          setProducto(encontrado);
          document.title = `${encontrado.nombre} — Brillo Total`;
        }
      } catch {
        setError('Error al cargar el producto');
      } finally {
        setCargando(false);
      }
    };
    cargar();
  }, [id]);

  const handleAdd = () => {
    if (!producto || !producto.stock) return;
    agregarAlCarrito(producto);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  if (cargando) {
    return (
      <div style={{ padding: 'var(--space-5)', maxWidth: '900px', margin: '0 auto' }}>
        <div className="skeleton" style={{ height: '24px', width: '120px', marginBottom: 'var(--space-6)', borderRadius: 'var(--radius-sm)' }} />
        <div style={{ display: 'flex', gap: 'var(--space-8)', flexWrap: 'wrap' }}>
          <div className="skeleton" style={{ flex: '1', minWidth: '300px', aspectRatio: '4 / 3', borderRadius: 'var(--radius-lg)' }} />
          <div style={{ flex: '1', minWidth: '280px' }}>
            <div className="skeleton" style={{ height: '32px', width: '70%', marginBottom: 'var(--space-3)', borderRadius: 'var(--radius-sm)' }} />
            <div className="skeleton" style={{ height: '16px', width: '40%', marginBottom: 'var(--space-5)', borderRadius: 'var(--radius-sm)' }} />
            <div className="skeleton" style={{ height: '14px', width: '100%', marginBottom: '8px', borderRadius: 'var(--radius-sm)' }} />
            <div className="skeleton" style={{ height: '14px', width: '100%', marginBottom: '8px', borderRadius: 'var(--radius-sm)' }} />
            <div className="skeleton" style={{ height: '14px', width: '60%', marginBottom: 'var(--space-6)', borderRadius: 'var(--radius-sm)' }} />
            <div className="skeleton" style={{ height: '40px', width: '200px', borderRadius: 'var(--radius-sm)' }} />
          </div>
        </div>
      </div>
    );
  }

  if (error || !producto) {
    return (
      <div style={{ padding: 'var(--space-5)', maxWidth: '900px', margin: '0 auto', textAlign: 'center', marginTop: 'var(--space-12)' }}>
        <div style={{ fontSize: '48px', marginBottom: 'var(--space-4)' }}>🔍</div>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '16px', marginBottom: 'var(--space-6)' }}>
          {error || 'Producto no encontrado'}
        </p>
        <button onClick={() => navigate('/catalogo')} className="btn-primary" style={{
          backgroundColor: 'var(--color-primary)', color: '#ffffff', border: 'none',
          padding: '12px 24px', borderRadius: 'var(--radius-sm)', fontWeight: 600, fontSize: '14px', cursor: 'pointer',
        }}>
          ← Volver al catálogo
        </button>
      </div>
    );
  }

  const catStyle = CATEGORY_STYLES[producto.categoria] || CATEGORY_STYLES.hogar;

  return (
    <div style={{ padding: 'var(--space-5)', maxWidth: '900px', margin: '0 auto' }}>
      {/* Breadcrumb */}
      <button
        onClick={() => navigate('/catalogo')}
        style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'var(--color-text-secondary)', fontSize: '14px',
          padding: '0 0 var(--space-5)', display: 'flex', alignItems: 'center', gap: '6px',
        }}
      >
        ← Volver al catálogo
      </button>

      <div style={{
        display: 'flex',
        gap: 'var(--space-8)',
        flexWrap: 'wrap',
      }}>
        {/* Imagen */}
        <div style={{
          flex: '1',
          minWidth: '300px',
          position: 'relative',
        }}>
          <div style={{
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            backgroundColor: 'var(--color-border-light)',
            boxShadow: 'var(--shadow-md)',
          }}>
            {!imgError ? (
              <img
                src={producto.imagenUrl}
                alt={producto.nombre}
                width="400"
                height="300"
                loading="lazy"
                decoding="async"
                onError={() => setImgError(true)}
                style={{
                  width: '100%',
                  aspectRatio: '4 / 3',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            ) : (
              <div style={{
                width: '100%',
                aspectRatio: '4 / 3',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'var(--color-border-light)',
                color: 'var(--color-text-muted)',
                fontSize: '48px',
              }}>
                🧴
              </div>
            )}
          </div>
          {!producto.stock && (
            <div style={{
              position: 'absolute',
              top: 'var(--space-3)', left: 'var(--space-3)',
              backgroundColor: 'var(--color-danger)',
              color: '#ffffff',
              padding: '6px 16px',
              borderRadius: 'var(--radius-full)',
              fontWeight: 700,
              fontSize: '13px',
              letterSpacing: '0.5px',
            }}>
              Sin Stock
            </div>
          )}
        </div>

        {/* Detalle */}
        <div style={{
          flex: '1',
          minWidth: '280px',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-4)',
        }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '12px',
            fontWeight: 700,
            textTransform: 'uppercase',
            color: catStyle.color,
            backgroundColor: catStyle.bg,
            padding: '4px 12px',
            borderRadius: 'var(--radius-full)',
            width: 'fit-content',
          }}>
            {catStyle.icon} {catStyle.label}
          </span>

          <h1 style={{
            margin: 0,
            fontSize: 'clamp(24px, 3vw, 32px)',
            fontWeight: 700,
            color: 'var(--color-text)',
            lineHeight: '1.2',
          }}>
            {producto.nombre}
          </h1>

          <p style={{
            fontSize: '14px',
            color: 'var(--color-text-muted)',
            margin: 0,
          }}>
            {producto.presentacion}
          </p>

          <div style={{
            height: '1px',
            backgroundColor: 'var(--color-border)',
            margin: 'var(--space-2) 0',
          }} />

          <p style={{
            fontSize: '15px',
            color: 'var(--color-text-secondary)',
            margin: 0,
            lineHeight: '1.6',
          }}>
            {producto.descripcion}
          </p>

          {/* Precios */}
          <div style={{
            backgroundColor: 'var(--color-bg-elevated)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-4)',
            border: '1px solid var(--color-border)',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 'var(--space-2)',
            }}>
              <span style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>Precio minorista</span>
              <span style={{
                fontSize: '18px',
                fontWeight: 700,
                color: esMayorista ? 'var(--color-text-muted)' : 'var(--color-primary)',
                textDecoration: esMayorista ? 'line-through' : 'none',
              }}>
                ${formatearPrecio(producto.precioMinorista)}
              </span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <span style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>Precio mayorista</span>
              <span style={{
                fontSize: '22px',
                fontWeight: 800,
                color: esMayorista ? 'var(--color-accent-dark)' : 'var(--color-text)',
              }}>
                ${formatearPrecio(producto.precioMayorista)}
              </span>
            </div>
            {esMayorista && (
              <div style={{
                marginTop: 'var(--space-2)',
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--color-accent-dark)',
                textAlign: 'right',
              }}>
                Precio mayorista activo 🐕
              </div>
            )}
          </div>

          <button
            disabled={!producto.stock}
            onClick={handleAdd}
            style={{
              backgroundColor: producto.stock ? 'var(--color-primary)' : 'var(--color-border)',
              color: producto.stock ? '#ffffff' : 'var(--color-text-muted)',
              border: 'none',
              padding: '14px 24px',
              borderRadius: 'var(--radius-sm)',
              cursor: producto.stock ? 'pointer' : 'not-allowed',
              fontWeight: 700,
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 0.2s',
              marginTop: 'auto',
            }}
          >
            <span style={{ fontSize: '20px' }}>🛒</span>
            {producto.stock ? 'Agregar al carrito' : 'Producto sin stock'}
          </button>
        </div>
      </div>

      {showToast && (
        <div className="toast-container">
          <span>✓</span> {producto.nombre} agregado al carrito
        </div>
      )}
    </div>
  );
};
