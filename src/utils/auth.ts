const _hash = import.meta.env.VITE_HASH_CLAVE_MAESTRA;
if (!_hash) {
  throw new Error('VITE_HASH_CLAVE_MAESTRA no configurada en .env.local');
}
export const HASH_CLAVE_MAESTRA = _hash;

export const hashSHA256 = async (texto: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(texto);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};
