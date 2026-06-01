// src/components/Footer.tsx
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer style={{
      backgroundColor: '#1a202c', // Gris oscuro/negro estético
      color: '#a0aec0',
      padding: '40px 20px 20px 20px',
      marginTop: 'auto', // Asegura que el footer siempre quede abajo de todo
      borderTop: '4px solid #3182ce', // Línea azul divisoria
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
          <h3 style={{ color: '#ffffff', margin: '0 0 10px 0', fontSize: '18px' }}>✨ Brillo Total</h3>
          <p style={{ lineHeight: '1.6', margin: 0 }}>
            Venta mayorista y minorista de productos de limpieza sueltos y envasados de alta calidad para el hogar y el automotor.
          </p>
        </div>

        {/* Sección Sucursal e Info de Contacto */}
        <div style={{ flex: '1 1 250px' }}>
          <h4 style={{ color: '#ffffff', margin: '0 0 10px 0', fontSize: '16px' }}>📍 Sucursal Principal</h4>
          <p style={{ margin: '0 0 5px 0' }}>La Rioja Capital, Argentina</p>
          <p style={{ margin: '0 0 5px 0' }}>📦 <strong>Fraccionamiento por Litro</strong></p>
          <p style={{ margin: 0 }}>💬 Pedidos directos vía WhatsApp</p>
        </div>

        {/* Sección Horarios */}
        <div style={{ flex: '1 1 200px' }}>
          <h4 style={{ color: '#ffffff', margin: '0 0 10px 0', fontSize: '16px' }}>⏰ Horarios de Atención</h4>
          <p style={{ margin: '0 0 5px 0' }}>Lunes a Viernes:</p>
          <p style={{ color: '#e2e8f0', margin: '0 0 10px 0', fontWeight: '500' }}>08:00 a 13:00 - 17:00 a 21:00 hs</p>
          <p style={{ margin: '0 0 5px 0' }}>Sábados:</p>
          <p style={{ color: '#e2e8f0', margin: 0, fontWeight: '500' }}>09:00 a 13:00 hs</p>
        </div>

      </div>

      {/* Separador inferior de Derechos */}
      <div style={{
        borderTop: '1px solid #2d3748',
        paddingTop: '20px',
        textAlign: 'center',
        fontSize: '12px',
        color: '#718096'
      }}>
        <p style={{ margin: 0 }}>
          &copy; {new Date().getFullYear()} Brillo Total. Todos los derechos reservados.
        </p>
        <p style={{ margin: '5px 0 0 0', fontSize: '11px' }}>
          Desarrollado con React & TypeScript.
        </p>
      </div>
    </footer>
  );
};