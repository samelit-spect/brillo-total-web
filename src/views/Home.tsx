// src/views/Home.tsx
import React, { useState, useEffect } from 'react';
import { type Producto } from '../info/productos';
import { ProductoCard } from '../components/ProductoCard';
import { db } from '../firebase/config'; // Nuestro puente a la DB
import { collection, getDocs } from 'firebase/firestore'; // Herramientas de consulta de Google

export const Home: React.FC = () => {
  // 1. Estados para la base de datos dinámica
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const [categoriaActual, setCategoriaActual] = useState<string>('todos');

  // Array de control para armar los botones del menú
  const categorias: string[] = ['todos', 'hogar', 'automotor', 'insumos'];

  // 2. Efecto para ir a buscar los productos a internet apenas abra la pantalla
  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        setCargando(true);
        const productosRef = collection(db, "productos");
        const querySnapshot = await getDocs(productosRef);

        const listaProductos: Producto[] = [];
        querySnapshot.forEach((doc) => {
          listaProductos.push({ ...doc.data() } as Producto);
        });

        setProductos(listaProductos);
      } catch (error) {
        console.error("Error al traer los productos de Firebase:", error);
      } finally {
        setCargando(false);
      }
    };

    obtenerProductos();
  }, []);

  // 3. Lógica de filtrado usando el estado dinámico "productos" en vez del archivo estático
  const productosFiltrados = categoriaActual === 'todos'
    ? productos
    : productos.filter((prod) => prod.categoria === categoriaActual);

  // 4. Pantalla de carga integrada estéticamente
  if (cargando) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '100px 20px',
        fontSize: '18px',
        color: '#3182ce',
        fontWeight: 'bold'
      }}>
        ✨ Cargando el catálogo de Brillo Total desde la nube...
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>

      {/* 🐕 BANNER HERO - IDENTIDAD BRILLO TOTAL */}
      <div style={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
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
        <div style={{
          fontSize: '75px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          userSelect: 'none',
          zIndex: 1,
          backgroundColor: 'rgba(255,255,255,0.15)',
          padding: '10px 20px',
          borderRadius: '50px',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
          margin: '0 auto'
        }}>
          🐕
        </div>
      </div>

      {/* Botonera Interactiva de Filtros */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '12px',
        marginBottom: '40px',
        flexWrap: 'wrap'
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