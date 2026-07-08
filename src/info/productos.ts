// src/info/productos.ts

export interface Producto {
  id: string;
  nombre: string;
  descripcion: string;
  precioMinorista: number;
  precioMayorista: number;
  categoria: 'hogar' | 'automotor' | 'insumos';
  presentacion: string; 
  stock: boolean;
  imagenUrl: string;
}

// CATALOGO_PRUEBA eliminado — se usa Firestore como fuente de datos