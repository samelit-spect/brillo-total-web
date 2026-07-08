// src/views/CarritoView.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { guardarPedido } from '../services/pedidos';
import { WHATSAPP_NUMBER, formatearPrecio } from '../utils/constants';

const UMBRAL_MAYORISTA = 20;

export const CarritoView: React.FC = () => {
  const navigate = useNavigate();
  const { cart, esMayorista, removerDelCarrito, agregarAlCarrito, vaciarCarrito, obtenerTotal } = useCart();
  const [nombre, setNombre] = useState('');
  const [nota, setNota] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [pedidoEnviado, setPedidoEnviado] = useState(false);

  const totalLitros = cart.reduce((acumulado, item) => acumulado + item.cantidad, 0);
  const cantidadProductos = cart.reduce((sum, item) => sum + item.cantidad, 0);
  const porcentajeMayorista = Math.min(100, (totalLitros / UMBRAL_MAYORISTA) * 100);

  const enviarWhatsApp = async () => {
    if (!nombre.trim()) {
      alert('Por favor, ingresá tu nombre para procesar el pedido.');
      return;
    }

    if (esMayorista && totalLitros < UMBRAL_MAYORISTA) {
      alert(`⚠️ Para acceder a la tarifa Mayorista tenés que sumar al menos ${UMBRAL_MAYORISTA} litros/unidades al carrito. ¡Actualmente llevás ${totalLitros}! Podés sumar más productos o cambiar la tarifa a Minorista.`);
      return;
    }

    setEnviando(true);

    try {
      await guardarPedido({
        nombre,
        nota,
        esMayorista,
        items: cart.map((item) => {
          const precio = esMayorista ? item.producto.precioMayorista : item.producto.precioMinorista;
          return {
            nombre: item.producto.nombre,
            presentacion: item.producto.presentacion,
            cantidad: item.cantidad,
            precioUnitario: precio,
            subtotal: precio * item.cantidad,
          };
        }),
        total: obtenerTotal(),
      });
    } catch (e) {
      console.error('Error al guardar pedido en Firestore:', e);
      setEnviando(false);
      alert("Hubo un error al guardar el pedido. Intentalo de nuevo.");
      return;
    }

    let mensaje = `*Nuevo Pedido - Brillo Total* ✨🪣\n`;
    mensaje += `*Cliente:* ${nombre}\n`;
    mensaje += `*Tipo de Tarifa:* ${esMayorista ? 'Mayorista' : 'Minorista'}\n`;
    mensaje += `*Total de Litros/Unidades:* ${totalLitros}\n`;
    if (nota.trim()) mensaje += `*Notas:* ${nota}\n`;
    mensaje += `-----------------------------------\n`;

    cart.forEach((item) => {
      const precio = esMayorista ? item.producto.precioMayorista : item.producto.precioMinorista;
      mensaje += `• ${item.producto.nombre} (${item.producto.presentacion}) x${item.cantidad} - $${formatearPrecio(precio * item.cantidad)}\n`;
    });

    mensaje += `-----------------------------------\n`;
    mensaje += `*Total Estimado: $${formatearPrecio(obtenerTotal())}*\n\n`;
    mensaje += `_Pedido generado desde la aplicación web._`;

    const mensajeCodificado = encodeURIComponent(mensaje);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${mensajeCodificado}`, '_blank', 'noopener,noreferrer');

    setPedidoEnviado(true);
    setEnviando(false);
  };

  if (pedidoEnviado) {
    return (
      <div style={{ padding: '50px 20px', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ fontSize: '65px', marginBottom: '15px' }}>✨🐕✨</div>
        <h3 style={{ fontSize: '24px', color: 'var(--color-navy)', marginTop: '10px', fontWeight: 'bold' }}>
          ¡Pedido enviado con éxito!
        </h3>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '8px', fontSize: '16px', lineHeight: '1.5' }}>
          El salchicha movió la cola de la emoción 🐾
        </p>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '25px', fontSize: '14px' }}>
          Revisá WhatsApp para confirmar el envío con el vendedor.
        </p>
        <button
          onClick={() => { vaciarCarrito(); setPedidoEnviado(false); }}
          style={{
            backgroundColor: 'var(--color-primary)',
            color: 'white', border: 'none', padding: '12px 24px', borderRadius: '25px',
            cursor: 'pointer', fontWeight: 'bold', fontSize: '15px',
            boxShadow: '0 4px 6px rgba(49, 130, 206, 0.3)'
          }}
        >
          🐾 Hacer un nuevo pedido
        </button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div style={{ padding: '50px 20px', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ fontSize: '65px', marginBottom: '15px', display: 'inline-block', transform: 'scaleX(-1)' }}>
          🐕💨
        </div>
        <h3 style={{ fontSize: '24px', color: 'var(--color-navy)', marginTop: '10px', fontWeight: 'bold' }}>
          ¡El perro salchicha vio tu carrito vacío!
        </h3>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '25px', fontSize: '16px', lineHeight: '1.5' }}>
          Ladra de tristeza porque todavía no sumaste ningún producto para fraccionar. ¡Dale una alegría y llenalo de brillo!
        </p>
        <button
          onClick={() => navigate('/catalogo')}
          style={{
            backgroundColor: 'var(--color-primary)',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '25px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '15px',
            boxShadow: '0 4px 6px rgba(49, 130, 206, 0.3)',
            transition: 'transform 0.1s ease'
          }}
        >
          🐾 Explorar el Catálogo
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '26px', color: 'var(--color-text)', margin: 0 }}>Resumen de tu Pedido</h2>
        <div style={{ display: 'flex', gap: '6px', backgroundColor: 'var(--color-bg-card)', padding: '8px 14px', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '13px', flexWrap: 'wrap' }}>
          <span>🐕 <strong>{cantidadProductos}</strong> prod.</span>
          <span>|</span>
          <span>📦 <strong>{totalLitros}L</strong></span>
          <span>|</span>
          <span style={{ color: esMayorista ? 'var(--color-success-dark)' : 'var(--color-text-muted)', fontWeight: 'bold' }}>
            {esMayorista ? '🏷️ Mayorista' : 'Minorista'}
          </span>
        </div>
      </div>

      {/* Lista de productos */}
      <div style={{ backgroundColor: 'var(--color-bg-card)', borderRadius: '12px', border: '1px solid var(--color-border)', marginBottom: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', overflow: 'hidden' }}>
        {cart.map((item, index) => {
          const precio = esMayorista ? item.producto.precioMayorista : item.producto.precioMinorista;
          const esUltimo = index === cart.length - 1;
          return (
            <div key={item.producto.id} style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '15px 20px',
              borderBottom: esUltimo ? 'none' : '1px solid var(--color-border-light)',
            }}>
              {/* Miniatura */}
              <div style={{
                width: '48px', height: '48px', borderRadius: '8px', overflow: 'hidden',
                backgroundColor: '#f8f8f8', flexShrink: 0, border: '1px solid var(--color-border-light)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <img
                  src={item.producto.imagenUrl}
                  alt={item.producto.nombre}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>

              {/* Info */}
              <div style={{ flex: '1', minWidth: 0 }}>
                <div style={{ fontWeight: 'bold', color: 'var(--color-text)', fontSize: '14px' }}>{item.producto.nombre}</div>
                <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                  {item.producto.presentacion} · <strong>$ {formatearPrecio(precio)}</strong> c/u
                </div>
              </div>

              {/* Controles de cantidad */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
                <button
                  onClick={() => removerDelCarrito(item.producto.id)}
                  style={{
                    border: '1px solid var(--color-border)', background: 'var(--color-bg-card)',
                    cursor: 'pointer', fontWeight: 'bold', padding: '6px 10px',
                    color: 'var(--color-text)', fontSize: '15px', borderRadius: '6px 0 0 6px',
                    lineHeight: 1
                  }}
                >
                  -
                </button>
                <span style={{
                  fontWeight: 'bold', minWidth: '32px', textAlign: 'center',
                  color: 'var(--color-text)', fontSize: '14px',
                  borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)',
                  padding: '6px 0', lineHeight: 1
                }}>
                  {item.cantidad}
                </span>
                <button
                  onClick={() => agregarAlCarrito(item.producto)}
                  style={{
                    border: '1px solid var(--color-border)', background: 'var(--color-bg-card)',
                    cursor: 'pointer', fontWeight: 'bold', padding: '6px 10px',
                    color: 'var(--color-text)', fontSize: '15px', borderRadius: '0 6px 6px 0',
                    lineHeight: 1
                  }}
                >
                  +
                </button>
              </div>

              {/* Subtotal */}
              <div style={{ fontWeight: 'bold', color: 'var(--color-navy)', fontSize: '15px', minWidth: '70px', textAlign: 'right' }}>
                $ {formatearPrecio(precio * item.cantidad)}
              </div>
            </div>
          );
        })}
      </div>

      {/* Barra de progreso mayorista y total */}
      <div style={{ backgroundColor: 'var(--color-bg-card)', borderRadius: '12px', border: '1px solid var(--color-border)', padding: '20px', marginBottom: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
        {/* Total y vaciar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <button
            onClick={() => { if (window.confirm('¿Estás seguro de vaciar el carrito? Se perderán todos los productos.')) vaciarCarrito(); }}
            style={{ color: 'var(--color-danger)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '500', fontSize: '13px', padding: 0 }}
          >
            🗑️ Vaciar Carrito
          </button>
          <span style={{ fontSize: '22px', fontWeight: 'bold', color: 'var(--color-navy)' }}>
            Total: $ {formatearPrecio(obtenerTotal())}
          </span>
        </div>

        {/* Barra de progreso */}
        <div style={{ marginTop: '5px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '6px' }}>
            <span>{totalLitros >= UMBRAL_MAYORISTA ? '✅ ¡Mayorista alcanzado!' : `📦 ${totalLitros}L / ${UMBRAL_MAYORISTA}L para Mayorista`}</span>
            <span style={{ fontWeight: 'bold', color: totalLitros >= UMBRAL_MAYORISTA ? 'var(--color-success-dark)' : 'var(--color-text-muted)' }}>
              {Math.round(porcentajeMayorista)}%
            </span>
          </div>
          <div style={{
            width: '100%', height: '8px', backgroundColor: 'var(--color-border-light)',
            borderRadius: '4px', overflow: 'hidden'
          }}>
            <div style={{
              width: `${porcentajeMayorista}%`, height: '100%',
              backgroundColor: totalLitros >= UMBRAL_MAYORISTA ? 'var(--color-success)' : 'var(--color-primary)',
              borderRadius: '4px', transition: 'width 0.3s ease'
            }} />
          </div>
          {totalLitros >= UMBRAL_MAYORISTA && (
            <div style={{ marginTop: '8px', fontSize: '13px', color: 'var(--color-success-dark)', fontWeight: 'bold' }}>
              🐕 ¡Guau! Tu pedido ya es tan largo como yo. ¡Destrabaste la tarifa Mayorista!
            </div>
          )}
        </div>
      </div>

      {/* Formulario */}
      <div style={{ backgroundColor: 'var(--color-bg-card)', borderRadius: '12px', border: '1px solid var(--color-border)', padding: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
        <h3 style={{ margin: '0 0 15px 0', color: 'var(--color-text)', fontSize: '18px' }}>Datos de Confirmación</h3>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: 'var(--color-text-secondary)' }}>Tu Nombre / Negocio *</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: María José o Minimarket San Cayetano"
            disabled={enviando}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--color-border)', boxSizing: 'border-box', opacity: enviando ? 0.6 : 1 }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: 'var(--color-text-secondary)' }}>Notas adicionales (Opcional)</label>
          <textarea
            value={nota}
            onChange={(e) => setNota(e.target.value)}
            placeholder="Ej: Llevo los envases vacíos para fraccionar..."
            disabled={enviando}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--color-border)', minHeight: '80px', boxSizing: 'border-box', fontFamily: 'inherit', opacity: enviando ? 0.6 : 1 }}
          />
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={() => navigate('/catalogo')}
            style={{
              flex: '1 1 180px', padding: '14px', borderRadius: '8px',
              border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-card)',
              color: 'var(--color-text)', fontWeight: 'bold', fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            🛍️ Seguir Comprando
          </button>
          <button
            onClick={enviarWhatsApp}
            disabled={enviando}
            className={enviando ? '' : 'btn-whatsapp'}
            style={{
              flex: '1 1 180px', backgroundColor: enviando ? 'var(--color-text-muted)' : 'var(--color-whatsapp)',
              color: 'white', border: 'none', padding: '14px', borderRadius: '8px',
              fontSize: '15px', fontWeight: 'bold', cursor: enviando ? 'not-allowed' : 'pointer',
              display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px',
              boxShadow: enviando ? 'none' : '0 4px 10px rgba(37,211,102,0.3)',
              opacity: enviando ? 0.7 : 1
            }}
          >
            {enviando ? <>⏳ Enviando...</> : <><span>💬</span> Enviar Pedido por WhatsApp</>}
          </button>
        </div>
      </div>
    </div>
  );
};