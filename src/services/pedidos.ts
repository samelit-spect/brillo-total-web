import { addDoc, collection, serverTimestamp, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "../firebase/config";

interface ItemPedido {
  nombre: string;
  presentacion: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}

interface DatosPedido {
  nombre: string;
  nota: string;
  esMayorista: boolean;
  items: ItemPedido[];
  total: number;
}

export interface PedidoGuardado {
  id: string;
  nombre: string;
  nota: string;
  esMayorista: boolean;
  items: ItemPedido[];
  total: number;
  sessionId: string;
  creadoEn: { seconds: number; nanoseconds: number } | null;
}

export const guardarPedido = async (datos: DatosPedido & { sessionId: string }): Promise<void> => {
  try {
    await addDoc(collection(db, "pedidos"), {
      ...datos,
      creadoEn: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error al guardar el pedido en Firestore:", error);
    throw error;
  }
};

export const obtenerPedidosPorSesion = async (sessionId: string): Promise<PedidoGuardado[]> => {
  try {
    const q = query(
      collection(db, "pedidos"),
      where("sessionId", "==", sessionId),
      orderBy("creadoEn", "desc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as PedidoGuardado));
  } catch (error) {
    console.error("Error al obtener pedidos:", error);
    return [];
  }
};
