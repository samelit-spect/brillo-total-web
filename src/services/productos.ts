import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { type Producto } from '../info/productos';

export const obtenerProductos = async (): Promise<Producto[]> => {
  const querySnapshot = await getDocs(collection(db, "productos"));
  const lista: Producto[] = [];
  querySnapshot.forEach((doc) => {
    lista.push({ id: doc.id, ...doc.data() } as Producto);
  });
  return lista;
};
