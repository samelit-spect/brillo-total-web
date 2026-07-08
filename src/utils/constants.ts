export const YOUTUBE_URL = "";

export const WHATSAPP_NUMBER = '5493837402375';

export const UBICACION = {
  direccion: 'La Rioja Capital, Argentina',
  horarios: {
    semana: '08:00 a 13:00 - 17:00 a 21:00 hs',
    sabado: '09:00 a 13:00 hs',
  },
  instagram: 'brillototal.lr',
  facebook: 'brillototal.lr',
} as const;

export const CATEGORIAS = ['todos', 'hogar', 'automotor', 'insumos'];

export const CATEGORY_STYLES: Record<string, { color: string; bg: string; label: string; icon: string }> = {
  hogar: { color: '#16a34a', bg: '#dcfce7', label: 'Línea Hogar', icon: '🏡' },
  automotor: { color: '#2563eb', bg: '#dbeafe', label: 'Automotor', icon: '🚗' },
  insumos: { color: '#d97706', bg: '#fef3c7', label: 'Insumo', icon: '📦' },
};

export const formatearPrecio = (valor: number): string =>
  valor.toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
