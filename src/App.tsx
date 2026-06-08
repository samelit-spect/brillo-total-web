// src/App.tsx
import { useState } from 'react';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Footer } from './components/Footer';
import { Home } from './views/Home';
import { CarritoView } from './views/CarritoView';
import { NosotrosView } from './views/NosotrosView'; // Importación nueva
import { UbicacionView } from './views/UbicacionView'; // Importación nueva
import { CartProvider } from './context/CartContext';
// import { useEffect } from 'react';
// import { db } from './firebase/config';
// import { collection, doc, setDoc } from 'firebase/firestore';
// import { CATALOGO_PRUEBA } from './info/productos';

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

  // useEffect(() => {
  //   const migrarProductos = async () => {
  //     console.log("Iniciando migración de productos a Firestore...");
  //     try {
  //       for (const producto of CATALOGO_PRUEBA) {
  //         // Creamos una referencia usando el mismo ID que ya definiste ('1', '2', etc.)
  //         const productoRef = doc(collection(db, "productos"), producto.id);
  //         await setDoc(productoRef, producto);
  //         console.log(`Producto ${producto.nombre} subido con éxito.`);
  //       }
  //       console.log("¡Migración completada con éxito en la nube! ✅");
  //     } catch (error) {
  //       console.error("Error al migrar los productos: ", error);
  //     }
  //   };

  //   // Descomentá la línea de abajo SOLO para que corra una vez, después la volvemos a comentar
  //   migrarProductos();
  // }, []);

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