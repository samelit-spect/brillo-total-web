import React, { useState, useEffect } from 'react';
import { type Producto } from '../info/productos';
import { ProductoCard } from '../components/ProductoCard';
import { obtenerProductos } from '../services/productos';
import { CATEGORIAS } from '../utils/constants';

const CAT_ICONS: Record<string, string> = {
  todos: '✨',
  hogar: '🏡',
  automotor: '🚗',
  insumos: '📦',
};

export const Home: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const [errorFirebase, setErrorFirebase] = useState<string | null>(null);
  const [categoriaActual, setCategoriaActual] = useState<string>('todos');

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        setCargando(true);
        setErrorFirebase(null);
        const lista = await obtenerProductos();
        if (lista.length === 0) {
          setErrorFirebase("No hay productos cargados en la base de datos.");
        }
        setProductos(lista);
      } catch (error) {
        console.error("Error al traer los productos de Firebase:", error);
        setErrorFirebase("Error de conexión con la base de datos. Verificá que Firebase esté configurado correctamente.");
      } finally {
        setCargando(false);
      }
    };
    cargarProductos();
  }, []);

  useEffect(() => {
    const existing = document.getElementById('schema-productos');
    if (existing) existing.remove();
    if (productos.length === 0) return;
    const itemList = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Catálogo de productos Brillo Total',
      description: 'Venta mayorista y minorista de productos de limpieza sueltos y envasados',
      numberOfItems: productos.length,
      itemListElement: productos.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Product',
          name: p.nombre,
          description: p.descripcion,
          category: p.categoria,
          offers: {
            '@type': 'Offer',
            price: p.precioMinorista,
            priceCurrency: 'ARS',
            availability: p.stock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
          },
        },
      })),
    };
    const script = document.createElement('script');
    script.id = 'schema-productos';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(itemList);
    document.head.appendChild(script);
    return () => { script.remove(); };
  }, [productos]);

  const productosFiltrados = categoriaActual === 'todos'
    ? productos
    : productos.filter((prod) => prod.categoria === categoriaActual);

  if (cargando) {
    return (
      <div style={{ padding: 'var(--space-5)', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 'var(--space-6)',
          padding: 'var(--space-3) 0'
        }}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="skeleton-wrapper">
              <div className="skeleton skeleton-img" />
              <div className="skeleton skeleton-tag" />
              <div className="skeleton skeleton-title" />
              <div className="skeleton skeleton-text" />
              <div className="skeleton-price-row">
                <div className="skeleton skeleton-price" />
                <div className="skeleton skeleton-btn" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: 'var(--space-5)', maxWidth: '1200px', margin: '0 auto' }}>

      {/* Hero Banner */}
      <div style={{
        background: 'linear-gradient(135deg, var(--color-navy) 0%, #1e40af 50%, var(--color-primary) 100%)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-8) var(--space-6)',
        color: 'white',
        marginTop: 'var(--space-2)',
        marginBottom: 'var(--space-8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--space-5)',
        position: 'relative',
        overflow: 'hidden',
        flexWrap: 'wrap',
      }}>
        {/* Círculo decorativo */}
        <div style={{
          position: 'absolute',
          top: '-60px',
          right: '-40px',
          width: '200px',
          height: '200px',
          background: 'rgba(255, 255, 255, 0.06)',
          borderRadius: '50%',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-30px',
          left: '10%',
          width: '120px',
          height: '120px',
          background: 'rgba(255, 255, 255, 0.04)',
          borderRadius: '50%',
        }} />

        <div style={{ flex: '1', minWidth: '280px', zIndex: 1 }}>
          <span style={{
            backgroundColor: 'var(--color-accent)',
            color: '#000000',
            padding: '4px 14px',
            borderRadius: 'var(--radius-full)',
            fontSize: '12px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            display: 'inline-block',
            marginBottom: 'var(--space-3)',
          }}>
            🐾 Traé tu Envase y Ahorrá
          </span>
          <h1 style={{
            margin: '0 0 var(--space-2)',
            fontSize: 'clamp(26px, 4vw, 36px)',
            fontWeight: 800,
            lineHeight: '1.15',
            color: '#ffffff',
          }}>
            ¡Llená de Brillo tu Hogar! ✨
          </h1>
          <p style={{
            margin: '0',
            fontSize: '15px',
            opacity: '0.92',
            lineHeight: '1.6',
            maxWidth: '540px',
          }}>
            Elegí los mejores productos de limpieza sueltos para fraccionar por litro.
            Armá tu carrito rápido y envialo directo por WhatsApp.
          </p>
          <p style={{
            marginTop: 'var(--space-3)',
            color: '#fde68a',
            fontSize: '14px',
            fontWeight: 600,
          }}>
            🐕 ¡Si tu pedido supera los 20L, accedés a tarifa Mayorista!
          </p>
        </div>

        <img
          src="/perro-header-transparente.png"
          alt="Mascota Brillo Total"
          style={{
            height: '100px',
            objectFit: 'contain',
            zIndex: 1,
            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
            userSelect: 'none',
          }}
        />
      </div>

      {/* Error de Firebase */}
      {errorFirebase && (
        <div style={{
          textAlign: 'center',
          padding: 'var(--space-4)',
          marginBottom: 'var(--space-5)',
          borderRadius: 'var(--radius-sm)',
          backgroundColor: 'var(--color-danger-light)',
          border: '1px solid var(--color-danger)',
          color: 'var(--color-danger-dark)',
          fontSize: '14px',
          fontWeight: 600,
        }}>
          ⚠️ {errorFirebase}
        </div>
      )}

      {/* Filtros con íconos */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 'var(--space-2)',
        marginBottom: 'var(--space-8)',
        flexWrap: 'wrap',
      }}>
        {CATEGORIAS.map((cat) => {
          const esActivo = categoriaActual === cat;
          return (
            <button
              key={cat}
              onClick={() => setCategoriaActual(cat)}
              style={{
                padding: '8px 18px',
                borderRadius: 'var(--radius-full)',
                border: `1.5px solid ${esActivo ? 'var(--color-primary)' : 'var(--color-border)'}`,
                backgroundColor: esActivo ? 'var(--color-primary)' : 'var(--color-bg-card)',
                color: esActivo ? '#ffffff' : 'var(--color-text-secondary)',
                fontWeight: esActivo ? 700 : 500,
                fontSize: '13px',
                cursor: 'pointer',
                textTransform: 'capitalize',
                transition: 'all 0.2s ease',
                boxShadow: esActivo ? 'var(--shadow-md)' : 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span>{CAT_ICONS[cat]}</span>
              {cat}
            </button>
          );
        })}
      </div>

      {/* Grilla de productos */}
      {productosFiltrados.length === 0 ? (
        <div style={{
          textAlign: 'center',
          color: 'var(--color-text-muted)',
          marginTop: 'var(--space-12)',
          fontSize: '16px',
          padding: 'var(--space-8)',
        }}>
          <div style={{ fontSize: '48px', marginBottom: 'var(--space-4)' }}>✨</div>
          <p>Muy pronto sumaremos productos a la línea <strong style={{ textTransform: 'capitalize' }}>{categoriaActual}</strong>.</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 'var(--space-6)',
          padding: 'var(--space-3) 0',
        }}>
          {productosFiltrados.map((producto) => (
            <ProductoCard key={producto.id} producto={producto} />
          ))}
        </div>
      )}
    </div>
  );
};
