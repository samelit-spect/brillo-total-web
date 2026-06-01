interface MainProps {
  children: React.ReactNode;
}

export const Main = ({ children }: MainProps) => {
  return (
    <main style={{ padding: '2rem 1rem', maxWidth: '1200px', margin: '0 auto', minHeight: '70vh' }}>
      {children}
    </main>
  );
};