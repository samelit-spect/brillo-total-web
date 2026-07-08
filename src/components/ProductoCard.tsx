import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { type Producto } from '../info/productos';
import { useCart } from '../hooks/useCart';
import { formatearPrecio, CATEGORY_STYLES } from '../utils/constants';
import styles from './ProductoCard.module.css';

interface ProductoCardProps {
  producto: Producto;
}

export const ProductoCard: React.FC<ProductoCardProps> = React.memo(({ producto }) => {
  const { cart, esMayorista, agregarAlCarrito, removerDelCarrito } = useCart();
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);

  const precioMostrar = esMayorista ? producto.precioMayorista : producto.precioMinorista;
  const precioFormateado = formatearPrecio(precioMostrar);
  const catStyle = CATEGORY_STYLES[producto.categoria] || CATEGORY_STYLES.hogar;

  const itemEnCarrito = cart.find((i) => i.producto.id === producto.id);
  const cantidadEnCarrito = itemEnCarrito?.cantidad ?? 0;

  const handleAdd = () => {
    agregarAlCarrito(producto);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 1500);
  };

  return (
    <div
      className={`${styles.card} card-hover`}
      onClick={() => navigate(`/producto/${producto.id}`)}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') navigate(`/producto/${producto.id}`); }}
    >
      <div className={styles.imageWrapper}>
          <img
            src={producto.imagenUrl}
            alt={producto.nombre}
            loading="lazy"
            decoding="async"
            width="320"
            height="180"
            className={styles.image}
            onMouseOver={(e) => { (e.target as HTMLImageElement).style.transform = 'scale(1.05)'; }}
            onMouseOut={(e) => { (e.target as HTMLImageElement).style.transform = 'scale(1)'; }}
          />
        <span
          className={styles.categoryBadge}
          style={{ color: catStyle.color, backgroundColor: catStyle.bg }}
        >
          {catStyle.icon} {catStyle.label}
        </span>
        {!producto.stock && (
          <div className={styles.stockOverlay}>
            Sin Stock
          </div>
        )}
      </div>

      <div className={styles.content}>
        <h3 className={styles.productName}>{producto.nombre}</h3>

        <p className={styles.description}>{producto.descripcion}</p>

        <p className={styles.presentation}>{producto.presentacion}</p>

        <div className={styles.footer}>
          <div>
            <span className={styles.price}>${precioFormateado}</span>
            {esMayorista && (
              <span className={styles.mayoristaTag}>Mayoreo</span>
            )}
          </div>

          {cantidadEnCarrito > 0 ? (
            <div
              className={styles.stepper}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => removerDelCarrito(producto.id)}
                aria-label="Reducir cantidad"
                className={styles.stepperBtn}
              >
                −
              </button>
              <span className={styles.stepperValue}>{cantidadEnCarrito}</span>
              <button
                onClick={() => { agregarAlCarrito(producto); setShowToast(true); setTimeout(() => setShowToast(false), 1500); }}
                aria-label="Aumentar cantidad"
                className={styles.stepperBtn}
              >
                +
              </button>
            </div>
          ) : (
            <button
              disabled={!producto.stock}
              onClick={(e) => { e.stopPropagation(); handleAdd(); }}
              className={styles.addButton}
              style={{
                backgroundColor: producto.stock ? 'var(--color-primary)' : 'var(--color-border)',
                color: producto.stock ? '#ffffff' : 'var(--color-text-muted)',
                cursor: producto.stock ? 'pointer' : 'not-allowed',
              }}
            >
              <span>+</span>
              <span>Agregar</span>
            </button>
          )}
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
