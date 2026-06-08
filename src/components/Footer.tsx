// src/components/Footer.tsx
import React from 'react';

// Definimos el tipo acá directamente para evitar problemas de importación cruzada
interface FooterProps {
  vistaActual?: string;
  alCambiarVista?: (vista: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ vistaActual, alCambiarVista }) => {

  const manejarAccesoAdmin = () => {
    if (!alCambiarVista) return;

    if (vistaActual === 'admin') {
      alCambiarVista('catalogo');
      return;
    }

    const CLAVE_CORRECTA = 'BrilloAdmin2026';
    const passwordIngresado = prompt('🔐 Ingrese la clave maestra de administrador:');

    if (passwordIngresado === CLAVE_CORRECTA) {
      alCambiarVista('admin');
    } else if (passwordIngresado !== null) {
      alert('❌ Clave incorrecta. Acceso denegado.');
    }
  };

  return (
    <footer style={{
      backgroundColor: '#1a202c',
      color: '#a0aec0',
      padding: '40px 20px 20px 20px',
      marginTop: 'auto',
      borderTop: '4px solid #3182ce',
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
        color: '#718096',
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
              color: vistaActual === 'admin' ? '#3182ce' : '#4a5568',
              cursor: 'pointer',
              fontSize: '11px',
              fontWeight: '500',
              marginTop: '10px',
              transition: 'color 0.2s',
              outline: 'none'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#a0aec0')}
            onMouseLeave={(e) => (e.currentTarget.style.color = vistaActual === 'admin' ? '#3182ce' : '#4a5568')}
          >
            {vistaActual === 'admin' ? '⬅️ Salir de Administración' : '⚙️ Configuración del Sistema'}
          </button>
        )}
      </div>
    </footer>
  );
};