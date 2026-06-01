// src/views/Home.tsx
import React from 'react';
import { CATALOGO_PRUEBA } from '../info/productos';
import { ProductoCard } from '../components/ProductoCard';

export const Home: React.FC = () => {
  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      
        {/* Encabezado de la Sección */}
        <div style={{ textAlign: 'center', marginBottom: '40px', marginTop: '20px' }}>
            <h2 style={{ fontSize: '28px', color: '#2c3e50', marginBottom: '10px' }}>
                Nuestro Catálogo de Productos
            </h2>
            <p style={{ color: '#7f8c8d', fontSize: '16px', maxWidth: '600px', margin: '0 auto' }}>
                Seleccioná los productos que necesites fraccionar por litro y armá tu pedido de forma rápida.
            </p>
        </div>

      {/* Grilla de Productos */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '25px',
        padding: '10px 0'
      }}>
        {CATALOGO_PRUEBA.map((producto) => (
          <ProductoCard key={producto.id} producto={producto} />
        ))}
      </div>
      
    </div>
  );
};