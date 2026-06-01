export const Header = () => {
  return (
    <header style={{ padding: '1rem', backgroundColor: '#f5f5f5', borderBottom: '1px solid #ddd' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ margin: 0, color: '#333', fontSize: '1.8rem' }}>Brillo Total</h1>
        <nav>
          <ul style={{ display: 'flex', gap: '1.5rem', listStyle: 'none', margin: 0, padding: 0 }}>
            <li><a href="#catalogo" style={{ textDecoration: 'none', color: '#0070f3', fontWeight: 'bold' }}>Catálogo</a></li>
            <li><a href="#contacto" style={{ textDecoration: 'none', color: '#0070f3', fontWeight: 'bold' }}>Contacto</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};