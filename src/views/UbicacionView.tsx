// src/views/UbicacionView.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { WHATSAPP_NUMBER, UBICACION } from '../utils/constants';

const DIRECCION_CODIFICADA = encodeURIComponent(UBICACION.direccion);

export const UbicacionView: React.FC = () => {
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
        <h2 style={{ fontSize: '32px', color: 'var(--color-navy)', marginBottom: '10px' }}>📍 Dónde Estamos</h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '16px' }}>Visitanos en nuestra sucursal en {UBICACION.direccion}.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

        {/* Tarjeta de Datos */}
        <div style={{ backgroundColor: 'var(--color-bg-card)', borderRadius: '12px', padding: '25px', border: '1px solid var(--color-border)', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
          <h3 style={{ margin: '0 0 18px 0', color: 'var(--color-primary)' }}>🏪 Información de la Sucursal</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', lineHeight: '1.6' }}>
            <p style={{ margin: 0 }}>🏠 <strong>Dirección:</strong> {UBICACION.direccion}</p>
            <div style={{ margin: 0 }}>
              <strong>⏰ Horarios:</strong>
              <div style={{ display: 'flex', gap: '20px', marginTop: '6px', flexWrap: 'wrap' }}>
                <span style={{ backgroundColor: 'var(--color-border-light)', padding: '4px 12px', borderRadius: '6px', fontSize: '13px' }}>
                  <strong>Lun a Vie</strong> {UBICACION.horarios.semana}
                </span>
                <span style={{ backgroundColor: 'var(--color-border-light)', padding: '4px 12px', borderRadius: '6px', fontSize: '13px' }}>
                  <strong>Sáb</strong> {UBICACION.horarios.sabado}
                </span>
              </div>
            </div>
            <p style={{ margin: '8px 0 0', padding: '10px 14px', backgroundColor: '#fffbeb', borderRadius: '8px', border: '1px solid #fde68a', fontSize: '13px', color: '#92400e' }}>
              📦 Recordá que podés traer tus bidones y envases para fraccionar tus productos en el acto.
            </p>
          </div>
        </div>

        {/* Botones de acción */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${DIRECCION_CODIFICADA}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ flex: '1 1 200px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px 16px', borderRadius: '8px', backgroundColor: '#ea4335', color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}
          >
            🗺️ Cómo llegar
          </a>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ flex: '1 1 200px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px 16px', borderRadius: '8px', backgroundColor: '#25d366', color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}
          >
            💬 Consultar por WhatsApp
          </a>
          <button
            onClick={() => navigate('/catalogo')}
            style={{ flex: '1 1 200px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px 16px', borderRadius: '8px', backgroundColor: 'var(--color-primary)', color: 'white', border: 'none', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }}
          >
            🛍️ Ver Catálogo
          </button>
        </div>

        {/* Mapa */}
        <div style={{ backgroundColor: 'var(--color-bg-card)', borderRadius: '12px', padding: '15px', border: '1px solid var(--color-border)', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', overflow: 'hidden' }}>
          <iframe
            title="Mapa Brillo Total"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3475.2443681423145!2d-66.8558455!3d-29.4128945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9427db913daaa8eb%3A0x2db4e0ffc7e96a2f!2sLa%20Rioja!5e0!3m2!1ses-419!2sar!4v1710000000000!5m2!1ses-419!2sar"
            width="100%"
            height="400"
            style={{ border: 0, borderRadius: '8px' }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Redes Sociales */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', padding: '10px 0' }}>
          <a href={`https://www.instagram.com/${UBICACION.instagram}`} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-text)', textDecoration: 'none', fontSize: '14px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'linear-gradient(135deg, #f58529, #dd2a7b, #8134af)', display: 'inline-block' }} /> Instagram
          </a>
          <a href={`https://www.facebook.com/${UBICACION.facebook}`} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-text)', textDecoration: 'none', fontSize: '14px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#1877f2', display: 'inline-block' }} /> Facebook
          </a>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-text)', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#25d366', display: 'inline-block' }} /> WhatsApp
          </a>
        </div>

      </div>
    </div>
  );
};