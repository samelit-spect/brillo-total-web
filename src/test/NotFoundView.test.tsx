import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NotFoundView } from '../views/NotFoundView';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

describe('NotFoundView', () => {
  it('renderiza el mensaje de error 404', () => {
    render(<NotFoundView />);
    expect(screen.getByText('Página no encontrada')).toBeInTheDocument();
  });

  it('muestra el texto del salchicha', () => {
    render(<NotFoundView />);
    expect(screen.getByText(/El salchicha buscó por todos lados/)).toBeInTheDocument();
  });

  it('tiene un botón para volver al catálogo', () => {
    render(<NotFoundView />);
    const btn = screen.getByRole('button', { name: /volver al catálogo/i });
    expect(btn).toBeInTheDocument();
  });

  it('navega a /catalogo al hacer clic', () => {
    render(<NotFoundView />);
    const btn = screen.getByRole('button', { name: /volver al catálogo/i });
    btn.click();
    expect(mockNavigate).toHaveBeenCalledWith('/catalogo');
  });
});
