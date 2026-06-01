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

  const navegarA = (vista: TipoVista) => {
    alCambiarVista(vista);
    setMenuAbierto(false); // Cierra el menú automáticamente al hacer clic
  };

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
        
        {/* LADO IZQUIERDO: Botón Hamburguesa + Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          {/* Botón de Menú Hamburguesa */}
          <button 
            onClick={() => setMenuAbierto(!menuAbierto)}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '24px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '5px',
              userSelect: 'none'
            }}
          >
            {menuAbierto ? '✕' : '☰'}
          </button>

          {/* Logo Marca */}
          <div 
            onClick={() => navegarA('catalogo')}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
          >
            <span style={{ fontSize: '24px' }}>✨🪣</span>
            <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', letterSpacing: '0.5px' }}>
              Brillo Total
            </h1>
          </div>
        </div>

        {/* LADO DERECHO: Switch Mayorista + Botón Carrito */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          
          {/* Switch Mayorista / Minorista */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#2d3748',
            padding: '6px 12px',
            borderRadius: '20px',
            border: '1px solid #4a5568'
          }}>
            <label style={{ position: 'relative', display: 'inline-block', width: '34px', height: '18px', cursor: 'pointer' }}>
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
                  position: 'absolute', height: '12px', width: '12px',
                  left: esMayorista ? '19px' : '3px', bottom: '3px',
                  backgroundColor: '#ffffff', borderRadius: '50%', transition: '0.3s'
                }} />
              </span>
            </label>
            <span style={{ fontSize: '12px', marginLeft: '8px', color: esMayorista ? '#48bb78' : '#cbd5e0', fontWeight: 'bold' }}>
              {esMayorista ? 'May.' : 'Min.'}
            </span>
          </div>

          {/* Botón Carrito */}
          <button 
            onClick={() => navegarA(vistaActual === 'carrito' ? 'catalogo' : 'carrito')}
            style={{
              backgroundColor: vistaActual === 'carrito' ? '#e67e22' : '#3182ce',
              color: '#ffffff', border: 'none', padding: '8px 14px', borderRadius: '8px',
              fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px'
            }}
          >
            <span>🛒</span>
            <span style={{
              backgroundColor: '#e53e3e', color: '#ffffff', fontSize: '11px',
              padding: '2px 6px', borderRadius: '10px', fontWeight: 'bold'
            }}>
              {obtenerCantidadTotal()}
            </span>
          </button>
        </div>

        {/* 🍔 MENÚ HAMBURGUESA DESPLEGABLE (Sidebar / Drawer Flotante) */}
        {menuAbierto && (
          <div style={{
            position: 'absolute',
            top: '55px',
            left: '-20px',
            backgroundColor: '#1a202c',
            width: '260px',
            boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
            borderRadius: '0 0 8px 0',
            padding: '10px 0',
            zIndex: 200,
            animation: 'fadeIn 0.2s ease-out',
            borderLeft: '4px solid #3182ce'
          }}>
            <div 
              onClick={() => navegarA('catalogo')}
              style={{ padding: '12px 20px', cursor: 'pointer', fontWeight: vistaActual === 'catalogo' ? 'bold' : 'normal', color: vistaActual === 'catalogo' ? '#3182ce' : '#ffffff', backgroundColor: vistaActual === 'catalogo' ? '#2d3748' : 'transparent' }}
            >
              🛍️ Catálogo de Productos
            </div>
            <div 
              onClick={() => navegarA('carrito')}
              style={{ padding: '12px 20px', cursor: 'pointer', fontWeight: vistaActual === 'carrito' ? 'bold' : 'normal', color: vistaActual === 'carrito' ? '#3182ce' : '#ffffff', backgroundColor: vistaActual === 'carrito' ? '#2d3748' : 'transparent' }}
            >
              🛒 Mi Pedido ({obtenerCantidadTotal()})
            </div>
            <div 
              onClick={() => navegarA('nosotros')}
              style={{ padding: '12px 20px', cursor: 'pointer', fontWeight: vistaActual === 'nosotros' ? 'bold' : 'normal', color: vistaActual === 'nosotros' ? '#3182ce' : '#ffffff', backgroundColor: vistaActual === 'nosotros' ? '#2d3748' : 'transparent' }}
            >
              ✨ Sobre Nosotros
            </div>
            <div 
              onClick={() => navegarA('ubicacion')}
              style={{ padding: '12px 20px', cursor: 'pointer', fontWeight: vistaActual === 'ubicacion' ? 'bold' : 'normal', color: vistaActual === 'ubicacion' ? '#3182ce' : '#ffffff', backgroundColor: vistaActual === 'ubicacion' ? '#2d3748' : 'transparent' }}
            >
              📍 Ubicación y Horarios
            </div>
          </div>
        )}

      </div>
    </header>
  );
};