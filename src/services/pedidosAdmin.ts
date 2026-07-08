import { collection, getDocs, doc, updateDoc, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase/config';

export type EstadoPedido = 'pendiente' | 'confirmado' | 'preparando' | 'enviado' | 'entregado';

const ESTADOS_VALIDOS: EstadoPedido[] = ['pendiente', 'confirmado', 'preparando', 'enviado', 'entregado'];

export const ESTADOS_PEDIDO: Record<EstadoPedido, { label: string; color: string; bg: string }> = {
  pendiente: { label: 'Pendiente', color: '#92400e', bg: '#fef3c7' },
  confirmado: { label: 'Confirmado', color: '#1e40af', bg: '#dbeafe' },
  preparando: { label: 'Preparando', color: '#6b21a8', bg: '#f3e8ff' },
  enviado: { label: 'Enviado', color: '#15803d', bg: '#dcfce7' },
  entregado: { label: 'Entregado', color: '#166534', bg: '#bbf7d0' },
};

export const obtenerTodosLosPedidos = async () => {
  try {
    const q = query(collection(db, 'pedidos'), orderBy('creadoEn', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error al obtener todos los pedidos:', error);
    return [];
  }
};

export const actualizarEstadoPedido = async (pedidoId: string, estado: EstadoPedido) => {
  if (!ESTADOS_VALIDOS.includes(estado)) {
    throw new Error(`Estado inválido: ${estado}`);
  }
  try {
    const pedidoRef = doc(db, 'pedidos', pedidoId);
    await updateDoc(pedidoRef, { estado });
  } catch (error) {
    console.error('Error al actualizar estado del pedido:', error);
    throw error;
  }
};
