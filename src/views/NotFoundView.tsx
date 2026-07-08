import React from 'react';
import { useNavigate } from 'react-router-dom';

export const NotFoundView: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div style={{ padding: '60px 20px', textAlign: 'center', maxWidth: '600px', margin: '0 auto', color: 'var(--color-text)' }}>
      <div style={{ fontSize: '72px', marginBottom: '15px', display: 'inline-block' }}>🐕‍🦺</div>
      <h2 style={{ fontSize: '28px', color: 'var(--color-navy)', marginBottom: '10px' }}>Página no encontrada</h2>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '25px', fontSize: '15px', lineHeight: '1.5' }}>
        El salchicha buscó por todos lados pero no encontró esta página. 
        ¡Debe haberse escapado mientras no miraba!
      </p>
      <button
        onClick={() => navigate('/catalogo')}
        style={{
          backgroundColor: 'var(--color-primary)', color: 'white', border: 'none',
          padding: '12px 24px', borderRadius: '25px', cursor: 'pointer',
          fontWeight: 'bold', fontSize: '15px',
          boxShadow: '0 4px 6px rgba(49, 130, 206, 0.3)'
        }}
      >
        🐾 Volver al Catálogo
      </button>
    </div>
  );
};
