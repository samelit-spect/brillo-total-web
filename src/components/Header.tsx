// src/components/Header.tsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useCart } from '../hooks/useCart';
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
  const modalRef = useRef<HTMLDivElement>(null);
  const tutorialBtnRef = useRef<HTMLButtonElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const cantidadTotal = obtenerCantidadTotal();

  useEffect(() => {
    if (cantidadTotal === 0) return;
    const frame = requestAnimationFrame(() => setBadgePulse(true));
    return () => cancelAnimationFrame(frame);
  }, [cantidadTotal]);

  useEffect(() => {
    if (!badgePulse) return;
    const t = setTimeout(() => setBadgePulse(false), 300);
    return () => clearTimeout(t);
  }, [badgePulse]);

  const navegarA = (vista: string) => {
    alCambiarVista(vista);
    setMenuAbierto(false);
  };

  const cerrarVideo = useCallback(() => {
    setVideoAbierto(false);
    tutorialBtnRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!videoAbierto) return;
    closeBtnRef.current?.focus();
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') cerrarVideo();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [videoAbierto, cerrarVideo]);

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

        {/* LADO IZQUIERDO: Logo + Nombre */}
        <div
          onClick={() => navegarA('catalogo')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter') navegarA('catalogo'); }}
          style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', height: '48px', width: '70px', justifyContent: 'center' }}>
            <img
              src="/perro-header-transparente.png"
              alt="Mascota Oficial Brillo Total"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                transform: 'scale(1.5)',
                transformOrigin: 'center'
              }}
            />
          </div>

          <span style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', letterSpacing: '0.5px' }}>
            Brillo Total
          </span>
        </div>

        {/* LADO DERECHO */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          flexWrap: 'wrap',
          justifyContent: 'flex-end'
        }}>

          {/* Botón de Ayuda / Video Tutorial */}
          <button
            ref={tutorialBtnRef}
            onClick={() => setVideoAbierto(true)}
            aria-label="Abrir tutorial de la aplicación"
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
                role="switch"
                aria-checked={esMayorista}
                aria-label="Alternar precio mayorista o minorista"
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

          {/* ☰ MENÚ HAMBURGUESA */}
          <button
            onClick={() => setMenuAbierto(!menuAbierto)}
            aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuAbierto}
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
            aria-label={`Carrito de compras, ${cantidadTotal} productos`}
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

        {/* 🍔 MENÚ HAMBURGUESA DESPLEGABLE */}
        {menuAbierto && (
          <div role="menu" style={{
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
            {[
              { vista: 'catalogo', label: '🛍️ Catálogo de Productos' },
              { vista: 'carrito', label: `🛒 Mi Pedido (${cantidadTotal})` },
              { vista: 'nosotros', label: '✨ Sobre Nosotros' },
              { vista: 'ubicacion', label: '📍 Ubicación y Horarios' },
            ].map(({ vista, label }) => (
              <div
                key={vista}
                role="menuitem"
                tabIndex={0}
                onClick={() => navegarA(vista)}
                onKeyDown={(e) => { if (e.key === 'Enter') navegarA(vista); }}
                style={{
                  padding: '12px 20px', cursor: 'pointer',
                  color: vistaActual === vista ? 'var(--color-primary)' : '#ffffff',
                  backgroundColor: vistaActual === vista ? '#2d3748' : 'transparent'
                }}
              >
                {label}
              </div>
            ))}
          </div>
        )}

        {/* 📺 MODAL FLOTANTE DEL TUTORIAL */}
        {videoAbierto && (
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-label="Video tutorial de la aplicación"
            onClick={(e) => { if (e.target === e.currentTarget) cerrarVideo(); }}
            style={{
              position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
              backgroundColor: 'rgba(0, 0, 0, 0.75)', display: 'flex', justifyContent: 'center',
              alignItems: 'center', zIndex: 300, padding: '20px', boxSizing: 'border-box'
            }}
          >
            <div style={{
              backgroundColor: '#ffffff', width: '100%', maxWidth: '640px',
              borderRadius: '12px', overflow: 'hidden', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.3)',
              position: 'relative', display: 'flex', flexDirection: 'column'
            }}>
              {/* Encabezado del Modal */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 20px', backgroundColor: '#f1f5f9', borderBottom: '1px solid var(--color-border-light)', color: 'var(--color-navy)' }}>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>📺 ¿Cómo usar e instalar la App?</h3>
                <button
                  ref={closeBtnRef}
                  onClick={cerrarVideo}
                  aria-label="Cerrar tutorial"
                  style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: 'var(--color-text-muted)', fontWeight: 'bold' }}
                >
                  ✕
                </button>
              </div>

              {/* Contenedor Responsivo del Video */}
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {YOUTUBE_URL ? (
                  <iframe
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                    src={YOUTUBE_URL}
                    title="Tutorial Brillo Total"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <div style={{ textAlign: 'center', padding: '20px', color: 'var(--color-text-secondary)' }}>
                    <p style={{ fontSize: '14px', margin: 0 }}>🎬 Tutorial no disponible</p>
                    <p style={{ fontSize: '12px', margin: '8px 0 0' }}>Configurá la URL del video tutorial en <code>src/utils/constants.ts</code></p>
                  </div>
                )}
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
