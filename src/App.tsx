// src/App.tsx
import React from 'react';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Footer } from './components/Footer';
import { Home } from './views/Home';

function App() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Barra de navegación superior */}
      <Header />

      {/* Contenedor principal donde montamos la vista del catálogo */}
      <Main>
        <Home />
      </Main>

      {/* Pie de página con datos de contacto */}
      <Footer />
    </div>
  );
}

export default App;