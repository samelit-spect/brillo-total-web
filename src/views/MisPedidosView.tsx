import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { obtenerPedidosPorSesion, obtenerPedidosPorUsuario, type PedidoGuardado } from '../services/pedidos';
import { obtenerSessionId } from '../utils/session';
import { formatearPrecio } from '../utils/constants';

export const MisPedidosView: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [pedidos, setPedidos] = useState<PedidoGuardado[]>([]);
  const [cargando, setCargando] = useState(true);
  const [expandido, setExpandido] = useState<string | null>(null);

  useEffect(() => {
    const cargar = async () => {
      try {
        setCargando(true);
        if (user) {
          const lista = await obtenerPedidosPorUsuario(user.uid);
          setPedidos(lista);
        } else {
          const lista = await obtenerPedidosPorSesion(obtenerSessionId());
          setPedidos(lista);
        }
      } catch {
        // silent
      } finally {
        setCargando(false);
      }
    };
    cargar();
  }, [user]);

  const formatearFecha = (ts: { seconds: number } | null): string => {
    if (!ts) return '—';
    return new Date(ts.seconds * 1000).toLocaleDateString('es-AR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (cargando) {
    return (
      <div style={{ padding: 'var(--space-5)', maxWidth: '800px', margin: '0 auto' }}>
        <div className="skeleton" style={{ height: '28px', width: '200px', marginBottom: 'var(--space-6)', borderRadius: 'var(--radius-sm)' }} />
        {[1, 2, 3].map((i) => (
          <div key={i} style={{ marginBottom: 'var(--space-4)' }}>
            <div className="skeleton" style={{ height: '80px', borderRadius: 'var(--radius-md)' }} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div style={{ padding: 'var(--space-5)', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 'var(--space-6)',
        flexWrap: 'wrap',
        gap: 'var(--space-3)',
      }}>
        <h2 style={{ margin: 0, color: 'var(--color-text)' }}>📋 Mis Pedidos</h2>
        <button
          onClick={() => navigate('/catalogo')}
          style={{
            backgroundColor: 'var(--color-primary)',
            color: '#ffffff', border: 'none',
            padding: '10px 20px', borderRadius: 'var(--radius-full)',
            fontWeight: 600, fontSize: '13px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '6px',
          }}
        >
          🛍️ Ir al catálogo
        </button>
      </div>

      {!user && pedidos.length > 0 && (
        <div style={{
          textAlign: 'center', padding: 'var(--space-3) var(--space-5)',
          marginBottom: 'var(--space-4)',
          backgroundColor: 'var(--color-bg-card)', borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border-light)',
          fontSize: '13px', color: 'var(--color-text-muted)',
        }}>
          💡 Iniciá sesión para ver tus pedidos en cualquier dispositivo.{' '}
          <span onClick={() => navigate('/login')} style={{ color: 'var(--color-primary)', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}>
            Ingresar
          </span>
        </div>
      )}

      {pedidos.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: 'var(--space-12) var(--space-5)',
          color: 'var(--color-text-muted)',
        }}>
          <div style={{ fontSize: '64px', marginBottom: 'var(--space-4)', transform: 'scaleX(-1)' }}>
            🐕
          </div>
          {!user && (
            <p style={{ fontSize: '15px', marginBottom: 'var(--space-3)' }}>
              Iniciá sesión para ver tu historial de pedidos.
            </p>
          )}
          <p style={{ fontSize: '16px', marginBottom: 'var(--space-2)' }}>
            {user ? 'Todavía no hiciste ningún pedido.' : 'Todavía no hay pedidos registrados.'}
          </p>
          <p style={{ fontSize: '14px', marginBottom: 'var(--space-6)' }}>
            ¡El salchicha te espera con los productos listos!
          </p>
          <button
            onClick={() => navigate('/catalogo')}
            style={{
              backgroundColor: 'var(--color-primary)',
              color: '#ffffff', border: 'none',
              padding: '12px 28px', borderRadius: 'var(--radius-full)',
              fontWeight: 600, fontSize: '15px', cursor: 'pointer',
            }}
          >
            🐾 Explorar el Catálogo
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {pedidos.map((pedido) => {
            const estaExpandido = expandido === pedido.id;
            return (
              <div
                key={pedido.id}
                style={{
                  backgroundColor: 'var(--color-bg-card)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                  overflow: 'hidden',
                  transition: 'box-shadow 0.2s',
                }}
              >
                <button
                  onClick={() => setExpandido(estaExpandido ? null : pedido.id)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 'var(--space-4) var(--space-5)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    gap: 'var(--space-3)',
                    color: 'var(--color-text)',
                    textAlign: 'left',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '24px' }}>📦</span>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '14px' }}>
                        {pedido.nombre}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                        {formatearFecha(pedido.creadoEn)}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 700, fontSize: '15px', color: 'var(--color-primary)' }}>
                        $ {formatearPrecio(pedido.total)}
                      </div>
                      <div style={{
                        fontSize: '11px',
                        fontWeight: 600,
                        color: pedido.esMayorista ? 'var(--color-accent-dark)' : 'var(--color-text-muted)',
                      }}>
                        {pedido.esMayorista ? '🏷️ Mayorista' : 'Minorista'}
                      </div>
                    </div>
                    <span style={{
                      fontSize: '14px',
                      color: 'var(--color-text-muted)',
                      transition: 'transform 0.2s',
                      transform: estaExpandido ? 'rotate(180deg)' : 'rotate(0)',
                    }}>
                      ▼
                    </span>
                  </div>
                </button>

                {estaExpandido && (
                  <div style={{
                    borderTop: '1px solid var(--color-border-light)',
                    padding: 'var(--space-4) var(--space-5)',
                    backgroundColor: 'var(--color-bg-page)',
                  }}>
                    {pedido.nota && (
                      <div style={{
                        fontSize: '12px',
                        color: 'var(--color-text-muted)',
                        marginBottom: 'var(--space-3)',
                        fontStyle: 'italic',
                      }}>
                        📝 Nota: {pedido.nota}
                      </div>
                    )}
                    <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: 'var(--space-2)' }}>
                      Productos ({pedido.items.length})
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                      {pedido.items.map((item, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            fontSize: '13px',
                            padding: 'var(--space-2) var(--space-3)',
                            backgroundColor: 'var(--color-bg-card)',
                            borderRadius: 'var(--radius-sm)',
                            border: '1px solid var(--color-border-light)',
                          }}
                        >
                          <div>
                            <span style={{ fontWeight: 600, color: 'var(--color-text)' }}>
                              {item.nombre}
                            </span>
                            <span style={{ color: 'var(--color-text-muted)', marginLeft: '6px' }}>
                              ({item.presentacion})
                            </span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                            <span style={{ color: 'var(--color-text-muted)', fontSize: '12px' }}>
                              x{item.cantidad}
                            </span>
                            <span style={{
                              fontWeight: 600,
                              color: 'var(--color-text-secondary)',
                              minWidth: '65px',
                              textAlign: 'right',
                            }}>
                              $ {formatearPrecio(item.subtotal)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
