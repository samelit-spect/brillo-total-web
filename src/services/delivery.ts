import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

export interface ZonaDelivery {
  id: string;
  nombre: string;
  descripcion: string;
  costoEnvio: number;
  tiempoEstimado: string;
  activo: boolean;
}

export const obtenerZonasDelivery = async (): Promise<ZonaDelivery[]> => {
  try {
    const q = collection(db, 'zonasDeEntrega');
    const snapshot = await getDocs(q);
    return snapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() } as ZonaDelivery))
      .filter((z) => z.activo);
  } catch (error) {
    console.error('Error al obtener zonas de delivery:', error);
    return [];
  }
};
