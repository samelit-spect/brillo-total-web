import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState, lazy, Suspense } from 'react';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Footer } from './components/Footer';
import { CartProvider } from './context/CartContext';
import { ErrorBoundary } from './components/ErrorBoundary';

const Home = lazy(() => import('./views/Home').then(m => ({ default: m.Home })));
const CarritoView = lazy(() => import('./views/CarritoView').then(m => ({ default: m.CarritoView })));
const NosotrosView = lazy(() => import('./views/NosotrosView').then(m => ({ default: m.NosotrosView })));
const UbicacionView = lazy(() => import('./views/UbicacionView').then(m => ({ default: m.UbicacionView })));
const Admin = lazy(() => import('./views/Admin').then(m => ({ default: m.Admin })));

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

const OG_TAGS: Record<string, { title: string; description: string }> = {
  '/': { title: 'Brillo Total — Catálogo de Productos de Limpieza', description: 'Venta mayorista y minorista de productos de limpieza sueltos y envasados. Fraccionamiento por litro en La Rioja.' },
  '/catalogo': { title: 'Brillo Total — Catálogo de Productos de Limpieza', description: 'Venta mayorista y minorista de productos de limpieza sueltos y envasados. Fraccionamiento por litro en La Rioja.' },
  '/carrito': { title: 'Tu Pedido — Brillo Total', description: 'Resumen de tu pedido de productos de limpieza Brillo Total.' },
  '/nosotros': { title: 'Sobre Nosotros — Brillo Total', description: 'Conocé la historia de Brillo Total, venta de productos de limpieza en La Rioja.' },
  '/ubicacion': { title: 'Ubicación y Horarios — Brillo Total', description: 'Visitanos en La Rioja Capital. Conocé nuestros horarios de atención.' },
  '/admin': { title: 'Administración — Brillo Total', description: 'Panel de administración del catálogo Brillo Total.' },
};

function actualizarMetaTags(ruta: string) {
  const meta = OG_TAGS[ruta] || OG_TAGS['/'];
  const setMeta = (name: string, content: string, property?: string) => {
    let el = document.querySelector(property ? `meta[property="${property}"]` : `meta[name="${name}"]`);
    if (!el) {
      el = document.createElement('meta');
      if (property) (el as HTMLMetaElement).setAttribute('property', property);
      else (el as HTMLMetaElement).setAttribute('name', name);
      document.head.appendChild(el);
    }
    (el as HTMLMetaElement).setAttribute('content', content);
  };
  setMeta('description', meta.description);
  setMeta('og:title', meta.title, 'og:title');
  setMeta('og:description', meta.description, 'og:description');
  setMeta('og:url', window.location.href, 'og:url');
  setMeta('twitter:title', meta.title, 'twitter:title');
  setMeta('twitter:description', meta.description, 'twitter:description');
}

function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const rutaActual = location.pathname;
  const vistaActual = RUTA_A_VISTA[rutaActual] || 'catalogo';

  useEffect(() => {
    document.title = TITULOS[rutaActual] || 'Brillo Total';
    actualizarMetaTags(rutaActual);
  }, [rutaActual]);

  const [offline, setOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const on = () => setOffline(false);
    const off = () => setOffline(true);
    window.addEventListener('online', on);
    window.addEventListener('offline', off);
    return () => { window.removeEventListener('online', on); window.removeEventListener('offline', off); };
  }, []);

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
        {offline && (
          <div style={{
            backgroundColor: '#e53e3e', color: 'white', textAlign: 'center',
            padding: '8px 16px', fontSize: '13px', fontWeight: 'bold'
          }}>
            📡 Sin conexión a internet — los datos pueden estar desactualizados
          </div>
        )}
        <Header vistaActual={vistaActual} alCambiarVista={alCambiarVista} />

        <Main>
          <div key={rutaActual} className="page-transition">
                <ErrorBoundary>
                <Suspense fallback={
              <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--color-text-secondary)' }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>⏳</div>
                <p>Cargando...</p>
              </div>
            }>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalogo" element={<Home />} />
                <Route path="/carrito" element={<CarritoView />} />
                <Route path="/nosotros" element={<NosotrosView />} />
                <Route path="/ubicacion" element={<UbicacionView />} />
                <Route path="/admin" element={<Admin />} />
              </Routes>
            </Suspense>
                </ErrorBoundary>
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
