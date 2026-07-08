import React, { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          minHeight: '60vh', padding: '40px', textAlign: 'center', color: 'var(--color-text-secondary)'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🐕‍🦺</div>
          <h2 style={{ color: 'var(--color-navy)', margin: '0 0 8px' }}>Algo salió mal</h2>
          <p style={{ margin: '0 0 20px', fontSize: '14px' }}>
            {this.state.error?.message || 'Ocurrió un error inesperado.'}
          </p>
          <button
            onClick={() => { this.setState({ hasError: false, error: null }); window.location.href = '/'; }}
            style={{
              backgroundColor: 'var(--color-primary)', color: '#fff', border: 'none',
              padding: '10px 24px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer'
            }}
          >
            Volver al inicio
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
