export const HASH_CLAVE_MAESTRA = '1bf8dd02016b511c30a1b4368b45c64ddbd8e69f897ec1cb372a4288d6f5f31a';

export const hashSHA256 = async (texto: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(texto);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};
