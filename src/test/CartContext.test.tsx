import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { CartProvider } from '../context/CartContext';
import { useCart } from '../hooks/useCart';
import type { Producto } from '../info/productos';

vi.mock('../firebase/config', () => ({
  auth: {},
  db: {},
  storage: {},
}));

vi.mock('firebase/auth', () => ({
  signInAnonymously: vi.fn(() => Promise.resolve()),
}));

const productoA: Producto = {
  id: 'prod-a',
  nombre: 'Detergente',
  descripcion: 'Detergente lavavajillas',
  precioMinorista: 400,
  precioMayorista: 280,
  categoria: 'hogar',
  presentacion: 'Por litro',
  stock: true,
  imagenUrl: '',
};

const productoB: Producto = {
  id: 'prod-b',
  nombre: 'Cera para autos',
  descripcion: 'Cera líquida',
  precioMinorista: 1200,
  precioMayorista: 900,
  categoria: 'automotor',
  presentacion: '500ml',
  stock: true,
  imagenUrl: '',
};

function TestConsumer() {
  const {
    cart,
    agregarAlCarrito,
    removerDelCarrito,
    vaciarCarrito,
    obtenerTotal,
    obtenerCantidadTotal,
    esMayorista,
    setEsMayorista,
  } = useCart();

  return (
    <div>
      <span data-testid="cart-count">{cart.length}</span>
      <span data-testid="total-items">{obtenerCantidadTotal()}</span>
      <span data-testid="total-price">{obtenerTotal()}</span>
      <span data-testid="mayorista">{esMayorista ? 'true' : 'false'}</span>
      <ul data-testid="cart-items">
        {cart.map((item) => (
          <li key={item.producto.id} data-testid={`item-${item.producto.id}`}>
            {item.producto.nombre} x{item.cantidad}
          </li>
        ))}
      </ul>
      <button data-testid="add-a" onClick={() => agregarAlCarrito(productoA)}>Agregar A</button>
      <button data-testid="add-b" onClick={() => agregarAlCarrito(productoB)}>Agregar B</button>
      <button data-testid="remove-a" onClick={() => removerDelCarrito('prod-a')}>Remover A</button>
      <button data-testid="vaciar" onClick={() => vaciarCarrito()}>Vaciar</button>
      <button data-testid="toggle-mayorista" onClick={() => setEsMayorista(true)}>Mayorista</button>
    </div>
  );
}

function renderWithCart() {
  return render(
    <CartProvider>
      <TestConsumer />
    </CartProvider>
  );
}

describe('CartContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('comienza con el carrito vacío', () => {
    renderWithCart();
    expect(screen.getByTestId('cart-count').textContent).toBe('0');
    expect(screen.getByTestId('total-items').textContent).toBe('0');
    expect(screen.getByTestId('total-price').textContent).toBe('0');
  });

  it('agrega un producto al carrito', async () => {
    renderWithCart();
    screen.getByTestId('add-a').click();
    await waitFor(() => {
      expect(screen.getByTestId('cart-count').textContent).toBe('1');
    });
    expect(screen.getByTestId('total-items').textContent).toBe('1');
  });

  it('incrementa cantidad al agregar el mismo producto', async () => {
    renderWithCart();
    screen.getByTestId('add-a').click();
    screen.getByTestId('add-a').click();
    screen.getByTestId('add-a').click();
    await waitFor(() => {
      expect(screen.getByTestId('total-items').textContent).toBe('3');
    });
    expect(screen.getByTestId('cart-count').textContent).toBe('1');
    expect(screen.getByText('Detergente x3')).toBeInTheDocument();
  });

  it('agrega múltiples productos distintos', async () => {
    renderWithCart();
    screen.getByTestId('add-a').click();
    screen.getByTestId('add-b').click();
    await waitFor(() => {
      expect(screen.getByTestId('cart-count').textContent).toBe('2');
    });
    expect(screen.getByTestId('total-items').textContent).toBe('2');
  });

  it('remueve una unidad del producto', async () => {
    renderWithCart();
    screen.getByTestId('add-a').click();
    screen.getByTestId('add-a').click();
    screen.getByTestId('remove-a').click();
    await waitFor(() => {
      expect(screen.getByText('Detergente x1')).toBeInTheDocument();
    });
    expect(screen.getByTestId('cart-count').textContent).toBe('1');
  });

  it('elimina el producto del carrito cuando la cantidad llega a 0', async () => {
    renderWithCart();
    screen.getByTestId('add-a').click();
    screen.getByTestId('remove-a').click();
    await waitFor(() => {
      expect(screen.getByTestId('cart-count').textContent).toBe('0');
    });
    expect(screen.queryByText('Detergente')).not.toBeInTheDocument();
  });

  it('calcula el total correctamente en modo minorista', async () => {
    renderWithCart();
    screen.getByTestId('add-a').click();
    screen.getByTestId('add-a').click();
    screen.getByTestId('add-b').click();
    await waitFor(() => {
      expect(screen.getByTestId('total-price').textContent).toBe((400 * 2 + 1200).toString());
    });
  });

  it('calcula el total correctamente en modo mayorista', async () => {
    renderWithCart();
    screen.getByTestId('add-a').click();
    screen.getByTestId('add-b').click();
    screen.getByTestId('toggle-mayorista').click();
    await waitFor(() => {
      expect(screen.getByTestId('mayorista').textContent).toBe('true');
    });
    expect(screen.getByTestId('total-price').textContent).toBe((280 + 900).toString());
  });

  it('vacía el carrito completamente', async () => {
    renderWithCart();
    screen.getByTestId('add-a').click();
    screen.getByTestId('add-b').click();
    screen.getByTestId('vaciar').click();
    await waitFor(() => {
      expect(screen.getByTestId('cart-count').textContent).toBe('0');
    });
  });
});
