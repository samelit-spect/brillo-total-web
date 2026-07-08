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
  const modalRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const cantidadTotal = obtenerCantidadTotal();

  useEffect(() => {
    if (!menuAbierto) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuAbierto(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [menuAbierto]);

  const navegarA = (vista: string) => {
    alCambiarVista(vista);
    setMenuAbierto(false);
  };

  const cerrarVideo = useCallback(() => {
    setVideoAbierto(false);
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
      padding: '0 20px',
      height: '64px',
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
        height: '100%',
        position: 'relative',
        gap: 'var(--space-4)',
      }}>

        {/* Logo + Nombre */}
        <div
          onClick={() => navegarA('catalogo')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter') navegarA('catalogo'); }}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', flexShrink: 0 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', height: '40px', width: '56px', justifyContent: 'center' }}>
            <img
              src="/perro-header-transparente.png"
              alt="Mascota Oficial Brillo Total"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                transform: 'scale(1.3)',
                transformOrigin: 'center'
              }}
            />
          </div>
          <span style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '-0.3px', whiteSpace: 'nowrap' }}>
            Brillo Total
          </span>
        </div>

        {/* Lado derecho */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          flexShrink: 0,
        }}>

          {/* Switch Mayorista / Minorista */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: 'rgba(255,255,255,0.1)',
            padding: '4px 10px 4px 12px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid rgba(255,255,255,0.15)',
            height: '34px',
          }}>
            <span style={{
              fontSize: '11px',
              fontWeight: 700,
              color: esMayorista ? 'rgba(255,255,255,0.5)' : '#ffffff',
              transition: 'color 0.3s',
              userSelect: 'none',
            }}>
              Min
            </span>
            <label style={{
              position: 'relative',
              display: 'inline-block',
              width: '32px',
              height: '18px',
              cursor: 'pointer',
            }}>
              <input
                type="checkbox"
                checked={esMayorista}
                onChange={(e) => setEsMayorista(e.target.checked)}
                role="switch"
                aria-checked={esMayorista}
                aria-label="Alternar precio mayorista o minorista"
                style={{ opacity: 0, width: 0, height: 0, position: 'absolute' }}
              />
              <span style={{
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                backgroundColor: esMayorista ? 'var(--color-accent)' : 'rgba(255,255,255,0.25)',
                borderRadius: 'var(--radius-full)', transition: 'background-color 0.3s',
              }}>
                <span style={{
                  position: 'absolute', height: '14px', width: '14px',
                  left: esMayorista ? '16px' : '2px', top: '2px',
                  backgroundColor: '#ffffff', borderRadius: '50%', transition: 'left 0.3s, transform 0.3s',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
                }} />
              </span>
            </label>
            <span style={{
              fontSize: '11px',
              fontWeight: 700,
              color: esMayorista ? 'var(--color-accent)' : 'rgba(255,255,255,0.5)',
              transition: 'color 0.3s',
              userSelect: 'none',
            }}>
              May
            </span>
          </div>

          {/* Carrito */}
          <button
            onClick={() => navegarA(vistaActual === 'carrito' ? 'catalogo' : 'carrito')}
            aria-label={`Carrito de compras, ${cantidadTotal} productos`}
            style={{
              backgroundColor: vistaActual === 'carrito' ? 'var(--color-accent)' : 'rgba(255,255,255,0.1)',
              color: '#ffffff',
              border: '1px solid rgba(255,255,255,0.15)',
              padding: '6px 12px',
              borderRadius: 'var(--radius-full)',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '13px',
              height: '34px',
              transition: 'all 0.2s',
            }}
          >
            <span style={{ fontSize: '16px', lineHeight: 1 }}>🛒</span>
            {cantidadTotal > 0 && (
              <span style={{
                backgroundColor: 'var(--color-accent)',
                color: '#000000',
                fontSize: '10px',
                fontWeight: 800,
                padding: '1px 6px',
                borderRadius: 'var(--radius-full)',
                minWidth: '18px',
                textAlign: 'center',
                lineHeight: '16px',
              }}>
                {cantidadTotal}
              </span>
            )}
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setMenuAbierto(!menuAbierto)}
            aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuAbierto}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '22px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '6px',
              width: '34px',
              height: '34px',
              borderRadius: 'var(--radius-sm)',
              transition: 'background-color 0.2s',
            }}
          >
            {menuAbierto ? '✕' : '☰'}
          </button>
        </div>

        {/* Menú hamburguesa desplegable */}
        {menuAbierto && (
          <div
            ref={menuRef}
            role="menu"
            style={{
              position: 'absolute',
              top: '100%',
              right: '-4px',
              backgroundColor: 'var(--color-navy-light)',
              minWidth: '240px',
              boxShadow: 'var(--shadow-xl)',
              borderRadius: '0 0 var(--radius-md) var(--radius-md)',
              padding: 'var(--space-2) 0',
              zIndex: 200,
              animation: 'slideDown 0.2s ease',
              border: '1px solid rgba(255,255,255,0.08)',
              borderTop: '2px solid var(--color-accent)',
            }}
          >
            {[
              { vista: 'catalogo', label: '🛍️ Catálogo' },
              { vista: 'carrito', label: `🛒 Mi Pedido${cantidadTotal > 0 ? ` (${cantidadTotal})` : ''}` },
              { vista: 'nosotros', label: '✨ Sobre Nosotros' },
              { vista: 'ubicacion', label: '📍 Ubicación' },
              { vista: 'admin', label: '🔐 Admin' },
            ].map(({ vista, label }) => (
              <div
                key={vista}
                role="menuitem"
                tabIndex={0}
                onClick={() => navegarA(vista)}
                onKeyDown={(e) => { if (e.key === 'Enter') navegarA(vista); }}
                style={{
                  padding: '10px 20px',
                  cursor: 'pointer',
                  color: vistaActual === vista ? 'var(--color-accent)' : 'rgba(255,255,255,0.85)',
                  backgroundColor: vistaActual === vista ? 'rgba(255,255,255,0.08)' : 'transparent',
                  fontSize: '14px',
                  fontWeight: vistaActual === vista ? 600 : 400,
                  transition: 'background-color 0.15s, color 0.15s',
                  borderLeft: vistaActual === vista ? '3px solid var(--color-accent)' : '3px solid transparent',
                }}
              >
                {label}
              </div>
            ))}
            {YOUTUBE_URL && (
              <div
                role="menuitem"
                tabIndex={0}
                onClick={() => { setVideoAbierto(true); setMenuAbierto(false); }}
                onKeyDown={(e) => { if (e.key === 'Enter') { setVideoAbierto(true); setMenuAbierto(false); } }}
                style={{
                  padding: '10px 20px',
                  cursor: 'pointer',
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: '13px',
                  borderTop: '1px solid rgba(255,255,255,0.08)',
                  marginTop: 'var(--space-1)',
                  transition: 'color 0.15s',
                }}
              >
                📺 Tutorial
              </div>
            )}
          </div>
        )}

        {/* Modal del tutorial */}
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
              alignItems: 'center', zIndex: 300, padding: '20px', boxSizing: 'border-box',
              animation: 'fadeIn 0.2s ease',
            }}
          >
            <div style={{
              backgroundColor: 'var(--color-bg-card)', width: '100%', maxWidth: '640px',
              borderRadius: 'var(--radius-lg)', overflow: 'hidden',
              boxShadow: '0 20px 25px -5px rgba(0,0,0,0.3)',
              position: 'relative', display: 'flex', flexDirection: 'column',
              animation: 'scaleIn 0.2s ease',
            }}>
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '16px 20px', borderBottom: '1px solid var(--color-border)',
              }}>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--color-text)' }}>
                  📺 ¿Cómo usar e instalar la App?
                </h3>
                <button
                  ref={closeBtnRef}
                  onClick={cerrarVideo}
                  aria-label="Cerrar tutorial"
                  style={{
                    background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer',
                    color: 'var(--color-text-muted)', fontWeight: 700, padding: '4px 8px',
                    borderRadius: 'var(--radius-sm)',
                    transition: 'background-color 0.2s',
                  }}
                >
                  ✕
                </button>
              </div>

              <div style={{
                position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden',
                backgroundColor: 'var(--color-border-light)',
              }}>
                {YOUTUBE_URL ? (
                  <iframe
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                    src={YOUTUBE_URL}
                    title="Tutorial Brillo Total"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : (
                  <div style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--color-text-muted)', fontSize: '14px',
                  }}>
                    🎬 Tutorial no disponible
                  </div>
                )}
              </div>

              <div style={{
                padding: '14px 20px',
                fontSize: '13px',
                color: 'var(--color-text-muted)',
                lineHeight: '1.5',
                backgroundColor: 'var(--color-border-light)',
              }}>
                💡 <strong>Tip PWA:</strong> Podés instalar esta página como una aplicación en tu celular tocando los tres puntitos del navegador y seleccionando <strong>"Agregar a la pantalla principal"</strong>.
              </div>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
