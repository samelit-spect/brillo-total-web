// src/components/Footer.tsx
import React from 'react';
import { WHATSAPP_NUMBER, UBICACION } from '../utils/constants';

interface FooterProps {
  vistaActual?: string;
  alCambiarVista?: (vista: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ vistaActual, alCambiarVista }) => {
  const [hoverAdmin, setHoverAdmin] = React.useState(false);

  const manejarAccesoAdmin = () => {
    if (!alCambiarVista) return;
    alCambiarVista(vistaActual === 'admin' ? 'catalogo' : 'admin');
  };

  return (
    <footer style={{
      backgroundColor: 'var(--color-footer-bg)',
      color: 'var(--color-text-secondary)',
      padding: '40px 20px 20px 20px',
      marginTop: 'auto',
      borderTop: '4px solid var(--color-primary)',
      fontSize: '14px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '30px',
        marginBottom: '30px'
      }}>

        {/* Sección Comercial / Identidad */}
        <div style={{ flex: '1 1 300px' }}>
          <h3 style={{ color: 'var(--color-navy)', margin: '0 0 10px 0', fontSize: '18px' }}>✨ Brillo Total</h3>
          <p style={{ lineHeight: '1.6', margin: 0 }}>
            Venta mayorista y minorista de productos de limpieza sueltos y envasados de alta calidad para el hogar y el automotor.
          </p>
        </div>

        {/* Sección Sucursal e Info de Contacto */}
        <div style={{ flex: '1 1 250px' }}>
          <h4 style={{ color: 'var(--color-navy)', margin: '0 0 10px 0', fontSize: '16px' }}>📍 Sucursal Principal</h4>
          <p style={{ margin: '0 0 5px 0' }}>{UBICACION.direccion}</p>
          <p style={{ margin: '0 0 5px 0' }}>📦 <strong>Fraccionamiento por Litro</strong></p>
          <p style={{ margin: 0 }}>💬 Pedidos directos vía WhatsApp</p>
        </div>

        {/* Sección Horarios */}
        <div style={{ flex: '1 1 200px' }}>
          <h4 style={{ color: 'var(--color-navy)', margin: '0 0 10px 0', fontSize: '16px' }}>⏰ Horarios de Atención</h4>
          <p style={{ margin: '0 0 5px 0' }}>Lunes a Viernes:</p>
          <p style={{ color: 'var(--color-text)', margin: '0 0 10px 0', fontWeight: '500' }}>{UBICACION.horarios.semana}</p>
          <p style={{ margin: '0 0 5px 0' }}>Sábados:</p>
          <p style={{ color: 'var(--color-text)', margin: 0, fontWeight: '500' }}>{UBICACION.horarios.sabado}</p>
        </div>

      </div>

      {/* Redes Sociales centradas entre info y copyright */}
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '24px', padding: '20px 0', borderTop: '1px solid var(--color-border-light)' }}>
        <a
          href={`https://www.instagram.com/${UBICACION.instagram}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text)', textDecoration: 'none', fontSize: '14px' }}
        >
          <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'linear-gradient(135deg, #f58529, #dd2a7b, #8134af)', display: 'inline-block', flexShrink: 0 }} />
          Instagram
        </a>
        <a
          href={`https://www.facebook.com/${UBICACION.facebook}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text)', textDecoration: 'none', fontSize: '14px' }}
        >
          <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#1877f2', display: 'inline-block', flexShrink: 0 }} />
          Facebook
        </a>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text)', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}
        >
          <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#25d366', display: 'inline-block', flexShrink: 0 }} />
          WhatsApp
        </a>
      </div>

      {/* Separador inferior de Derechos */}
      <div style={{
        borderTop: '1px solid var(--color-border-light)',
        paddingTop: '20px',
        textAlign: 'center',
        fontSize: '12px',
        color: 'var(--color-text-secondary)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '5px'
      }}>
        <p style={{ margin: 0 }}>
          &copy; {new Date().getFullYear()} Brillo Total. Todos los derechos reservados.
        </p>
        <p style={{ margin: 0, fontSize: '11px' }}>
          Desarrollado con React & TypeScript.
        </p>

        {/* Botón de Administración */}
        {alCambiarVista && (
          <button
            onClick={manejarAccesoAdmin}
            style={{
              background: 'none',
              border: 'none',
              color: hoverAdmin ? 'var(--color-text-secondary)' : vistaActual === 'admin' ? 'var(--color-primary)' : 'var(--color-text-secondary)',
              cursor: 'pointer',
              fontSize: '11px',
              fontWeight: '500',
              marginTop: '10px',
              transition: 'color 0.2s',
              outline: 'none'
            }}
            onMouseEnter={() => setHoverAdmin(true)}
            onMouseLeave={() => setHoverAdmin(false)}
          >
            {vistaActual === 'admin' ? '⬅️ Salir de Administración' : '🐾 Información del Sitio'}
          </button>
        )}
      </div>
    </footer>
  );
};