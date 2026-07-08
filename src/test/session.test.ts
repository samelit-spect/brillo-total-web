import { describe, it, expect, beforeEach } from 'vitest';
import { obtenerSessionId } from '../utils/session';

describe('obtenerSessionId', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('genera un ID si no existe en localStorage', () => {
    const id = obtenerSessionId();
    expect(id).toBeTruthy();
    expect(typeof id).toBe('string');
    expect(id.length).toBeGreaterThan(0);
  });

  it('retorna el mismo ID en llamadas sucesivas', () => {
    const primera = obtenerSessionId();
    const segunda = obtenerSessionId();
    expect(segunda).toBe(primera);
  });

  it('persiste el ID en localStorage', () => {
    const id = obtenerSessionId();
    const guardado = localStorage.getItem('brillo-session-id');
    expect(guardado).toBe(id);
  });

  it('usa el ID existente si ya está guardado', () => {
    localStorage.setItem('brillo-session-id', 'mi-id-fijo');
    expect(obtenerSessionId()).toBe('mi-id-fijo');
  });
});
