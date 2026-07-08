import { describe, it, expect } from 'vitest';
import { formatearPrecio } from '../utils/constants';

describe('formatearPrecio', () => {
  it('should format a number with Argentine locale', () => {
    expect(formatearPrecio(1500)).toBe('1.500');
  });

  it('should handle small numbers', () => {
    expect(formatearPrecio(50)).toBe('50');
  });

  it('should handle large numbers', () => {
    expect(formatearPrecio(1000000)).toBe('1.000.000');
  });
});
