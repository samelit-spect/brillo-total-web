import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { obtenerPedidosPorUsuario, type PedidoGuardado } from '../services/pedidos';
import { formatearPrecio } from '../utils/constants';

export const PerfilView: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [pedidos, setPedidos] = useState<PedidoGuardado[]>([]);
  const [cargando, setCargando] = useState(true);
  const [expandido, setExpandido] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    const cargar = async () => {
      try {
        setCargando(true);
        const lista = await obtenerPedidosPorUsuario(user.uid);
        setPedidos(lista);
      } catch {
        // silent
      } finally {
        setCargando(false);
      }
    };
    cargar();
  }, [user, navigate]);

  const formatearFecha = (ts: { seconds: number } | null): string => {
    if (!ts) return '—';
    return new Date(ts.seconds * 1000).toLocaleDateString('es-AR', {
      day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
    });
  };

  if (!user) return null;

  return (
    <div style={{ padding: 'var(--space-5)', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{
        backgroundColor: 'var(--color-bg-card)', borderRadius: 'var(--radius-md)',
        border: '1px solid var(--color-border)', padding: 'var(--space-6)',
        marginBottom: 'var(--space-6)', textAlign: 'center',
      }}>
        <div style={{ fontSize: '56px', marginBottom: 'var(--space-3)' }}>🐕</div>
        <h2 style={{ margin: '0 0 var(--space-1)' }}>Mi Perfil</h2>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', marginBottom: 'var(--space-4)' }}>
          {user.email}
        </p>
        <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => navigate('/catalogo')}
            style={{
              backgroundColor: 'var(--color-primary)', color: '#fff', border: 'none',
              padding: '10px 20px', borderRadius: 'var(--radius-full)', fontWeight: 600,
              fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit',
            }}>
            🛍️ Ir al Catálogo
          </button>
          <button onClick={async () => { await logout(); navigate('/catalogo'); }}
            style={{
              backgroundColor: 'transparent', color: 'var(--color-danger)',
              border: '1px solid var(--color-danger)', padding: '10px 20px',
              borderRadius: 'var(--radius-full)', fontWeight: 600, fontSize: '13px',
              cursor: 'pointer', fontFamily: 'inherit',
            }}>
            🔒 Cerrar Sesión
          </button>
        </div>
      </div>

      <h3 style={{ marginBottom: 'var(--space-4)' }}>📋 Mis Pedidos</h3>

      {cargando ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {[1, 2, 3].map((i) => (
            <div key={i} className="skeleton" style={{ height: '72px', borderRadius: 'var(--radius-md)' }} />
          ))}
        </div>
      ) : pedidos.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 'var(--space-8)', color: 'var(--color-text-muted)' }}>
          <p style={{ fontSize: '16px', marginBottom: 'var(--space-4)' }}>
            Todavía no hiciste ningún pedido.
          </p>
          <button onClick={() => navigate('/catalogo')}
            style={{
              backgroundColor: 'var(--color-primary)', color: '#fff', border: 'none',
              padding: '12px 28px', borderRadius: 'var(--radius-full)', fontWeight: 600,
              fontSize: '15px', cursor: 'pointer', fontFamily: 'inherit',
            }}>
            🐾 Explorar el Catálogo
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {pedidos.map((pedido) => {
            const estaExpandido = expandido === pedido.id;
            return (
              <div key={pedido.id} style={{
                backgroundColor: 'var(--color-bg-card)', borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)', overflow: 'hidden',
              }}>
                <button onClick={() => setExpandido(estaExpandido ? null : pedido.id)}
                  style={{
                    width: '100%', display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center', padding: 'var(--space-4) var(--space-5)',
                    background: 'none', border: 'none', cursor: 'pointer', gap: 'var(--space-3)',
                    color: 'var(--color-text)', textAlign: 'left',
                  }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <span style={{ fontSize: '20px' }}>📦</span>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '14px' }}>{pedido.nombre}</div>
                      <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                        {formatearFecha(pedido.creadoEn)}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--color-primary)' }}>
                        $ {formatearPrecio(pedido.total)}
                      </div>
                      <div style={{
                        fontSize: '11px', fontWeight: 600,
                        color: pedido.esMayorista ? 'var(--color-accent-dark)' : 'var(--color-text-muted)',
                      }}>
                        {pedido.esMayorista ? 'Mayorista' : 'Minorista'}
                      </div>
                    </div>
                    <span style={{
                      fontSize: '12px', color: 'var(--color-text-muted)',
                      transform: estaExpandido ? 'rotate(180deg)' : 'rotate(0)',
                      transition: 'transform 0.2s',
                    }}>▼</span>
                  </div>
                </button>

                {estaExpandido && (
                  <div style={{
                    borderTop: '1px solid var(--color-border-light)',
                    padding: 'var(--space-4) var(--space-5)',
                    backgroundColor: 'var(--color-bg-page)',
                  }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                      {pedido.items.map((item, idx) => (
                        <div key={idx} style={{
                          display: 'flex', justifyContent: 'space-between',
                          alignItems: 'center', fontSize: '13px',
                          padding: 'var(--space-2) var(--space-3)',
                          backgroundColor: 'var(--color-bg-card)',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--color-border-light)',
                        }}>
                          <div>
                            <span style={{ fontWeight: 600 }}>{item.nombre}</span>
                            <span style={{ color: 'var(--color-text-muted)', marginLeft: '6px' }}>
                              ({item.presentacion})
                            </span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                            <span style={{ color: 'var(--color-text-muted)' }}>x{item.cantidad}</span>
                            <span style={{ fontWeight: 600, minWidth: '65px', textAlign: 'right' }}>
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
