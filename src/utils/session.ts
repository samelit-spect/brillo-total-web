const SESSION_KEY = 'brillo-session-id';

function generarUUID(): string {
  return crypto.randomUUID();
}

export function obtenerSessionId(): string {
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) {
    id = generarUUID();
    localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}
