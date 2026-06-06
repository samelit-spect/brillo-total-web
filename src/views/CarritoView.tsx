// src/views/CarritoView.tsx
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

interface CarritoViewProps {
  alCambiarVista: (vista: 'catalogo') => void;
}

export const CarritoView: React.FC<CarritoViewProps> = ({ alCambiarVista }) => {
  const { cart, esMayorista, removerDelCarrito, agregarAlCarrito, vaciarCarrito, obtenerTotal } = useCart();
  const [nombre, setNombre] = useState('');
  const [nota, setNota] = useState('');

  const enviarWhatsApp = () => {
    if (!nombre.trim()) {
      alert('Por favor, ingresá tu nombre para procesar el pedido.');
      return;
    }

    // Calculamos el total de litros/unidades que lleva acumulados en el carrito
    const totalLitros = cart.reduce((acumulado, item) => acumulado + item.cantidad, 0);

    // CONTROL MAYORISTA: Si está en modo mayorista pero no llega a los 20 litros
    if (esMayorista && totalLitros < 20) {
      alert(`⚠️ Para acceder a la tarifa Mayorista tenés que sumar al menos 20 litros/unidades al carrito. ¡Actualmente llevás ${totalLitros}! Podés sumar más productos o cambiar la tarifa a Minorista.`);
      return;
    }

    // Estructuramos el mensaje de texto de forma pro
    let mensaje = `*Nuevo Pedido - Brillo Total* ✨🪣\n`;
    mensaje += `*Cliente:* ${nombre}\n`;
    mensaje += `*Tipo de Tarifa:* ${esMayorista ? 'Mayorista' : 'Minorista'}\n`;
    mensaje += `*Total de Litros/Unidades:* ${totalLitros}\n`; // Sumamos este dato útil para el negocio
    if (nota.trim()) mensaje += `*Notas:* ${nota}\n`;
    mensaje += `-----------------------------------\n`;

    cart.forEach((item) => {
      const precio = esMayorista ? item.producto.precioMayorista : item.producto.precioMinorista;
      mensaje += `• ${item.producto.nombre} (${item.producto.presentacion}) x${item.cantidad} - $${precio * item.cantidad}\n`;
    });

    mensaje += `-----------------------------------\n`;
    mensaje += `*Total Estimado: $${obtenerTotal()}*\n\n`;
    mensaje += `_Pedido generado desde la aplicación web._`;

    const mensajeCodificado = encodeURIComponent(mensaje);
    const numeroTelefono = '5493837402375';

    window.open(`https://wa.me/${numeroTelefono}?text=${mensajeCodificado}`, '_blank');
  };

  if (cart.length === 0) {
    return (
      <div style={{ padding: '40px 20px', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
        <span style={{ fontSize: '50px' }}>🛒</span>
        <h3 style={{ fontSize: '22px', color: '#2c3e50', marginTop: '10px' }}>Tu pedido está vacío</h3>
        <p style={{ color: '#7f8c8d', marginBottom: '20px' }}>Explorá nuestro catálogo y sumá los productos que necesites fraccionar.</p>
        <button
          onClick={() => alCambiarVista('catalogo')}
          style={{ backgroundColor: '#3182ce', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Volver al Catálogo
        </button>
      </div>
    );
  }
  const totalLitrosActuales = cart.reduce((acumulado, item) => acumulado + item.cantidad, 0);
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '26px', color: '#2c3e50', marginBottom: '20px' }}>Resumen de tu Pedido</h2>

      {/* Lista de productos en el carrito */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e0e0e0', padding: '20px', marginBottom: '25px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
        {cart.map((item) => {
          const precio = esMayorista ? item.producto.precioMayorista : item.producto.precioMinorista;
          return (
            <div key={item.producto.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0', borderBottom: '1px solid #f0f0f0' }}>
              <div>
                <h4 style={{ margin: '0 0 5px 0', color: '#2c3e50' }}>{item.producto.nombre}</h4>
                <span style={{ fontSize: '13px', color: '#7f8c8d' }}>Presentación: {item.producto.presentacion} | u: ${precio}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#f1f5f9',
                  borderRadius: '6px',
                  padding: '4px'
                }}>
                  {/* Botón Restar (-) */}
                  <button
                    onClick={() => removerDelCarrito(item.producto.id)}
                    style={{
                      border: 'none',
                      background: 'none',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      padding: '4px 10px',
                      color: '#2c3e50',
                      fontSize: '16px',
                      userSelect: 'none'
                    }}
                  >
                    -
                  </button>

                  {/* Contador de Cantidad */}
                  <span style={{
                    fontWeight: 'bold',
                    minWidth: '20px',
                    textAlign: 'center',
                    color: '#2c3e50'
                  }}>
                    {item.cantidad}
                  </span>

                  {/* Botón Sumar (+) */}
                  <button
                    onClick={() => agregarAlCarrito(item.producto)}
                    style={{
                      border: 'none',
                      background: 'none',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      padding: '4px 10px',
                      color: '#2c3e50',
                      fontSize: '16px',
                      userSelect: 'none'
                    }}
                  >
                    +
                  </button>
                </div>
                <span style={{ fontWeight: 'bold', color: '#2c3e50', minWidth: '70px', textAlign: 'right' }}>${precio * item.cantidad}</span>
              </div>
            </div>
          );
        })}

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginTop: '20px', paddingTop: '15px', borderTop: '2px solid #e2e8f0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <button onClick={vaciarCarrito} style={{ color: '#e53e3e', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '500' }}>Vaciar Carrito</button>
            <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a365d' }}>Total: ${obtenerTotal()}</span>
          </div>

          {/* Cartel dinámico de Litros mínimos */}
          <div style={{ marginTop: '8px', fontSize: '14px', color: totalLitrosActuales >= 20 ? '#2f855a' : '#c53030', fontWeight: '600' }}>
            {totalLitrosActuales >= 20
              ? `✅ ¡Excelente! Superaste el mínimo mayorista (Llevás ${totalLitrosActuales}L)`
              : `ℹ️ Llevás ${totalLitrosActuales} litros. Necesitás 20 para validar tarifa Mayorista (Faltan ${20 - totalLitrosActuales}L)`
            }
          </div>
        </div>
      </div>

      {/* Formulario de envío */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e0e0e0', padding: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#2c3e50', fontSize: '18px' }}>Datos de Confirmación</h3>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#4a5568' }}>Tu Nombre / Negocio *</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: María José o Minimarket San Cayetano"
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e0', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#4a5568' }}>Notas adicionales (Opcional)</label>
          <textarea
            value={nota}
            onChange={(e) => setNota(e.target.value)}
            placeholder="Ej: Llevo los envases vacíos para fraccionar..."
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e0', minHeight: '80px', boxSizing: 'border-box', fontFamily: 'inherit' }}
          />
        </div>

        <button
          onClick={enviarWhatsApp}
          style={{ width: '100%', backgroundColor: '#25D366', color: 'white', border: 'none', padding: '14px', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', boxShadow: '0 4px 10px rgba(37,211,102,0.3)' }}
        >
          <span>💬</span> Enviar Pedido por WhatsApp
        </button>
      </div>
    </div>
  );
};