import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Footer } from './components/Footer';
import { Home } from './views/Home';
import { CarritoView } from './views/CarritoView';
import { NosotrosView } from './views/NosotrosView';
import { UbicacionView } from './views/UbicacionView';
import { Admin } from './views/Admin';
import { CartProvider } from './context/CartContext';

const TITULOS: Record<string, string> = {
  '/': 'Brillo Total — Catálogo de Productos de Limpieza',
  '/catalogo': 'Brillo Total — Catálogo de Productos de Limpieza',
  '/carrito': 'Tu Pedido — Brillo Total',
  '/nosotros': 'Sobre Nosotros — Brillo Total',
  '/ubicacion': 'Ubicación y Horarios — Brillo Total',
  '/admin': 'Administración — Brillo Total',
};

const RUTA_A_VISTA: Record<string, string> = {
  '/': 'catalogo',
  '/catalogo': 'catalogo',
  '/carrito': 'carrito',
  '/nosotros': 'nosotros',
  '/ubicacion': 'ubicacion',
  '/admin': 'admin',
};

function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const rutaActual = location.pathname;
  const vistaActual = RUTA_A_VISTA[rutaActual] || 'catalogo';

  useEffect(() => {
    document.title = TITULOS[rutaActual] || 'Brillo Total';
  }, [rutaActual]);

  const alCambiarVista = (vista: string) => {
    const mapa: Record<string, string> = {
      catalogo: '/catalogo',
      carrito: '/carrito',
      nosotros: '/nosotros',
      ubicacion: '/ubicacion',
      admin: '/admin',
    };
    navigate(mapa[vista] || '/catalogo');
  };

  return (
    <CartProvider>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: 'var(--color-bg-page)',
        fontFamily: 'var(--sans)'
      }}>
        <Header vistaActual={vistaActual} alCambiarVista={alCambiarVista} />

        <Main>
          <div key={rutaActual} className="page-transition">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/catalogo" element={<Home />} />
              <Route path="/carrito" element={<CarritoView />} />
              <Route path="/nosotros" element={<NosotrosView />} />
              <Route path="/ubicacion" element={<UbicacionView />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </div>
        </Main>

        <Footer vistaActual={vistaActual} alCambiarVista={alCambiarVista} />
      </div>
    </CartProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
