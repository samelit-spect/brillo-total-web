// src/components/Header.tsx
import React from 'react';
import { useCart } from '../context/CartContext';

interface HeaderProps {
  vistaActual: 'catalogo' | 'carrito';
  alCambiarVista: (vista: 'catalogo' | 'carrito') => void;
}

export const Header: React.FC<HeaderProps> = ({ vistaActual, alCambiarVista }) => {
  const { esMayorista, setEsMayorista, obtenerCantidadTotal } = useCart();

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
        flexWrap: 'wrap',
        gap: '15px'
      }}>
        {/* Logo / Nombre - Al hacer clic vuelve al Catálogo */}
        <div 
          onClick={() => alCambiarVista('catalogo')}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
        >
          <span style={{ fontSize: '24px' }}>✨🪣</span>
          <h1 style={{ margin: 0, fontSize: '22px', fontWeight: 'bold', letterSpacing: '0.5px' }}>
            Brillo Total
          </h1>
        </div>

        {/* Controles: Switch + Carrito */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '25px', flexWrap: 'wrap' }}>
          
          {/* Switch Mayorista / Minorista */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#2d3748',
            padding: '6px 12px',
            borderRadius: '20px',
            border: '1px solid #4a5568'
          }}>
            <span style={{ fontSize: '13px', marginRight: '10px', color: !esMayorista ? '#3182ce' : '#a0aec0', fontWeight: 'bold' }}>
              Minorista
            </span>
            <label style={{
              position: 'relative',
              display: 'inline-block',
              width: '40px',
              height: '20px',
              cursor: 'pointer'
            }}>
              <input 
                type="checkbox" 
                checked={esMayorista}
                onChange={(e) => setEsMayorista(e.target.checked)}
                style={{ opacity: 0, width: 0, height: 0 }} 
              />
              <span style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                backgroundColor: esMayorista ? '#38a169' : '#cbd5e0',
                borderRadius: '20px',
                transition: '0.3s',
              }}>
                <span style={{
                  position: 'absolute',
                  height: '14px',
                  width: '14px',
                  left: esMayorista ? '22px' : '3px',
                  bottom: '3px',
                  backgroundColor: '#ffffff',
                  borderRadius: '50%',
                  transition: '0.3s',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }} />
              </span>
            </label>
            <span style={{ fontSize: '13px', marginLeft: '10px', color: esMayorista ? '#48bb78' : '#a0aec0', fontWeight: 'bold' }}>
              Mayorista
            </span>
          </div>

          {/* Botón Mi Pedido - Cambia dinámicamente según la vista */}
          <button 
            onClick={() => alCambiarVista(vistaActual === 'catalogo' ? 'carrito' : 'catalogo')}
            style={{
              backgroundColor: vistaActual === 'carrito' ? '#e67e22' : '#3182ce',
              color: '#ffffff',
              border: 'none',
              padding: '10px 18px',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
              transition: 'background-color 0.2s'
            }}
          >
            <span>{vistaActual === 'carrito' ? '📋' : '🛒'}</span>
            <span style={{ fontSize: '14px' }}>
              {vistaActual === 'carrito' ? 'Ver Catálogo' : 'Mi Pedido'}
            </span>
            <span style={{
              backgroundColor: '#e53e3e',
              color: '#ffffff',
              fontSize: '12px',
              padding: '2px 8px',
              borderRadius: '10px',
              fontWeight: 'bold'
            }}>
              {obtenerCantidadTotal()}
            </span>
          </button>

        </div>
      </div>
    </header>
  );
};