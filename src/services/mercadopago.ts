/**
 * Pre-integración con Mercado Pago
 *
 * Para activar:
 * 1. Instalar @mercadopago/sdk-react
 * 2. Configurar VITE_MP_PUBLIC_KEY en .env.local
 * 3. Configurar Webhook en Mercado Pago que apunte a un Cloud Function o backend
 * 4. Descomentar el código y conectar con el checkout
 */

export const MP_PUBLIC_KEY = import.meta.env.VITE_MP_PUBLIC_KEY || '';

export interface PreferenciaMP {
  items: Array<{
    title: string;
    quantity: number;
    unit_price: number;
    currency_id: 'ARS';
  }>;
  external_reference: string;
  notification_url?: string;
}

export const crearPreferencia = async (datos: PreferenciaMP): Promise<string | null> => {
  // TODO: Implementar cuando se configure el backend
  // const response = await fetch('/api/crear-preferencia', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(datos),
  // });
  // const data = await response.json();
  // return data.init_point;
  console.warn('Mercado Pago no configurado. Datos de preferencia:', datos);
  return null;
};
