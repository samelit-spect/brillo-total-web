import React from 'react';

interface MainProps {
 children: React.ReactNode;
}

export const Main = ({ children }: MainProps) => {
 return (
  <main style={{
    padding: 'var(--space-4) var(--space-4)',
    maxWidth: '1200px',
    width: '100%',
    margin: '0 auto',
    minHeight: '70vh',
    boxSizing: 'border-box',
  }}>
   {children}
  </main>
 );
};
