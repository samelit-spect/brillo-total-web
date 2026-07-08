import React from 'react';
import { useNavigate } from 'react-router-dom';
import { WHATSAPP_NUMBER, UBICACION } from '../utils/constants';

export const Footer: React.FC = () => {
  const navigate = useNavigate();

  return (
    <footer style={{
      backgroundColor: 'var(--color-footer-bg)',
      color: 'var(--color-text-secondary)',
      padding: 'var(--space-10) var(--space-5) var(--space-5)',
      marginTop: 'auto',
      borderTop: '1px solid var(--color-border)',
      fontSize: '14px',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 'var(--space-6)',
        marginBottom: 'var(--space-8)',
      }}>
        {/* Sección Comercial */}
        <div>
          <h3 style={{
            color: 'var(--color-text)',
            margin: '0 0 var(--space-3)',
            fontSize: '18px',
            fontWeight: 700,
          }}>✨ Brillo Total</h3>
          <p style={{ lineHeight: '1.7', margin: 0, fontSize: '14px' }}>
            Venta mayorista y minorista de productos de limpieza sueltos y envasados de alta calidad para el hogar y el automotor.
          </p>
        </div>

        {/* Contacto */}
        <div>
          <h4 style={{
            color: 'var(--color-text)',
            margin: '0 0 var(--space-3)',
            fontSize: '15px',
            fontWeight: 600,
          }}>📍 Contacto</h4>
          <p style={{ margin: '0 0 var(--space-1)', fontSize: '14px' }}>{UBICACION.direccion}</p>
          <p style={{ margin: '0 0 var(--space-1)', fontSize: '14px' }}>📦 Fraccionamiento por Litro</p>
          <p style={{ margin: 0, fontSize: '14px' }}>💬 Pedidos por WhatsApp</p>
        </div>

        {/* Horarios */}
        <div>
          <h4 style={{
            color: 'var(--color-text)',
            margin: '0 0 var(--space-3)',
            fontSize: '15px',
            fontWeight: 600,
          }}>⏰ Horarios</h4>
          <p style={{ margin: '0 0 var(--space-1)', fontSize: '14px' }}>Lun a Vie:</p>
          <p style={{ color: 'var(--color-text)', margin: '0 0 var(--space-2)', fontWeight: 500, fontSize: '14px' }}>
            {UBICACION.horarios.semana}
          </p>
          <p style={{ margin: '0 0 var(--space-1)', fontSize: '14px' }}>Sábados:</p>
          <p style={{ color: 'var(--color-text)', margin: 0, fontWeight: 500, fontSize: '14px' }}>
            {UBICACION.horarios.sabado}
          </p>
        </div>
      </div>

      {/* Redes Sociales */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: 'var(--space-6)',
        padding: 'var(--space-5) 0',
        borderTop: '1px solid var(--color-border-light)',
        borderBottom: '1px solid var(--color-border-light)',
      }}>
        <a
          href={`https://www.instagram.com/${UBICACION.instagram}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', gap: 'var(--space-2)',
            color: 'var(--color-text)', textDecoration: 'none', fontSize: '14px',
            fontWeight: 500, transition: 'color 0.2s',
          }}
        >
          <span style={{
            width: '12px', height: '12px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #f58529, #dd2a7b, #8134af)',
            display: 'inline-block', flexShrink: 0,
          }} />
          Instagram
        </a>
        <a
          href={`https://www.facebook.com/${UBICACION.facebook}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', gap: 'var(--space-2)',
            color: 'var(--color-text)', textDecoration: 'none', fontSize: '14px',
            fontWeight: 500, transition: 'color 0.2s',
          }}
        >
          <span style={{
            width: '12px', height: '12px', borderRadius: '50%',
            backgroundColor: '#1877f2', display: 'inline-block', flexShrink: 0,
          }} />
          Facebook
        </a>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', gap: 'var(--space-2)',
            color: 'var(--color-text)', textDecoration: 'none', fontSize: '14px',
            fontWeight: 600, transition: 'color 0.2s',
          }}
        >
          <span style={{
            width: '12px', height: '12px', borderRadius: '50%',
            backgroundColor: '#25d366', display: 'inline-block', flexShrink: 0,
          }} />
          WhatsApp
        </a>
      </div>

      {/* Copyright */}
      <div style={{
        paddingTop: 'var(--space-4)',
        textAlign: 'center',
        fontSize: '12px',
        color: 'var(--color-text-muted)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'var(--space-1)',
      }}>
        <p style={{ margin: 0 }}>
          &copy; {new Date().getFullYear()} Brillo Total. Todos los derechos reservados.
        </p>
        <p style={{ margin: 0, fontSize: '11px' }}>
          Hecho con 🐾 en La Rioja, Argentina
        </p>
        <span
          onClick={() => navigate('/terminos')}
          style={{
            color: 'var(--color-text-muted)', fontSize: '12px',
            textDecoration: 'underline', marginTop: 'var(--space-1)',
            cursor: 'pointer', transition: 'color 0.2s',
          }}
          role="link"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter') navigate('/terminos'); }}
        >
          Términos y Condiciones
        </span>
      </div>
    </footer>
  );
};
