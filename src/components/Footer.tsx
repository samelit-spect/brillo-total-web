export const Footer = () => {
  return (
    <footer style={{ padding: '1.5rem', backgroundColor: '#333', color: '#fff', textAlign: 'center', marginTop: 'auto' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <p style={{ margin: '0 0 0.5rem 0' }}>&copy; {new Date().getFullYear()} Brillo Total La Rioja - Todos los derechos reservados.</p>
        <p style={{ margin: 0, fontSize: '0.9rem', color: '#ccc' }}>Contacto: La Rioja Capital, Argentina</p>
      </div>
    </footer>
  );
};