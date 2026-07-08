import React from 'react';
import { useNavigate } from 'react-router-dom';
import { WHATSAPP_NUMBER, UBICACION } from '../utils/constants';

const DIRECCION_CODIFICADA = encodeURIComponent(UBICACION.direccion);

export const UbicacionView: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 'var(--space-5)', maxWidth: '800px', margin: '0 auto', color: 'var(--color-text)' }}>
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
          📍 Dónde Estamos
        </h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '16px' }}>
          Visitanos en nuestra sucursal en {UBICACION.direccion}.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
        {/* Información */}
        <div style={{
          backgroundColor: 'var(--color-bg-card)', borderRadius: 'var(--radius-md)',
          padding: 'var(--space-6)', border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-sm)',
        }}>
          <h3 style={{ margin: '0 0 var(--space-4)', color: 'var(--color-primary)' }}>
            🏪 Información de la Sucursal
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', fontSize: '14px', lineHeight: '1.6' }}>
            <p style={{ margin: 0 }}>🏠 <strong>Dirección:</strong> {UBICACION.direccion}</p>
            <div style={{ margin: 0 }}>
              <strong>⏰ Horarios:</strong>
              <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-2)', flexWrap: 'wrap' }}>
                <span style={{
                  backgroundColor: 'var(--color-border-light)',
                  padding: '4px 14px', borderRadius: 'var(--radius-full)',
                  fontSize: '13px',
                }}>
                  <strong>Lun a Vie</strong> {UBICACION.horarios.semana}
                </span>
                <span style={{
                  backgroundColor: 'var(--color-border-light)',
                  padding: '4px 14px', borderRadius: 'var(--radius-full)',
                  fontSize: '13px',
                }}>
                  <strong>Sáb</strong> {UBICACION.horarios.sabado}
                </span>
              </div>
            </div>
            <div style={{
              marginTop: 'var(--space-2)',
              padding: 'var(--space-3) var(--space-4)',
              backgroundColor: '#fffbeb',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid #fde68a',
              fontSize: '13px',
              color: '#92400e',
            }}>
              📦 Recordá que podés traer tus bidones y envases para fraccionar tus productos en el acto.
            </div>
          </div>
        </div>

        {/* Botones */}
        <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${DIRECCION_CODIFICADA}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: '1 1 180px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: 'var(--space-2)', padding: '12px 16px', borderRadius: 'var(--radius-sm)',
              backgroundColor: '#ea4335', color: 'white', textDecoration: 'none',
              fontWeight: 600, fontSize: '14px', transition: 'filter 0.2s',
            }}
          >
            🗺️ Cómo llegar
          </a>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: '1 1 180px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: 'var(--space-2)', padding: '12px 16px', borderRadius: 'var(--radius-sm)',
              backgroundColor: '#25d366', color: 'white', textDecoration: 'none',
              fontWeight: 600, fontSize: '14px', transition: 'filter 0.2s',
            }}
          >
            💬 Consultar por WhatsApp
          </a>
          <button
            onClick={() => navigate('/catalogo')}
            style={{
              flex: '1 1 180px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: 'var(--space-2)', padding: '12px 16px', borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--color-primary)', color: 'white', border: 'none',
              fontWeight: 600, fontSize: '14px', cursor: 'pointer', transition: 'all 0.2s',
            }}
          >
            🛍️ Ver Catálogo
          </button>
        </div>

        {/* Mapa */}
        <div style={{
          backgroundColor: 'var(--color-bg-card)', borderRadius: 'var(--radius-md)',
          padding: 'var(--space-3)', border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-sm)', overflow: 'hidden',
        }}>
          <iframe
            title="Mapa Brillo Total"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3475.2443681423145!2d-66.8558455!3d-29.4128945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9427db913daaa8eb%3A0x2db4e0ffc7e96a2f!2sLa%20Rioja!5e0!3m2!1ses-419!2sar!4v1710000000000!5m2!1ses-419!2sar"
            width="100%"
            height="350"
            style={{ border: 0, borderRadius: 'var(--radius-sm)' }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Redes */}
        <div style={{
          display: 'flex', justifyContent: 'center', gap: 'var(--space-6)',
          flexWrap: 'wrap', padding: 'var(--space-3) 0',
        }}>
          <a href={`https://www.instagram.com/${UBICACION.instagram}`} target="_blank" rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--color-text)', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'linear-gradient(135deg, #f58529, #dd2a7b, #8134af)', display: 'inline-block' }} /> Instagram
          </a>
          <a href={`https://www.facebook.com/${UBICACION.facebook}`} target="_blank" rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--color-text)', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#1877f2', display: 'inline-block' }} /> Facebook
          </a>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--color-text)', textDecoration: 'none', fontSize: '14px', fontWeight: 600 }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#25d366', display: 'inline-block' }} /> WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};
