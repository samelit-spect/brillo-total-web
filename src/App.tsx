// src/App.tsx
import React, { useState } from 'react';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Footer } from './components/Footer';
import { Home } from './views/Home';
import { CarritoView } from './views/CarritoView';
import { NosotrosView } from './views/NosotrosView'; // Importación nueva
import { UbicacionView } from './views/UbicacionView'; // Importación nueva
import { CartProvider } from './context/CartContext';

// Definimos el tipo estricto de las secciones disponibles
export type TipoVista = 'catalogo' | 'carrito' | 'nosotros' | 'ubicacion';

function App() {
  const [vistaActual, setVistaActual] = useState<TipoVista>('catalogo');

  // Función renderizadora condicional
  const renderizarVista = () => {
    switch (vistaActual) {
      case 'catalogo':
        return <Home />;
      case 'carrito':
        return <CarritoView alCambiarVista={setVistaActual} />;
      case 'nosotros':
        return <NosotrosView />;
      case 'ubicacion':
        return <UbicacionView />;
      default:
        return <Home />;
    }
  };

  return (
    <CartProvider>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh',
        backgroundColor: '#f8f9fa',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        <Header vistaActual={vistaActual} alCambiarVista={setVistaActual} />

        <Main>
          {renderizarVista()}
        </Main>

        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;