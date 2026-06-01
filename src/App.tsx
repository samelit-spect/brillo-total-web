import { Header } from './components/Header';
import { Main } from './components/Main';
import { Footer } from './components/Footer';

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      {/* 1. Componente Encabezado Semántico */}
      <Header />
      
      {/* 2. Componente Contenedor Principal */}
      <Main>
        <section id="catalogo" style={{ textAlign: 'center', marginTop: '2rem' }}>
          <h2 style={{ color: '#222', fontSize: '2rem' }}>Catálogo de Productos</h2>
          <p style={{ color: '#666', maxWidth: '600px', margin: '1rem auto', lineHeight: '1.6' }}>
            Próximamente vas a poder armar tu pedido de productos de limpieza minorista o mayorista acá y enviarlo directo a WhatsApp de forma automatizada.
          </p>
        </section>
      </Main>

      {/* 3. Componente Pie de Página Semántico */}
      <Footer />
    </div>
  );
}

export default App;