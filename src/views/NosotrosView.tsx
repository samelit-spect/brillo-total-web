// src/views/NosotrosView.tsx
import React from 'react';

export const NosotrosView: React.FC = () => {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', color: 'var(--color-text)' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px', marginTop: '20px' }}>
        <h2 style={{ fontSize: '32px', color: 'var(--color-navy)', marginBottom: '10px' }}>Sobre Nosotros</h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '16px' }}>Conocé la historia detrás de Brillo Total.</p>
      </div>

      <div style={{ backgroundColor: 'var(--color-bg-card)', borderRadius: '12px', padding: '30px', border: '1px solid var(--color-border)', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', lineHeight: '1.8' }}>
        <h3 style={{ color: 'var(--color-primary)', marginTop: 0 }}>✨ Nuestra Esencia</h3>
        <p>
          En <strong>Brillo Total</strong> nos dedicamos a la venta y distribución (mayorista y minorista) de productos de limpieza sueltos y envasados de alta eficiencia. Nacimos con el objetivo de ofrecer una alternativa inteligente, económica y ecológica para el cuidado del hogar, comercios y el automotor.
        </p>

        <h3 style={{ color: 'var(--color-primary)', marginTop: '25px' }}>📦 Fraccionamiento Inteligente</h3>
        <p>
          Creemos firmemente en el consumo responsable. Por eso, nos especializamos en el <strong>fraccionamiento por litro</strong>. Invitamos a nuestros clientes a traer sus envases vacíos, ayudando a reducir el desperdicio de plástico y garantizando que solo pagues por el contenido de la mejor calidad.
        </p>

        <h3 style={{ color: 'var(--color-primary)', marginTop: '25px' }}>📍 Desde La Rioja para la Región</h3>
        <p>
          Operamos con orgullo desde nuestra sucursal principal en La Rioja Capital, ofreciendo atención personalizada y canales de pedido ágiles y modernos (¡como esta aplicación web!) para que armar tu pedido sea cuestión de segundos.
        </p>
      </div>
    </div>
  );
};