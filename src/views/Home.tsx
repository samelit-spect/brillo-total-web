// src/views/Home.tsx
import React, { useState } from 'react';
import { CATALOGO_PRUEBA } from '../info/productos';
import { ProductoCard } from '../components/ProductoCard';

export const Home: React.FC = () => {
  // Definimos el tipo del estado. Puede ser 'todos' o cualquiera de las categorías estrictas del Producto.
  const [categoriaActual, setCategoriaActual] = useState<string>('todos');

  // Array de control para armar los botones del menú
  const categorias: string[] = ['todos', 'hogar', 'automotor', 'insumos'];

  // Lógica de filtrado: si es 'todos' pasa el catálogo completo; si no, filtra por la propiedad exacta
  const productosFiltrados = categoriaActual === 'todos'
    ? CATALOGO_PRUEBA
    : CATALOGO_PRUEBA.filter((prod) => prod.categoria === categoriaActual);

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>

      {/* Encabezado de la Sección */}
      <div style={{ textAlign: 'center', marginBottom: '30px', marginTop: '20px' }}>
        <h2 style={{ fontSize: '28px', color: '#2c3e50', marginBottom: '10px' }}>
          Nuestro Catálogo de Productos
        </h2>
        <p style={{ color: '#7f8c8d', fontSize: '16px', maxWidth: '600px', margin: '0 auto' }}>
          Seleccioná los productos que necesites fraccionar por litro y armá tu pedido de forma rápida.
        </p>
      </div>

      {/* Botonera Interactiva de Filtros */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '12px',
        marginBottom: '40px',
        flexWrap: 'wrap' // Clave para que en celulares no se desborde la pantalla y bajen ordenados
      }}>
        {categorias.map((cat) => {
          const esActivo = categoriaActual === cat;
          return (
            <button
              key={cat}
              onClick={() => setCategoriaActual(cat)}
              style={{
                padding: '10px 22px',
                borderRadius: '25px',
                border: '1px solid #3182ce',
                backgroundColor: esActivo ? '#3182ce' : '#ffffff',
                color: esActivo ? '#ffffff' : '#3182ce',
                fontWeight: 'bold',
                fontSize: '14px',
                cursor: 'pointer',
                textTransform: 'capitalize', // Convierte 'hogar' en 'Hogar' visualmente automáticamente
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
        <div style={{ textAlign: 'center', color: '#7f8c8d', marginTop: '50px', fontSize: '16px' }}>
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