// src/views/Home.tsx
import React, { useState, useEffect } from 'react';
import { type Producto } from '../info/productos';
import { ProductoCard } from '../components/ProductoCard';
import { obtenerProductos } from '../services/productos';
import { CATEGORIAS } from '../utils/constants';

export const Home: React.FC = () => {
  // 1. Estados para la base de datos dinámica
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const [errorFirebase, setErrorFirebase] = useState<string | null>(null);
  const [categoriaActual, setCategoriaActual] = useState<string>('todos');

  // 2. Efecto para ir a buscar los productos a internet apenas abra la pantalla
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

  // Schema.org JSON-LD para SEO
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

  // 3. Lógica de filtrado usando el estado dinámico "productos" en vez del archivo estático
  const productosFiltrados = categoriaActual === 'todos'
    ? productos
    : productos.filter((prod) => prod.categoria === categoriaActual);

  // 4. Pantalla de carga con skeleton
  if (cargando) {
    return (
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '25px',
          padding: '10px 0'
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
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>

      {/* 🐕 BANNER HERO - IDENTIDAD BRILLO TOTAL */}
      <div style={{
        background: 'linear-gradient(135deg, var(--color-navy) 0%, var(--color-primary) 100%)',
        borderRadius: '16px',
        padding: '35px 25px',
        color: 'white',
        marginTop: '10px',
        marginBottom: '35px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px',
        boxShadow: '0 10px 20px rgba(59, 130, 246, 0.15)',
        position: 'relative',
        overflow: 'hidden',
        flexWrap: 'wrap'
      }}>
        {/* Efecto de fondo brillante decorativo */}
        <div style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '150px',
          height: '150px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          filter: 'blur(20px)'
        }} />

        {/* Textos del Banner */}
        <div style={{ flex: '1', minWidth: '280px', zIndex: 1 }}>
          <span style={{
            backgroundColor: '#25d366',
            color: 'white',
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            display: 'inline-block',
            marginBottom: '12px'
          }}>
            🐾 Traé tu Envase y Ahorrá
          </span>
          <h1 style={{ margin: '0 0 10px 0', fontSize: '30px', fontWeight: '800', lineHeight: '1.2' }}>
            ¡Llená de Brillo tu Hogar! ✨
          </h1>
          <p style={{ margin: '0', fontSize: '15px', opacity: '0.94', lineHeight: '1.5', maxWidth: '550px' }}>
            Elegí los mejores productos de limpieza sueltos para fraccionar por litro.
            Armá tu carrito rápido y envialo directo por WhatsApp.
            <strong style={{ display: 'block', marginTop: '8px', color: '#fef08a', fontSize: '14px' }}>
              🐕 ¡Si tu pedido es tan largo como yo y supera los 20L, accedés a tarifa Mayorista!
            </strong>
          </p>
        </div>

        {/* 🐕 El Verdadero Perro Salchicha de Brillo Total */}
        <img
          src="/perro-header-transparente.png"
          alt="Mascota Brillo Total"
          style={{
            height: '90px',
            objectFit: 'contain',
            zIndex: 1,
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
            userSelect: 'none'
          }}
        />
      </div>

      {/* Mensaje de error de Firebase */}
      {errorFirebase && (
        <div style={{
          textAlign: 'center',
          padding: '15px',
          marginBottom: '20px',
          borderRadius: '8px',
          backgroundColor: '#fff5f5',
          border: '1px solid #fed7d7',
          color: '#c53030',
          fontSize: '14px',
          fontWeight: 'bold'
        }}>
          ⚠️ {errorFirebase}
        </div>
      )}

      {/* Botonera Interactiva de Filtros */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '12px',
        marginBottom: '40px',
        flexWrap: 'wrap'
      }}>
        {CATEGORIAS.map((cat) => {
          const esActivo = categoriaActual === cat;
          return (
            <button
              key={cat}
              onClick={() => setCategoriaActual(cat)}
              className={esActivo ? '' : 'btn-filter'}
              style={{
                padding: '10px 22px',
                borderRadius: '25px',
                border: '1px solid var(--color-primary)',
                backgroundColor: esActivo ? 'var(--color-primary)' : 'var(--color-bg-card)',
                color: esActivo ? '#ffffff' : 'var(--color-primary)',
                fontWeight: 'bold',
                fontSize: '14px',
                cursor: 'pointer',
                textTransform: 'capitalize',
                transition: 'all 0.2s ease',
                boxShadow: esActivo ? '0 4px 10px rgba(49, 130, 206, 0.25)' : 'none',
                outline: 'none'
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Grilla de Productos o Mensaje de Vacío */}
      {productosFiltrados.length === 0 ? (
        <div style={{ textAlign: 'center', color: 'var(--color-text-muted)', marginTop: '50px', fontSize: '16px' }}>
          ✨ Muy pronto sumaremos productos a la línea <span style={{ textTransform: 'capitalize', fontWeight: 'bold' }}>{categoriaActual}</span>.
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '25px',
          padding: '10px 0'
        }}>
          {productosFiltrados.map((producto) => (
            <ProductoCard key={producto.id} producto={producto} />
          ))}
        </div>
      )}

    </div>
  );
};