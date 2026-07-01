// src/components/Header.tsx
import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { YOUTUBE_URL } from '../utils/constants';

interface HeaderProps {
  vistaActual: string;
  alCambiarVista: (vista: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ vistaActual, alCambiarVista }) => {
  const { esMayorista, setEsMayorista, obtenerCantidadTotal } = useCart();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [videoAbierto, setVideoAbierto] = useState(false);
  const [badgePulse, setBadgePulse] = useState(false);

  const cantidadTotal = obtenerCantidadTotal();

  useEffect(() => {
    if (cantidadTotal > 0) {
      setBadgePulse(true);
      const t = setTimeout(() => setBadgePulse(false), 300);
      return () => clearTimeout(t);
    }
  }, [cantidadTotal]);

  const navegarA = (vista: string) => {
    alCambiarVista(vista);
    setMenuAbierto(false);
  };


  return (
    <header style={{
      backgroundColor: 'var(--color-navy)',
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

        {/* LADO IZQUIERDO: Ahora brilla tu logo gigante con su nombre sin interrupciones */}
        <div
          onClick={() => navegarA('catalogo')}
          style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}
        >
          {/* 🐕 MÁXIMO TAMAÑO FORZADO: Rompiendo el límite de caja estándar */}
          <div style={{ display: 'flex', alignItems: 'center', height: '48px', width: '70px', justifyContent: 'center' }}>
            <img
              src="/perro-header-transparente.png"
              alt="Mascota Oficial Brillo Total"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                transform: 'scale(1.5)', /* 🔥 Agranda el dibujo un 50% más allá de su contenedor sin empujar el Header hacia abajo */
                transformOrigin: 'center'
              }}
            />
          </div>

          <span style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', letterSpacing: '0.5px' }}>
            Brillo Total
          </span>
        </div>

        {/* LADO DERECHO: Botón Tutorial + Switch + Carrito + MENÚ HAMBURGUESA NUEVO */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',               // Le damos 12px para que respire mejor con el nuevo botón
          flexWrap: 'wrap',
          justifyContent: 'flex-end'
        }}>

          {/* Botón de Ayuda / Video Tutorial */}
          <button
            onClick={() => setVideoAbierto(true)}
            style={{
              backgroundColor: 'var(--color-primary-dark)',
              color: '#ffffff',
              border: '1px solid var(--color-primary-light)',
              padding: '6px 10px',
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
            backgroundColor: 'var(--color-primary-dark)',
            padding: '5px 10px',
            borderRadius: '20px',
            border: '1px solid var(--color-primary-light)'
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
                backgroundColor: esMayorista ? 'var(--color-success-dark)' : 'var(--color-border)',
                borderRadius: '20px', transition: '0.3s',
              }}>
                <span style={{
                  position: 'absolute', height: '10px', width: '10px',
                  left: esMayorista ? '17px' : '3px', bottom: '3px',
                  backgroundColor: '#ffffff', borderRadius: '50%', transition: '0.3s'
                }} />
              </span>
            </label>
            <span style={{ fontSize: '11px', marginLeft: '6px', color: esMayorista ? 'var(--color-success)' : 'var(--color-text-muted)', fontWeight: 'bold' }}>
              {esMayorista ? 'May.' : 'Min.'}
            </span>
          </div>

          {/* ☰ MENÚ HAMBURGUESA: Único, ubicado a la izquierda del Carrito */}
          <button
            onClick={() => setMenuAbierto(!menuAbierto)}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '26px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '5px',
              userSelect: 'none',
              marginRight: '2px'
            }}
          >
            {menuAbierto ? '✕' : '☰'}
          </button>

          {/* Botón Carrito */}
          <button
            onClick={() => navegarA(vistaActual === 'carrito' ? 'catalogo' : 'carrito')}
            style={{
              backgroundColor: vistaActual === 'carrito' ? 'var(--color-warning)' : 'var(--color-primary)',
              color: '#ffffff', border: 'none', padding: '6px 12px', borderRadius: '8px',
              fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
              fontSize: '13px'
            }}
          >
            <span>🛒</span>
            <span style={{
              backgroundColor: 'var(--color-danger)', color: '#ffffff', fontSize: '10px',
              padding: '1px 5px', borderRadius: '10px', fontWeight: 'bold',
              transform: badgePulse ? 'scale(1.3)' : 'scale(1)',
              transition: 'transform 0.15s ease',
              display: 'inline-block'
            }}>
              {cantidadTotal}
            </span>
          </button>
        </div>

        {/* 🍔 MENÚ HAMBURGUESA DESPLEGABLE REALINEADO A LA DERECHA */}
        {menuAbierto && (
          <div style={{
            position: 'absolute',
            top: '55px',
            right: 0,
            backgroundColor: 'var(--color-navy)',
            width: '260px',
            boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
            borderRadius: '8px 0 8px 8px',
            padding: '10px 0',
            zIndex: 200,
            borderRight: '4px solid var(--color-primary)'
          }}>
            <div onClick={() => navegarA('catalogo')} style={{ padding: '12px 20px', cursor: 'pointer', color: vistaActual === 'catalogo' ? 'var(--color-primary)' : '#ffffff', backgroundColor: vistaActual === 'catalogo' ? '#2d3748' : 'transparent' }}>🛍️ Catálogo de Productos</div>
            <div onClick={() => navegarA('carrito')} style={{ padding: '12px 20px', cursor: 'pointer', color: vistaActual === 'carrito' ? 'var(--color-primary)' : '#ffffff', backgroundColor: vistaActual === 'carrito' ? '#2d3748' : 'transparent' }}>🛒 Mi Pedido ({cantidadTotal})</div>
            <div onClick={() => navegarA('nosotros')} style={{ padding: '12px 20px', cursor: 'pointer', color: vistaActual === 'nosotros' ? 'var(--color-primary)' : '#ffffff', backgroundColor: vistaActual === 'nosotros' ? '#2d3748' : 'transparent' }}>✨ Sobre Nosotros</div>
            <div onClick={() => navegarA('ubicacion')} style={{ padding: '12px 20px', cursor: 'pointer', color: vistaActual === 'ubicacion' ? 'var(--color-primary)' : '#ffffff', backgroundColor: vistaActual === 'ubicacion' ? '#2d3748' : 'transparent' }}>📍 Ubicación y Horarios</div>
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 20px', backgroundColor: '#f1f5f9', borderBottom: '1px solid var(--color-border-light)', color: 'var(--color-navy)' }}>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>📺 ¿Cómo usar e instalar la App?</h3>
                <button
                  onClick={() => setVideoAbierto(false)}
                  style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: 'var(--color-text-muted)', fontWeight: 'bold' }}
                >
                  ✕
                </button>
              </div>

              {/* Contenedor Responsivo del Video */}
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
                <iframe
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                  src={YOUTUBE_URL}
                  title="Tutorial Brillo Total"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Pie del Modal con Instrucciones Rápidas */}
              <div style={{ padding: '15px 20px', backgroundColor: 'var(--color-bg-page)', fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: '1.5' }}>
                💡 <strong>Tip PWA:</strong> Podés instalar esta página como una aplicación en tu celular tocando los tres puntitos del navegador de tu móvil y seleccionando <strong>"Agregar a la pantalla principal"</strong>.
              </div>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};