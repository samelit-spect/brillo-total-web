import React from 'react';
import { useNavigate } from 'react-router-dom';
import { WHATSAPP_NUMBER, UBICACION } from '../utils/constants';

export const NosotrosView: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 'var(--space-5)', maxWidth: '800px', margin: '0 auto', color: 'var(--color-text)' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 'var(--space-10)', marginTop: 'var(--space-4)' }}>
        <img
          src="/perro-header-transparente.png"
          alt="Mascota Brillo Total"
          style={{
            height: '90px', objectFit: 'contain',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
            marginBottom: 'var(--space-3)',
          }}
        />
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 36px)', color: 'var(--color-text)', marginBottom: 'var(--space-2)' }}>
          Sobre Nosotros
        </h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '16px' }}>Conocé la historia detrás de Brillo Total.</p>
      </div>

      {/* Historia */}
      <div style={{
        backgroundColor: 'var(--color-bg-card)', borderRadius: 'var(--radius-md)',
        padding: 'var(--space-6)', border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-sm)', lineHeight: '1.8', marginBottom: 'var(--space-5)',
      }}>
        <h3 style={{ color: 'var(--color-primary)', marginTop: 0, display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <span>🐕</span> Nuestra Historia
        </h3>
        <p>
          En <strong>Brillo Total</strong> nacimos con la idea de ofrecer productos de limpieza de primera calidad,
          pero con un enfoque distinto: <strong>más económico, más ecológico y más cerca de la gente</strong>.
          Desde La Rioja Capital, nos dedicamos a la venta mayorista y minorista de productos sueltos y envasados
          para el hogar, comercios y el automotor.
        </p>
      </div>

      {/* Misión y Visión */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 'var(--space-5)',
        marginBottom: 'var(--space-5)',
      }}>
        <div style={{
          backgroundColor: 'var(--color-bg-card)', borderRadius: 'var(--radius-md)',
          padding: 'var(--space-6)', border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-sm)',
        }}>
          <h3 style={{ color: 'var(--color-primary)', marginTop: 0 }}>🎯 Misión</h3>
          <p style={{ lineHeight: '1.7', margin: 0 }}>
            Proveer productos de limpieza de alta calidad a precios justos, promoviendo el consumo responsable
            a través del fraccionamiento por litro y reduciendo el impacto ambiental.
          </p>
        </div>
        <div style={{
          backgroundColor: 'var(--color-bg-card)', borderRadius: 'var(--radius-md)',
          padding: 'var(--space-6)', border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-sm)',
        }}>
          <h3 style={{ color: 'var(--color-primary)', marginTop: 0 }}>👁️ Visión</h3>
          <p style={{ lineHeight: '1.7', margin: 0 }}>
            Ser la referencia en limpieza sustentable de La Rioja, expandiendo nuestro modelo de venta
            fraccionada a más hogares y comercios de la región.
          </p>
        </div>
      </div>

      {/* Fraccionamiento */}
      <div style={{
        backgroundColor: 'var(--color-bg-card)', borderRadius: 'var(--radius-md)',
        padding: 'var(--space-6)', border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-sm)', lineHeight: '1.8', marginBottom: 'var(--space-5)',
      }}>
        <h3 style={{ color: 'var(--color-primary)', marginTop: 0 }}>📦 Fraccionamiento Inteligente</h3>
        <p>
          Creemos firmemente en el consumo responsable. Por eso, nos especializamos en el <strong>fraccionamiento por litro</strong>.
          Te invitamos a traer tus envases vacíos — ayudamos a reducir el desperdicio de plástico y garantizamos
          que solo pagues por el contenido de la mejor calidad.
        </p>
        <div style={{
          marginTop: 'var(--space-4)',
          padding: 'var(--space-3) var(--space-4)',
          backgroundColor: '#f0fdf4',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid #bbf7d0',
          fontSize: '14px',
          color: '#15803d',
        }}>
          🌱 <strong>Tip ecológico:</strong> Si traés tu envase, te descontamos el peso del tara. ¡Ganás vos y el planeta!
        </div>
      </div>

      {/* Horarios y Contacto */}
      <div style={{
        backgroundColor: 'var(--color-bg-card)', borderRadius: 'var(--radius-md)',
        padding: 'var(--space-6)', border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-sm)', marginBottom: 'var(--space-5)',
      }}>
        <h3 style={{ color: 'var(--color-primary)', marginTop: 0, marginBottom: 'var(--space-4)' }}>
          📍 Horarios y Contacto
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', fontSize: '14px', lineHeight: '1.6' }}>
          <p style={{ margin: 0 }}>🏠 <strong>Dirección:</strong> {UBICACION.direccion}</p>
          <p style={{ margin: 0 }}>⏰ <strong>Lunes a Viernes:</strong> {UBICACION.horarios.semana}</p>
          <p style={{ margin: 0 }}>⏰ <strong>Sábados:</strong> {UBICACION.horarios.sabado}</p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-5)', flexWrap: 'wrap' }}>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: '1 1 150px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: 'var(--space-2)', padding: '10px 16px', borderRadius: 'var(--radius-sm)',
              backgroundColor: '#25d366', color: 'white', textDecoration: 'none',
              fontWeight: 600, fontSize: '14px', transition: 'filter 0.2s',
            }}
          >
            💬 WhatsApp
          </a>
          <a
            href={`https://www.instagram.com/${UBICACION.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: '1 1 150px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: 'var(--space-2)', padding: '10px 16px', borderRadius: 'var(--radius-sm)',
              background: 'linear-gradient(135deg, #f58529, #dd2a7b, #8134af)',
              color: 'white', textDecoration: 'none', fontWeight: 600, fontSize: '14px',
              transition: 'filter 0.2s',
            }}
          >
            📸 Instagram
          </a>
          <a
            href={`https://www.facebook.com/${UBICACION.facebook}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: '1 1 150px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: 'var(--space-2)', padding: '10px 16px', borderRadius: 'var(--radius-sm)',
              backgroundColor: '#1877f2', color: 'white', textDecoration: 'none',
              fontWeight: 600, fontSize: '14px', transition: 'filter 0.2s',
            }}
          >
            👍 Facebook
          </a>
        </div>
      </div>

      {/* CTA */}
      <div style={{
        background: 'linear-gradient(135deg, var(--color-navy) 0%, var(--color-primary) 100%)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-8) var(--space-6)',
        color: 'white',
        textAlign: 'center',
      }}>
        <p style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 var(--space-2)' }}>
          🐾 ¿Listo para llenar de brillo tu hogar?
        </p>
        <p style={{ fontSize: '14px', opacity: 0.9, margin: '0 0 var(--space-5)' }}>
          Armá tu pedido en segundos y recibilo vía WhatsApp
        </p>
        <button
          onClick={() => navigate('/catalogo')}
          style={{
            backgroundColor: 'white', color: 'var(--color-navy)', border: 'none',
            padding: '12px 28px', borderRadius: 'var(--radius-full)', fontWeight: 700,
            fontSize: '15px', cursor: 'pointer', boxShadow: 'var(--shadow-md)',
            transition: 'all 0.2s',
          }}
        >
          🛍️ Ver Catálogo
        </button>
      </div>
    </div>
  );
};
