import React from 'react';

export const card = {
  backgroundColor: 'var(--color-bg-card)',
  borderRadius: 'var(--radius-md)',
  border: '1px solid var(--color-border)',
  boxShadow: 'var(--shadow-sm)',
} as const;

export const cardElevated = {
  ...card,
  boxShadow: 'var(--shadow-md)',
} as const;

export const cardHover = {
  ...card,
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  cursor: 'pointer',
} as const;

export const flexCenter: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export const flexBetween: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

export const container: React.CSSProperties = {
  padding: 'var(--space-5)',
  maxWidth: '1200px',
  margin: '0 auto',
};

export const grid = (min: string = '280px'): React.CSSProperties => ({
  display: 'grid',
  gridTemplateColumns: `repeat(auto-fill, minmax(${min}, 1fr))`,
  gap: 'var(--space-6)',
  padding: 'var(--space-3) 0',
});

export const input: React.CSSProperties = {
  width: '100%',
  padding: '10px 12px',
  borderRadius: 'var(--radius-sm)',
  border: '1px solid var(--color-border)',
  backgroundColor: 'var(--color-bg-card)',
  color: 'var(--color-text)',
  fontSize: '14px',
  fontFamily: 'inherit',
  transition: 'border-color 0.2s, box-shadow 0.2s',
};

export const label: React.CSSProperties = {
  display: 'block',
  marginBottom: 'var(--space-1)',
  fontWeight: 600,
  fontSize: '13px',
  color: 'var(--color-text-secondary)',
};

export const badge = (bg: string, color: string): React.CSSProperties => ({
  fontSize: '11px',
  fontWeight: 700,
  textTransform: 'uppercase' as const,
  color,
  backgroundColor: bg,
  padding: '3px 10px',
  borderRadius: 'var(--radius-full)',
  letterSpacing: '0.3px',
  display: 'inline-block',
});

export const pageHeader: React.CSSProperties = {
  textAlign: 'center',
  marginBottom: 'var(--space-10)',
  marginTop: 'var(--space-5)',
};

export const ctaGradient: React.CSSProperties = {
  background: 'linear-gradient(135deg, var(--color-navy) 0%, var(--color-primary) 100%)',
  borderRadius: 'var(--radius-lg)',
  padding: 'var(--space-8) var(--space-6)',
  color: 'white',
  textAlign: 'center',
};

export const btnBase: React.CSSProperties = {
  border: 'none',
  fontWeight: 600,
  borderRadius: 'var(--radius-sm)',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  fontFamily: 'inherit',
};

export const btnPrimary: React.CSSProperties = {
  ...btnBase,
  backgroundColor: 'var(--color-primary)',
  color: '#ffffff',
  padding: '10px 20px',
  fontSize: '14px',
};

export const toastBase: React.CSSProperties = {
  position: 'fixed',
  bottom: '80px',
  left: '50%',
  transform: 'translateX(-50%)',
  color: 'white',
  padding: 'var(--space-3) var(--space-6)',
  borderRadius: 'var(--radius-md)',
  fontSize: '14px',
  fontWeight: 600,
  zIndex: 9999,
  boxShadow: 'var(--shadow-xl)',
  animation: 'fadeInUp 0.25s ease',
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--space-2)',
  backdropFilter: 'blur(8px)',
};

export const errorBox: React.CSSProperties = {
  textAlign: 'center',
  padding: 'var(--space-4)',
  marginBottom: 'var(--space-5)',
  borderRadius: 'var(--radius-sm)',
  backgroundColor: 'var(--color-danger-light)',
  border: '1px solid var(--color-danger)',
  color: 'var(--color-danger-dark)',
  fontSize: '14px',
  fontWeight: 600,
};
