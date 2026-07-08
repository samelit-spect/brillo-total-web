import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProductoCard } from '../components/ProductoCard';
import type { Producto } from '../info/productos';

const mockNavigate = vi.fn();
const mockAgregarAlCarrito = vi.fn();
const mockRemoverDelCarrito = vi.fn();
let mockCart: Array<{ producto: Producto; cantidad: number }> = [];

vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock('../hooks/useCart', () => ({
  useCart: () => ({
    cart: mockCart,
    esMayorista: false,
    setEsMayorista: vi.fn(),
    agregarAlCarrito: mockAgregarAlCarrito,
    removerDelCarrito: mockRemoverDelCarrito,
    vaciarCarrito: vi.fn(),
    obtenerTotal: () => 0,
    obtenerCantidadTotal: () => 0,
  }),
}));

const productoBase: Producto = {
  id: 'test-1',
  nombre: 'Lavandina Concentrada',
  descripcion: 'Lavandina para limpieza general del hogar',
  precioMinorista: 500,
  precioMayorista: 350,
  categoria: 'hogar',
  presentacion: 'Por litro',
  stock: true,
  imagenUrl: 'https://example.com/img.jpg',
};

describe('ProductoCard', () => {
  beforeEach(() => {
    mockCart = [];
    vi.clearAllMocks();
  });

  it('renderiza el nombre y precio del producto', () => {
    render(<ProductoCard producto={productoBase} />);
    expect(screen.getByText('Lavandina Concentrada')).toBeInTheDocument();
    expect(screen.getByText('$500')).toBeInTheDocument();
  });

  it('muestra la descripción', () => {
    render(<ProductoCard producto={productoBase} />);
    expect(screen.getByText('Lavandina para limpieza general del hogar')).toBeInTheDocument();
  });

  it('muestra la presentación', () => {
    render(<ProductoCard producto={productoBase} />);
    expect(screen.getByText('Por litro')).toBeInTheDocument();
  });

  it('muestra el badge de categoría', () => {
    render(<ProductoCard producto={productoBase} />);
    expect(screen.getByText(/Línea Hogar/)).toBeInTheDocument();
  });

  it('muestra botón "+ Agregar" cuando el producto no está en el carrito', () => {
    render(<ProductoCard producto={productoBase} />);
    expect(screen.getByRole('button', { name: /agregar/i })).toBeInTheDocument();
  });

  it('llama a agregarAlCarrito al hacer clic en Agregar', () => {
    render(<ProductoCard producto={productoBase} />);
    screen.getByRole('button', { name: /agregar/i }).click();
    expect(mockAgregarAlCarrito).toHaveBeenCalledWith(productoBase);
  });

  it('muestra el stepper cuando el producto está en el carrito', () => {
    mockCart = [{ producto: productoBase, cantidad: 3 }];
    render(<ProductoCard producto={productoBase} />);
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reducir cantidad/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /aumentar cantidad/i })).toBeInTheDocument();
  });

  it('llama a removerDelCarrito al hacer clic en −', () => {
    mockCart = [{ producto: productoBase, cantidad: 2 }];
    render(<ProductoCard producto={productoBase} />);
    screen.getByRole('button', { name: /reducir cantidad/i }).click();
    expect(mockRemoverDelCarrito).toHaveBeenCalledWith(productoBase.id);
  });

  it('llama a agregarAlCarrito al hacer clic en + del stepper', () => {
    mockCart = [{ producto: productoBase, cantidad: 1 }];
    render(<ProductoCard producto={productoBase} />);
    screen.getByRole('button', { name: /aumentar cantidad/i }).click();
    expect(mockAgregarAlCarrito).toHaveBeenCalledWith(productoBase);
  });

  it('navega al detalle al hacer clic en la card', () => {
    render(<ProductoCard producto={productoBase} />);
    const card = screen.getByText('Lavandina Concentrada').closest('div[role="link"]') as HTMLElement;
    expect(card).toBeInTheDocument();
    card.click();
    expect(mockNavigate).toHaveBeenCalledWith('/producto/test-1');
  });

  it('muestra overlay "Sin Stock" cuando no hay stock', () => {
    const sinStock = { ...productoBase, stock: false };
    render(<ProductoCard producto={sinStock} />);
    expect(screen.getByText('Sin Stock')).toBeInTheDocument();
  });

  it('deshabilita el botón cuando no hay stock', () => {
    const sinStock = { ...productoBase, stock: false };
    render(<ProductoCard producto={sinStock} />);
    const btn = screen.getByRole('button', { name: /agregar/i });
    expect(btn).toBeDisabled();
  });
});
