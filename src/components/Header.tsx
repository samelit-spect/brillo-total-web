import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../context/AuthContext';
import { YOUTUBE_URL } from '../utils/constants';
import styles from './Header.module.css';

interface HeaderProps {
  vistaActual: string;
  alCambiarVista: (vista: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ vistaActual, alCambiarVista }) => {
  const { esMayorista, setEsMayorista, obtenerCantidadTotal } = useCart();
  const { user, loading } = useAuth();
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
    <header className={styles.header}>
      <div className={styles.inner}>

        {/* Logo + Nombre */}
        <div
          onClick={() => navegarA('catalogo')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter') navegarA('catalogo'); }}
          className={styles.logo}
        >
          <div className={styles.logoImageWrapper}>
            <img
              src="/perro-header-transparente.png"
              alt="Mascota Oficial Brillo Total"
              className={styles.logoImage}
            />
          </div>
          <span className={styles.logoText}>Brillo Total</span>
        </div>

        {/* Lado derecho */}
        <div className={styles.rightSection}>

          {/* Switch Mayorista / Minorista */}
          <div className={styles.toggleSwitch}>
            <span
              className={esMayorista ? styles.toggleLabelInactive : styles.toggleLabel}
              style={{ color: esMayorista ? 'rgba(255,255,255,0.5)' : '#ffffff' }}
            >
              Min
            </span>
            <label className={styles.toggleTrack}>
              <input
                type="checkbox"
                checked={esMayorista}
                onChange={(e) => setEsMayorista(e.target.checked)}
                role="switch"
                aria-checked={esMayorista}
                aria-label="Alternar precio mayorista o minorista"
                className={styles.toggleInput}
              />
              <span
                className={styles.toggleSlider}
                style={{ backgroundColor: esMayorista ? 'var(--color-accent)' : 'rgba(255,255,255,0.25)' }}
              >
                <span
                  className={styles.toggleKnob}
                  style={{ left: esMayorista ? '16px' : '2px' }}
                />
              </span>
            </label>
            <span
              className={esMayorista ? styles.toggleLabel : styles.toggleLabelInactive}
              style={{ color: esMayorista ? 'var(--color-accent)' : 'rgba(255,255,255,0.5)' }}
            >
              May
            </span>
          </div>

          {/* Auth */}
          {!loading && (
            user ? (
              <div
                onClick={() => navegarA('perfil')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') navegarA('perfil'); }}
                className={styles.userBadge}
                aria-label="Mi Perfil"
              >
                <span className={styles.userAvatar}>🐕</span>
                <span className={styles.userEmail}>{user.email}</span>
              </div>
            ) : (
              <button onClick={() => navegarA('login')} className={styles.authButton}>
                Ingresar
              </button>
            )
          )}

          {/* Carrito */}
          <button
            onClick={() => navegarA(vistaActual === 'carrito' ? 'catalogo' : 'carrito')}
            aria-label={`Carrito de compras, ${cantidadTotal} productos`}
            className={vistaActual === 'carrito' ? styles.cartButtonActive : styles.cartButton}
          >
            <span className={styles.cartIcon}>🛒</span>
            {cantidadTotal > 0 && (
              <span className={styles.cartBadge}>{cantidadTotal}</span>
            )}
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setMenuAbierto(!menuAbierto)}
            aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuAbierto}
            className={styles.hamburger}
          >
            {menuAbierto ? '✕' : '☰'}
          </button>
        </div>

        {/* Menú hamburguesa desplegable */}
        {menuAbierto && (
          <div
            ref={menuRef}
            role="menu"
            className={styles.menu}
          >
            {[
              { vista: 'catalogo', label: '🛍️ Catálogo' },
              { vista: 'carrito', label: `🛒 Mi Pedido${cantidadTotal > 0 ? ` (${cantidadTotal})` : ''}` },
              { vista: 'mis-pedidos', label: '📋 Mis Pedidos' },
              { vista: 'nosotros', label: '✨ Sobre Nosotros' },
              { vista: 'ubicacion', label: '📍 Ubicación' },
              { vista: 'admin', label: '🔐 Admin' },
              ...(user ? [{ vista: 'perfil', label: '👤 Mi Perfil' }] : []),
            ].map(({ vista, label }) => (
              <div
                key={vista}
                role="menuitem"
                tabIndex={0}
                onClick={() => navegarA(vista)}
                onKeyDown={(e) => { if (e.key === 'Enter') navegarA(vista); }}
                className={vistaActual === vista ? styles.menuItemActive : styles.menuItemInactive}
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
                className={styles.menuItemDisabled}
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
            className={styles.overlay}
          >
            <div className={styles.modal}>
              <div className={styles.modalHeader}>
                <h3 className={styles.modalTitle}>
                  📺 ¿Cómo usar e instalar la App?
                </h3>
                <button
                  ref={closeBtnRef}
                  onClick={cerrarVideo}
                  aria-label="Cerrar tutorial"
                  className={styles.closeButton}
                >
                  ✕
                </button>
              </div>

              <div className={styles.videoWrapper}>
                {YOUTUBE_URL ? (
                  <iframe
                    className={styles.videoIframe}
                    src={YOUTUBE_URL}
                    title="Tutorial Brillo Total"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : (
                  <div className={styles.videoPlaceholder}>
                    🎬 Tutorial no disponible
                  </div>
                )}
              </div>

              <div className={styles.modalFooter}>
                💡 <strong>Tip PWA:</strong> Podés instalar esta página como una aplicación en tu celular tocando los tres puntitos del navegador y seleccionando <strong>"Agregar a la pantalla principal"</strong>.
              </div>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
