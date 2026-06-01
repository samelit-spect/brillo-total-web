// src/views/UbicacionView.tsx
import React from 'react';

export const UbicacionView: React.FC = () => {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', color: '#2c3e50' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px', marginTop: '20px' }}>
        <h2 style={{ fontSize: '32px', color: '#1a365d', marginBottom: '10px' }}>📍 Dónde Estamos</h2>
        <p style={{ color: '#7f8c8d', fontSize: '16px' }}>Visitanos en nuestra sucursal en La Rioja Capital.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
        
        {/* Tarjeta de Datos Técnicos */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '25px', border: '1px solid #e0e0e0', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
          <h3 style={{ margin: '0 0 15px 0', color: '#3182ce' }}>Información de la Sucursal</h3>
          <p style={{ margin: '0 0 10px 0' }}>🏠 <strong>Dirección:</strong> La Rioja Capital, Argentina</p>
          <p style={{ margin: '0 0 10px 0' }}>⏰ <strong>Horarios:</strong> Lunes a Viernes (08:00 a 13:00 - 17:00 a 21:00 hs) | Sábados (09:00 a 13:00 hs)</p>
          <p style={{ margin: 0 }}>📦 Recuerda que puedes traer tus bidones y envases para fraccionar tus productos en el acto.</p>
        </div>

        {/* Contenedor del Mapa Interactiva */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '15px', border: '1px solid #e0e0e0', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', overflow: 'hidden' }}>
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

      </div>
    </div>
  );
};