// src/components/Header.tsx
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { type TipoVista } from '../App';

interface HeaderProps {
  vistaActual: TipoVista;
  alCambiarVista: (vista: TipoVista) => void;
}

export const Header: React.FC<HeaderProps> = ({ vistaActual, alCambiarVista }) => {
  const { esMayorista, setEsMayorista, obtenerCantidadTotal } = useCart();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [videoAbierto, setVideoAbierto] = useState(false); // Estado para el modal del tutorial

  const navegarA = (vista: TipoVista) => {
    alCambiarVista(vista);
    setMenuAbierto(false);
  };

  // 📝 ACÁ VA EL LINK DE TU VIDEO DE YOUTUBE:
  // Cuando subas el video, cambiá lo que va después de "embed/" por el ID de tu video.
  // Ejemplo: https://www.youtube.com/embed/TU_ID_DE_VIDEO
  const urlVideoYouTube = "https://www.youtube.com/embed/dQw4w9WgXcQ";

  return (
    <header style={{
      backgroundColor: '#1a365d',
      color: '#ffffff',
      padding: '15px 20px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative'
      }}>

        <div
          onClick={() => navegarA('catalogo')}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
        >
          {/* 🐕 MÁXIMO TAMAÑO SEGURO PARA EL PERRITO */}
          <img
            src="/perro-header-transparente.png"
            alt="Mascota Oficial Brillo Total"
            style={{
              height: '45px',       // Subimos al máximo el tamaño vertical
              width: 'auto',        // Sigue manteniendo la proporción horizontal del salchicha
              objectFit: 'contain',
              display: 'block'
            }}
          />

          <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', letterSpacing: '0.5px' }}>
            Brillo Total
          </h1>
        </div>

        {/* LADO DERECHO: Botón Tutorial + Switch + Carrito (Responsivo) */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',              // Ajustamos el espacio a 10px para ganar margen
          flexWrap: 'wrap',         // Si no entra en celulares, se acomoda abajo sin desbordar
          justifyContent: 'flex-end'
        }}>

          {/* Botón de Ayuda / Video Tutorial */}
          <button
            onClick={() => setVideoAbierto(true)}
            style={{
              backgroundColor: '#2d3748',
              color: '#ffffff',
              border: '1px solid #4a5568',
              padding: '6px 10px',   // Un toque más compacto
              borderRadius: '20px',
              cursor: 'pointer',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '12px',
              transition: 'background-color 0.2s'
            }}
            title="¿Cómo usar la App?"
          >
            <span>📺</span>
            <span style={{ display: 'inline', whiteSpace: 'nowrap' }}>Tutorial</span>
          </button>

          {/* Switch Mayorista / Minorista */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#2d3748',
            padding: '5px 10px',
            borderRadius: '20px',
            border: '1px solid #4a5568'
          }}>
            <label style={{ position: 'relative', display: 'inline-block', width: '30px', height: '16px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={esMayorista}
                onChange={(e) => setEsMayorista(e.target.checked)}
                style={{ opacity: 0, width: 0, height: 0 }}
              />
              <span style={{
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                backgroundColor: esMayorista ? '#38a169' : '#cbd5e0',
                borderRadius: '20px', transition: '0.3s',
              }}>
                <span style={{
                  position: 'absolute', height: '10px', width: '10px',
                  left: esMayorista ? '17px' : '3px', bottom: '3px',
                  backgroundColor: '#ffffff', borderRadius: '50%', transition: '0.3s'
                }} />
              </span>
            </label>
            <span style={{ fontSize: '11px', marginLeft: '6px', color: esMayorista ? '#48bb78' : '#cbd5e0', fontWeight: 'bold' }}>
              {esMayorista ? 'May.' : 'Min.'}
            </span>
          </div>

          {/* Botón Carrito */}
          <button
            onClick={() => navegarA(vistaActual === 'carrito' ? 'catalogo' : 'carrito')}
            style={{
              backgroundColor: vistaActual === 'carrito' ? '#e67e22' : '#3182ce',
              color: '#ffffff', border: 'none', padding: '6px 12px', borderRadius: '8px',
              fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
              fontSize: '13px'
            }}
          >
            <span>🛒</span>
            <span style={{
              backgroundColor: '#e53e3e', color: '#ffffff', fontSize: '10px',
              padding: '1px 5px', borderRadius: '10px', fontWeight: 'bold'
            }}>
              {obtenerCantidadTotal()}
            </span>
          </button>
        </div>

        {/* 🍔 MENÚ HAMBURGUESA DESPLEGABLE */}
        {menuAbierto && (
          <div style={{
            position: 'absolute', top: '55px', left: '-20px', backgroundColor: '#1a202c',
            width: '260px', boxShadow: '0 8px 16px rgba(0,0,0,0.2)', borderRadius: '0 0 8px 0',
            padding: '10px 0', zIndex: 200, borderLeft: '4px solid #3182ce'
          }}>
            <div onClick={() => navegarA('catalogo')} style={{ padding: '12px 20px', cursor: 'pointer', color: vistaActual === 'catalogo' ? '#3182ce' : '#ffffff', backgroundColor: vistaActual === 'catalogo' ? '#2d3748' : 'transparent' }}>🛍️ Catálogo de Productos</div>
            <div onClick={() => navegarA('carrito')} style={{ padding: '12px 20px', cursor: 'pointer', color: vistaActual === 'carrito' ? '#3182ce' : '#ffffff', backgroundColor: vistaActual === 'carrito' ? '#2d3748' : 'transparent' }}>🛒 Mi Pedido ({obtenerCantidadTotal()})</div>
            <div onClick={() => navegarA('nosotros')} style={{ padding: '12px 20px', cursor: 'pointer', color: vistaActual === 'nosotros' ? '#3182ce' : '#ffffff', backgroundColor: vistaActual === 'nosotros' ? '#2d3748' : 'transparent' }}>✨ Sobre Nosotros</div>
            <div onClick={() => navegarA('ubicacion')} style={{ padding: '12px 20px', cursor: 'pointer', color: vistaActual === 'ubicacion' ? '#3182ce' : '#ffffff', backgroundColor: vistaActual === 'ubicacion' ? '#2d3748' : 'transparent' }}>📍 Ubicación y Horarios</div>
          </div>
        )}

        {/* 📺 MODAL FLOTANTE DEL TUTORIAL DE YOUTUBE */}
        {videoAbierto && (
          <div style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.75)', display: 'flex', justifyContent: 'center',
            alignItems: 'center', zIndex: 300, padding: '20px', boxSizing: 'border-box'
          }}>
            <div style={{
              backgroundColor: '#ffffff', width: '100%', maxWidth: '640px',
              borderRadius: '12px', overflow: 'hidden', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.3)',
              position: 'relative', display: 'flex', flexDirection: 'column'
            }}>
              {/* Encabezado del Modal */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 20px', backgroundColor: '#f1f5f9', borderBottom: '1px solid #e2e8f0', color: '#1a365d' }}>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>📺 ¿Cómo usar e instalar la App?</h3>
                <button
                  onClick={() => setVideoAbierto(false)}
                  style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#64748b', fontWeight: 'bold' }}
                >
                  ✕
                </button>
              </div>

              {/* Contenedor Responsivo del Video */}
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
                <iframe
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                  src={urlVideoYouTube}
                  title="Tutorial Brillo Total"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Pie del Modal con Instrucciones Rápidas */}
              <div style={{ padding: '15px 20px', backgroundColor: '#f8fafc', fontSize: '13px', color: '#475569', lineHeight: '1.5' }}>
                💡 <strong>Tip PWA:</strong> Podés instalar esta página como una aplicación en tu celular tocando los tres puntitos del navegador de tu móvil y seleccionando <strong>"Agregar a la pantalla principal"</strong>.
              </div>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};