// src/App.tsx
import React, { useState } from 'react';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Footer } from './components/Footer';
import { Home } from './views/Home';
import { CarritoView } from './views/CarritoView'; // Importamos la nueva vista
import { CartProvider } from './context/CartContext';

function App() {
  // Estado para controlar qué vista renderizar ('catalogo' o 'carrito')
  const [vistaActual, setVistaActual] = useState<'catalogo' | 'carrito'>('catalogo');

  return (
    <CartProvider>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh',
        backgroundColor: '#f8f9fa',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        {/* Le pasamos la vista actual y la función para cambiarla al Header */}
        <Header vistaActual={vistaActual} alCambiarVista={setVistaActual} />

        {/* Contenedor principal condicional */}
        <Main>
          {vistaActual === 'catalogo' ? (
            <Home />
          ) : (
            <CarritoView alCambiarVista={setVistaActual} />
          )}
        </Main>

        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;