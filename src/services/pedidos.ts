import { addDoc, collection, serverTimestamp } from "firebase/firestore";
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

export const guardarPedido = async (datos: DatosPedido): Promise<void> => {
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
