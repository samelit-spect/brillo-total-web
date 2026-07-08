import React from 'react';
import { useNavigate } from 'react-router-dom';

export const NotFoundView: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div style={{
      padding: 'var(--space-12) var(--space-5)',
      textAlign: 'center',
      maxWidth: '600px',
      margin: '0 auto',
      color: 'var(--color-text)',
    }}>
      <div style={{ fontSize: '80px', marginBottom: 'var(--space-4)', display: 'inline-block', animation: 'bounceIn 0.6s ease' }}>
        🐕‍🦺
      </div>
      <h2 style={{ fontSize: '30px', color: 'var(--color-text)', marginBottom: 'var(--space-2)' }}>
        Página no encontrada
      </h2>
      <p style={{
        color: 'var(--color-text-secondary)',
        marginBottom: 'var(--space-6)',
        fontSize: '16px',
        lineHeight: '1.6',
      }}>
        El salchicha buscó por todos lados pero no encontró esta página.
        ¡Debe haberse escapado mientras no miraba!
      </p>
      <button
        onClick={() => navigate('/catalogo')}
        style={{
          backgroundColor: 'var(--color-primary)',
          color: 'white',
          border: 'none',
          padding: '12px 28px',
          borderRadius: 'var(--radius-full)',
          cursor: 'pointer',
          fontWeight: 600,
          fontSize: '15px',
          boxShadow: 'var(--shadow-md)',
          transition: 'all 0.2s',
        }}
      >
        🐾 Volver al Catálogo
      </button>
    </div>
  );
};
