import React, { useState, useEffect } from 'react';
import { type Producto } from '../info/productos';
import { ProductoCard } from '../components/ProductoCard';
import { obtenerProductos } from '../services/productos';
import { CATEGORIAS } from '../utils/constants';
import styles from './Home.module.css';

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
  const [busqueda, setBusqueda] = useState<string>('');
  const [mostrarScrollTop, setMostrarScrollTop] = useState<boolean>(false);

  useEffect(() => {
    const onScroll = () => setMostrarScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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

  const productosFiltrados = productos.filter((prod) => {
    const coincideCategoria = categoriaActual === 'todos' || prod.categoria === categoriaActual;
    const termino = busqueda.toLowerCase().trim();
    const coincideBusqueda = !termino
      || prod.nombre.toLowerCase().includes(termino)
      || prod.descripcion.toLowerCase().includes(termino);
    return coincideCategoria && coincideBusqueda;
  });

  if (cargando) {
    return (
      <div className={styles.loadingWrapper}>
        <div className={styles.skeletonGrid}>
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
    <div className={styles.wrapper}>

      {/* Hero Banner */}
      <div className={styles.hero}>
        <div className={styles.heroCircle1} />
        <div className={styles.heroCircle2} />

        <div className={styles.heroContent}>
          <span className={styles.heroTag}>
            🐾 Traé tu Envase y Ahorrá
          </span>
          <h1 className={styles.heroTitle}>
            ¡Llená de Brillo tu Hogar! ✨
          </h1>
          <p className={styles.heroText}>
            Elegí los mejores productos de limpieza sueltos para fraccionar por litro.
            Armá tu carrito rápido y envialo directo por WhatsApp.
          </p>
          <p className={styles.heroMayorista}>
            🐕 ¡Si tu pedido supera los 20L, accedés a tarifa Mayorista!
          </p>
        </div>

        <img
          src="/perro-header-transparente.png"
          alt="Mascota Brillo Total"
          width="100"
          height="100"
          decoding="async"
          className={styles.heroImage}
        />
      </div>

      {/* Error de Firebase */}
      {errorFirebase && (
        <div className={styles.errorBanner}>
          ⚠️ {errorFirebase}
        </div>
      )}

      {/* Buscador */}
      <div className={styles.searchWrapper}>
        <div className={styles.searchInner}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscá un producto..."
            aria-label="Buscar productos"
            className={styles.searchInput}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--color-primary)';
              e.target.style.boxShadow = '0 0 0 3px var(--color-primary-lighter)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--color-border)';
              e.target.style.boxShadow = 'none';
            }}
          />
          {busqueda && (
            <button
              onClick={() => setBusqueda('')}
              aria-label="Limpiar búsqueda"
              className={styles.searchClear}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Filtros con íconos */}
      <div className={styles.filters}>
        {CATEGORIAS.map((cat) => {
          const esActivo = categoriaActual === cat;
          return (
            <button
              key={cat}
              onClick={() => setCategoriaActual(cat)}
              className={`${styles.filterBtn} ${esActivo ? styles.filterBtnActive : styles.filterBtnInactive}`}
            >
              <span>{CAT_ICONS[cat]}</span>
              {cat}
            </button>
          );
        })}
      </div>

      {/* Contador de resultados */}
      {!cargando && productos.length > 0 && (
        <div style={{
          textAlign: 'center',
          fontSize: '13px',
          color: 'var(--color-text-muted)',
          marginBottom: 'var(--space-4)',
        }}>
          {productosFiltrados.length === productos.length
            ? `${productos.length} producto${productos.length !== 1 ? 's' : ''} disponible${productos.length !== 1 ? 's' : ''}`
            : `${productosFiltrados.length} de ${productos.length} producto${productos.length !== 1 ? 's' : ''}`}
        </div>
      )}

      {/* Grilla de productos */}
      {productosFiltrados.length === 0 ? (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>
            {busqueda ? '🔍' : '✨'}
          </div>
          {busqueda ? (
            <p>No encontramos <strong>"{busqueda}"</strong> en esta categoría. Probá con otro término.</p>
          ) : (
            <p>Muy pronto sumaremos productos a la línea <strong style={{ textTransform: 'capitalize' }}>{categoriaActual}</strong>.</p>
          )}
        </div>
      ) : (
        <div className={styles.grid}>
          {productosFiltrados.map((producto) => (
            <ProductoCard key={producto.id} producto={producto} />
          ))}
        </div>
      )}

      {/* Botón Volver Arriba */}
      {mostrarScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Volver arriba"
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            border: 'none',
            backgroundColor: 'var(--color-primary)',
            color: '#fff',
            fontSize: '20px',
            cursor: 'pointer',
            boxShadow: '0 2px 12px rgba(0,0,0,0.25)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'opacity 0.2s, transform 0.2s',
          }}
          onMouseOver={(e) => { (e.target as HTMLButtonElement).style.transform = 'scale(1.1)'; }}
          onMouseOut={(e) => { (e.target as HTMLButtonElement).style.transform = 'scale(1)'; }}
        >
          ↑
        </button>
      )}
    </div>
  );
};
