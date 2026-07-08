import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { guardarPedido } from '../services/pedidos';
import { WHATSAPP_NUMBER, formatearPrecio } from '../utils/constants';
import { obtenerSessionId } from '../utils/session';

const UMBRAL_MAYORISTA = 20;

export const CarritoView: React.FC = () => {
  const navigate = useNavigate();
  const { cart, esMayorista, removerDelCarrito, agregarAlCarrito, vaciarCarrito, obtenerTotal } = useCart();
  const [nombre, setNombre] = useState('');
  const [nota, setNota] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [pedidoEnviado, setPedidoEnviado] = useState(false);

  const totalLitros = cart.reduce((acumulado, item) => acumulado + item.cantidad, 0);
  const porcentajeMayorista = Math.min(100, (totalLitros / UMBRAL_MAYORISTA) * 100);

  const enviarWhatsApp = async () => {
    if (!nombre.trim()) {
      alert('Por favor, ingresá tu nombre para procesar el pedido.');
      return;
    }
    if (esMayorista && totalLitros < UMBRAL_MAYORISTA) {
      alert(`⚠️ Para acceder a la tarifa Mayorista tenés que sumar al menos ${UMBRAL_MAYORISTA} litros/unidades al carrito. ¡Actualmente llevás ${totalLitros}!`);
      return;
    }
    setEnviando(true);
    try {
      await guardarPedido({
        nombre,
        nota,
        esMayorista,
        sessionId: obtenerSessionId(),
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
      <div style={{ padding: 'var(--space-12) var(--space-5)', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ fontSize: '72px', marginBottom: 'var(--space-4)', animation: 'bounceIn 0.5s ease' }}>✨🐕✨</div>
        <h2 style={{ color: 'var(--color-text)', marginTop: 'var(--space-3)' }}>
          ¡Pedido enviado con éxito!
        </h2>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)', fontSize: '16px' }}>
          El salchicha movió la cola de la emoción 🐾
        </p>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-6)', fontSize: '14px' }}>
          Revisá WhatsApp para confirmar el envío con el vendedor.
        </p>
        <button
          onClick={() => { vaciarCarrito(); setPedidoEnviado(false); }}
          style={{
            backgroundColor: 'var(--color-primary)',
            color: 'white', border: 'none', padding: '12px 28px', borderRadius: 'var(--radius-full)',
            cursor: 'pointer', fontWeight: 600, fontSize: '15px',
            boxShadow: 'var(--shadow-md)',
            transition: 'all 0.2s',
          }}
        >
          🐾 Hacer un nuevo pedido
        </button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div style={{ padding: 'var(--space-12) var(--space-5)', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ fontSize: '72px', marginBottom: 'var(--space-4)', display: 'inline-block', transform: 'scaleX(-1)' }}>
          🐕💨
        </div>
        <h2 style={{ color: 'var(--color-text)', marginTop: 'var(--space-3)' }}>
          ¡El salchicha vio tu carrito vacío!
        </h2>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)', fontSize: '16px', lineHeight: '1.6' }}>
          Ladra de tristeza porque todavía no sumaste ningún producto. ¡Dale una alegría y llenalo de brillo!
        </p>
        <button
          onClick={() => navigate('/catalogo')}
          style={{
            backgroundColor: 'var(--color-primary)',
            color: 'white', border: 'none', padding: '12px 28px', borderRadius: 'var(--radius-full)',
            cursor: 'pointer', fontWeight: 600, fontSize: '15px',
            boxShadow: 'var(--shadow-md)',
            transition: 'all 0.2s',
          }}
        >
          🐾 Explorar el Catálogo
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: 'var(--space-5)', maxWidth: '900px', margin: '0 auto' }}>
      {/* Encabezado */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 'var(--space-3)',
        marginBottom: 'var(--space-5)',
      }}>
        <h2 style={{ margin: 0 }}>Resumen de tu Pedido</h2>
        <div style={{
          display: 'flex',
          gap: 'var(--space-2)',
          backgroundColor: 'var(--color-bg-card)',
          padding: '6px 14px',
          borderRadius: 'var(--radius-full)',
          border: '1px solid var(--color-border)',
          fontSize: '13px',
        }}>
          <span>📦 <strong>{totalLitros}L</strong></span>
          <span style={{ color: 'var(--color-border)' }}>·</span>
          <span style={{ color: esMayorista ? 'var(--color-accent-dark)' : 'var(--color-text-muted)', fontWeight: 700 }}>
            {esMayorista ? '🏷️ Mayorista' : 'Minorista'}
          </span>
        </div>
      </div>

      {/* Layout responsive: 1 col móvil, 2 cols desktop */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: 'var(--space-5)',
      }}>
        {/* Columna izquierda: Items */}
        <div>
          <div style={{
            backgroundColor: 'var(--color-bg-card)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)',
            overflow: 'hidden',
          }}>
            {cart.map((item, index) => {
              const precio = esMayorista ? item.producto.precioMayorista : item.producto.precioMinorista;
              const esUltimo = index === cart.length - 1;
              return (
                <div key={item.producto.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-3)',
                  padding: 'var(--space-4) var(--space-4)',
                  borderBottom: esUltimo ? 'none' : '1px solid var(--color-border-light)',
                  transition: 'background-color 0.15s',
                }}>
                  {/* Miniatura */}
                  <div style={{
                    width: '52px', height: '52px', borderRadius: 'var(--radius-sm)', overflow: 'hidden',
                    backgroundColor: 'var(--color-border-light)', flexShrink: 0,
                    border: '1px solid var(--color-border)',
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
                    <div style={{ fontWeight: 600, color: 'var(--color-text)', fontSize: '14px' }}>{item.producto.nombre}</div>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                      {item.producto.presentacion} · <strong>$ {formatearPrecio(precio)}</strong> c/u
                    </div>
                  </div>

                  {/* Controles cantidad */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
                    <button
                      onClick={() => removerDelCarrito(item.producto.id)}
                      aria-label="Reducir cantidad"
                      style={{
                        border: '1px solid var(--color-border)', background: 'var(--color-bg-card)',
                        cursor: 'pointer', fontWeight: 700, padding: '5px 9px',
                        color: 'var(--color-text)', fontSize: '14px', borderRadius: 'var(--radius-sm) 0 0 var(--radius-sm)',
                        lineHeight: 1, transition: 'background-color 0.15s',
                      }}
                    >
                      −
                    </button>
                    <span style={{
                      fontWeight: 700, minWidth: '30px', textAlign: 'center',
                      color: 'var(--color-text)', fontSize: '14px',
                      borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)',
                      padding: '5px 0', lineHeight: 1,
                    }}>
                      {item.cantidad}
                    </span>
                    <button
                      onClick={() => agregarAlCarrito(item.producto)}
                      aria-label="Aumentar cantidad"
                      style={{
                        border: '1px solid var(--color-border)', background: 'var(--color-bg-card)',
                        cursor: 'pointer', fontWeight: 700, padding: '5px 9px',
                        color: 'var(--color-text)', fontSize: '14px', borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
                        lineHeight: 1, transition: 'background-color 0.15s',
                      }}
                    >
                      +
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div style={{
                    fontWeight: 700, color: 'var(--color-primary)', fontSize: '15px',
                    minWidth: '75px', textAlign: 'right',
                  }}>
                    $ {formatearPrecio(precio * item.cantidad)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Columna derecha: Resumen + Formulario */}
        <div>
          {/* Progreso mayorista */}
          <div style={{
            backgroundColor: 'var(--color-bg-card)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)',
            padding: 'var(--space-5)',
            marginBottom: 'var(--space-4)',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 'var(--space-4)',
            }}>
              <button
                onClick={() => { if (window.confirm('¿Estás seguro de vaciar el carrito? Se perderán todos los productos.')) vaciarCarrito(); }}
                style={{
                  color: 'var(--color-danger)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 500,
                  fontSize: '13px',
                  padding: 0,
                  transition: 'opacity 0.2s',
                }}
              >
                🗑️ Vaciar
              </button>
              <span style={{
                fontSize: '24px',
                fontWeight: 700,
                color: 'var(--color-text)',
              }}>
                $ {formatearPrecio(obtenerTotal())}
              </span>
            </div>

            <div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '12px',
                color: 'var(--color-text-muted)',
                marginBottom: 'var(--space-2)',
              }}>
                <span>
                  {totalLitros >= UMBRAL_MAYORISTA
                    ? '✅ ¡Mayorista alcanzado!'
                    : `📦 ${totalLitros}L / ${UMBRAL_MAYORISTA}L para Mayorista`}
                </span>
                <span style={{
                  fontWeight: 700,
                  color: totalLitros >= UMBRAL_MAYORISTA ? 'var(--color-success)' : 'var(--color-text-muted)'
                }}>
                  {Math.round(porcentajeMayorista)}%
                </span>
              </div>
              <div style={{
                width: '100%', height: '8px',
                backgroundColor: 'var(--color-border-light)',
                borderRadius: 'var(--radius-full)',
                overflow: 'hidden',
              }}>
                <div style={{
                  width: `${porcentajeMayorista}%`, height: '100%',
                  backgroundColor: totalLitros >= UMBRAL_MAYORISTA
                    ? 'var(--color-success)' : 'var(--color-primary)',
                  borderRadius: 'var(--radius-full)',
                  transition: 'width 0.4s ease',
                }} />
              </div>
              {totalLitros >= UMBRAL_MAYORISTA && (
                <div style={{
                  marginTop: 'var(--space-2)',
                  fontSize: '13px',
                  color: 'var(--color-success-dark)',
                  fontWeight: 600,
                }}>
                  🐕 ¡Guau! Destrabaste la tarifa Mayorista.
                </div>
              )}
            </div>
          </div>

          {/* Formulario */}
          <div style={{
            backgroundColor: 'var(--color-bg-card)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)',
            padding: 'var(--space-5)',
          }}>
            <h3 style={{ margin: '0 0 var(--space-4)', fontSize: '18px', color: 'var(--color-text)' }}>
              Datos de Confirmación
            </h3>

            <div style={{ marginBottom: 'var(--space-3)' }}>
              <label style={{
                display: 'block', marginBottom: 'var(--space-1)',
                fontWeight: 600, fontSize: '13px', color: 'var(--color-text-secondary)',
              }}>
                Tu Nombre / Negocio *
              </label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej: María José o Minimarket San Cayetano"
                disabled={enviando}
                style={{
                  width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-border)', boxSizing: 'border-box',
                  fontFamily: 'inherit', fontSize: '14px',
                  opacity: enviando ? 0.6 : 1,
                  transition: 'border-color 0.2s',
                }}
              />
            </div>

            <div style={{ marginBottom: 'var(--space-4)' }}>
              <label style={{
                display: 'block', marginBottom: 'var(--space-1)',
                fontWeight: 600, fontSize: '13px', color: 'var(--color-text-secondary)',
              }}>
                Notas adicionales (Opcional)
              </label>
              <textarea
                value={nota}
                onChange={(e) => setNota(e.target.value)}
                placeholder="Ej: Llevo los envases vacíos para fraccionar..."
                disabled={enviando}
                style={{
                  width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-border)', minHeight: '80px',
                  boxSizing: 'border-box', fontFamily: 'inherit', fontSize: '14px',
                  resize: 'vertical',
                  opacity: enviando ? 0.6 : 1,
                  transition: 'border-color 0.2s',
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
              <button
                onClick={() => navigate('/catalogo')}
                style={{
                  flex: '1 1 160px', padding: '12px 16px', borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-card)',
                  color: 'var(--color-text)', fontWeight: 600, fontSize: '14px',
                  cursor: 'pointer', transition: 'all 0.2s',
                }}
              >
                🛍️ Seguir Comprando
              </button>
              <button
                onClick={enviarWhatsApp}
                disabled={enviando}
                className={enviando ? '' : 'btn-whatsapp'}
                style={{
                  flex: '1 1 160px',
                  backgroundColor: enviando ? 'var(--color-text-muted)' : 'var(--color-whatsapp)',
                  color: 'white', border: 'none', padding: '12px 16px', borderRadius: 'var(--radius-sm)',
                  fontSize: '14px', fontWeight: 600,
                  cursor: enviando ? 'not-allowed' : 'pointer',
                  display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 'var(--space-2)',
                  boxShadow: enviando ? 'none' : 'var(--shadow-md)',
                  opacity: enviando ? 0.7 : 1,
                }}
              >
                {enviando ? <>⏳ Enviando...</> : <><span>💬</span> Enviar por WhatsApp</>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
