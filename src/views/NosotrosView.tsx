// src/views/NosotrosView.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { WHATSAPP_NUMBER, UBICACION } from '../utils/constants';

export const NosotrosView: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', color: 'var(--color-text)' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px', marginTop: '20px' }}>
        <div style={{ fontSize: '64px', marginBottom: '10px', lineHeight: 1 }}>
          <img
            src="/perro-header-transparente.png"
            alt="Mascota Brillo Total"
            style={{ height: '90px', objectFit: 'contain', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}
          />
        </div>
        <h2 style={{ fontSize: '32px', color: 'var(--color-navy)', marginBottom: '10px' }}>Sobre Nosotros</h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '16px' }}>Conocé la historia detrás de Brillo Total.</p>
      </div>

      {/* Historia */}
      <div style={{ backgroundColor: 'var(--color-bg-card)', borderRadius: '12px', padding: '30px', border: '1px solid var(--color-border)', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', lineHeight: '1.8', marginBottom: '20px' }}>
        <h3 style={{ color: 'var(--color-primary)', marginTop: 0 }}>🐕 Nuestra Historia</h3>
        <p>
          En <strong>Brillo Total</strong> nacimos con la idea de ofrecer productos de limpieza de primera calidad,
          pero con un enfoque distinto: <strong>más económico, más ecológico y más cerca de la gente</strong>.
          Desde La Rioja Capital, nos dedicamos a la venta mayorista y minorista de productos sueltos y envasados
          para el hogar, comercios y el automotor.
        </p>
      </div>

      {/* Misión y Visión */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '20px' }}>
        <div style={{ backgroundColor: 'var(--color-bg-card)', borderRadius: '12px', padding: '25px', border: '1px solid var(--color-border)', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
          <h3 style={{ color: 'var(--color-primary)', marginTop: 0 }}>🎯 Misión</h3>
          <p style={{ lineHeight: '1.7', margin: 0 }}>
            Proveer productos de limpieza de alta calidad a precios justos, promoviendo el consumo responsable
            a través del fraccionamiento por litro y reduciendo el impacto ambiental.
          </p>
        </div>
        <div style={{ backgroundColor: 'var(--color-bg-card)', borderRadius: '12px', padding: '25px', border: '1px solid var(--color-border)', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
          <h3 style={{ color: 'var(--color-primary)', marginTop: 0 }}>👁️ Visión</h3>
          <p style={{ lineHeight: '1.7', margin: 0 }}>
            Ser la referencia en limpieza sustentable de La Rioja, expandiendo nuestro modelo de venta
            fraccionada a más hogares y comercios de la región.
          </p>
        </div>
      </div>

      {/* Fraccionamiento */}
      <div style={{ backgroundColor: 'var(--color-bg-card)', borderRadius: '12px', padding: '30px', border: '1px solid var(--color-border)', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', lineHeight: '1.8', marginBottom: '20px' }}>
        <h3 style={{ color: 'var(--color-primary)', marginTop: 0 }}>📦 Fraccionamiento Inteligente</h3>
        <p>
          Creemos firmemente en el consumo responsable. Por eso, nos especializamos en el <strong>fraccionamiento por litro</strong>.
          Te invitamos a traer tus envases vacíos — ayudamos a reducir el desperdicio de plástico y garantizamos
          que solo pagues por el contenido de la mejor calidad.
        </p>
        <div style={{ marginTop: '15px', padding: '12px 16px', backgroundColor: '#f0fff4', borderRadius: '8px', border: '1px solid #c6f6d5', fontSize: '14px', color: '#2f855a' }}>
          🌱 <strong>Tip ecológico:</strong> Si traés tu envase, te descontamos el peso del tara. ¡Ganás vos y el planeta!
        </div>
      </div>

      {/* Horarios y Contacto */}
      <div style={{ backgroundColor: 'var(--color-bg-card)', borderRadius: '12px', padding: '25px', border: '1px solid var(--color-border)', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', marginBottom: '20px' }}>
        <h3 style={{ color: 'var(--color-primary)', marginTop: 0 }}>📍 Horarios y Contacto</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', lineHeight: '1.6' }}>
          <p style={{ margin: 0 }}>🏠 <strong>Dirección:</strong> {UBICACION.direccion}</p>
          <p style={{ margin: 0 }}>⏰ <strong>Lunes a Viernes:</strong> {UBICACION.horarios.semana}</p>
          <p style={{ margin: 0 }}>⏰ <strong>Sábados:</strong> {UBICACION.horarios.sabado}</p>
        </div>
        <div style={{ display: 'flex', gap: '12px', marginTop: '18px', flexWrap: 'wrap' }}>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ flex: '1 1 160px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '10px 16px', borderRadius: '8px', backgroundColor: '#25d366', color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}
          >
            💬 WhatsApp
          </a>
          <a
            href={`https://www.instagram.com/${UBICACION.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ flex: '1 1 160px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '10px 16px', borderRadius: '8px', background: 'linear-gradient(135deg, #f58529, #dd2a7b, #8134af)', color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}
          >
            📸 Instagram
          </a>
          <a
            href={`https://www.facebook.com/${UBICACION.facebook}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ flex: '1 1 160px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '10px 16px', borderRadius: '8px', backgroundColor: '#1877f2', color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}
          >
            👍 Facebook
          </a>
        </div>
      </div>

      {/* CTA */}
      <div style={{ textAlign: 'center', padding: '30px 20px', background: 'linear-gradient(135deg, var(--color-navy) 0%, var(--color-primary) 100%)', borderRadius: '12px', color: 'white' }}>
        <p style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 8px' }}>🐾 ¿Listo para llenar de brillo tu hogar?</p>
        <p style={{ fontSize: '14px', opacity: 0.9, margin: '0 0 20px' }}>Armá tu pedido en segundos y recibilo vía WhatsApp</p>
        <button
          onClick={() => navigate('/catalogo')}
          style={{
            backgroundColor: 'white', color: 'var(--color-navy)', border: 'none',
            padding: '12px 28px', borderRadius: '25px', fontWeight: 'bold',
            fontSize: '15px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
          }}
        >
          🛍️ Ver Catálogo
        </button>
      </div>
    </div>
  );
};