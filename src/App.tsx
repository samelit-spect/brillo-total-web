// src/App.tsx
import { useState } from 'react';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Footer } from './components/Footer';
import { Home } from './views/Home';
import { CarritoView } from './views/CarritoView';
import { NosotrosView } from './views/NosotrosView';
import { UbicacionView } from './views/UbicacionView';
import { Admin } from './views/Admin'; // <-- Importamos la nueva vista
import { CartProvider } from './context/CartContext';

// 1. Sumamos 'admin' al tipo estricto de las secciones
export type TipoVista = 'catalogo' | 'carrito' | 'nosotros' | 'ubicacion' | 'admin';

function App() {
  const [vistaActual, setVistaActual] = useState<TipoVista>('catalogo');

  // 2. Agregamos el caso 'admin' al switch renderizador
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
      case 'admin':
        return <Admin />; // <-- Si la vista es admin, dibuja el panel
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
        {/* Pasamos setVistaActual al Header para que el cliente navegue normal */}
        <Header vistaActual={vistaActual} alCambiarVista={setVistaActual} />

        <Main>
          {renderizarVista()}
        </Main>

        {/* 3. Pasamos vistaActual y setVistaActual al Footer para activar el botón oculto */}
        <Footer vistaActual={vistaActual} alCambiarVista={setVistaActual} />
      </div>
    </CartProvider>
  );
}

export default App;