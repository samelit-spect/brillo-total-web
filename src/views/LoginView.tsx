import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const LoginView: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const manejarLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Completá todos los campos.');
      return;
    }
    setCargando(true);
    setError('');
    try {
      await login(email, password);
      navigate('/catalogo');
    } catch (err) {
      const fbErr = err as { code?: string };
      if (fbErr.code === 'auth/user-not-found' || fbErr.code === 'auth/wrong-password' || fbErr.code === 'auth/invalid-credential') {
        setError('Email o contraseña incorrectos.');
      } else if (fbErr.code === 'auth/too-many-requests') {
        setError('Demasiados intentos. Esperá un momento.');
      } else if (fbErr.code === 'auth/invalid-email') {
        setError('El formato del email no es válido.');
      } else {
        setError('Error al iniciar sesión. Intentalo de nuevo.');
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      minHeight: '60vh', padding: 'var(--space-5)',
    }}>
      <div style={{
        backgroundColor: 'var(--color-bg-card)', padding: 'var(--space-8)',
        borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)',
        width: '100%', maxWidth: '400px',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
          <div style={{ fontSize: '48px', marginBottom: 'var(--space-2)' }}>🐕</div>
          <h2 style={{ margin: '0 0 var(--space-1)' }}>Iniciar Sesión</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '14px', margin: 0 }}>
            Ingresá para ver tu historial de pedidos.
          </p>
        </div>
        <form onSubmit={manejarLogin} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <input
            type="email" value={email} onChange={(e) => { setEmail(e.target.value); setError(''); }}
            placeholder="Email" autoFocus
            style={{
              width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)',
              border: `1px solid ${error ? 'var(--color-danger)' : 'var(--color-border)'}`,
              fontSize: '15px', fontFamily: 'inherit', boxSizing: 'border-box',
            }}
          />
          <input
            type="password" value={password} onChange={(e) => { setPassword(e.target.value); setError(''); }}
            placeholder="Contraseña"
            style={{
              width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)',
              border: `1px solid ${error ? 'var(--color-danger)' : 'var(--color-border)'}`,
              fontSize: '15px', fontFamily: 'inherit', boxSizing: 'border-box',
            }}
          />
          {error && <p style={{ color: 'var(--color-danger)', fontSize: '13px', margin: 0 }}>{error}</p>}
          <button type="submit" disabled={cargando}
            style={{
              width: '100%', backgroundColor: 'var(--color-primary)', color: '#fff',
              border: 'none', padding: '12px', borderRadius: 'var(--radius-sm)',
              fontWeight: 600, fontSize: '15px', cursor: 'pointer',
              opacity: cargando ? 0.7 : 1, fontFamily: 'inherit',
            }}>
            {cargando ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
        <div style={{ textAlign: 'center', marginTop: 'var(--space-4)' }}>
          <span style={{ color: 'var(--color-text-muted)', fontSize: '14px' }}>
            ¿No tenés cuenta?{' '}
          </span>
          <button onClick={() => navigate('/registro')}
            style={{
              background: 'none', border: 'none', color: 'var(--color-primary)',
              fontWeight: 600, cursor: 'pointer', fontSize: '14px', fontFamily: 'inherit',
              padding: 0, textDecoration: 'underline',
            }}>
            Registrate
          </button>
        </div>
      </div>
    </div>
  );
};
