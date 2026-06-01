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

export const CATALOGO_PRUEBA: Producto[] = [
  {
    id: '1',
    nombre: 'Jabón Líquido (Tipo Ariel/Skip)',
    descripcion: 'Excelente poder de lavado y aroma duradero para ropa blanca y de color.',
    precioMinorista: 1500,
    precioMayorista: 1200,
    categoria: 'hogar',
    presentacion: 'Por Litro',
    stock: true,
    imagenUrl: 'https://via.placeholder.com/300'
  },
  {
    id: '2',
    nombre: 'Suavizante para Ropa',
    descripcion: 'Aroma premium que protege las fibras y deja tus prendas súper suaves.',
    precioMinorista: 1500,
    precioMayorista: 1200,
    categoria: 'hogar',
    presentacion: 'Por Litro',
    stock: true,
    imagenUrl: 'https://via.placeholder.com/300'
  },
  {
    id: '3',
    nombre: 'Detergente Concentrado',
    descripcion: 'Alto poder desengrasante para vajilla, rinde más con menos cantidad.',
    precioMinorista: 1600,
    precioMayorista: 1300,
    categoria: 'hogar',
    presentacion: 'Por Litro',
    stock: true,
    imagenUrl: 'https://via.placeholder.com/300'
  },
  {
    id: '4',
    nombre: 'Desinfectante de Pisos',
    descripcion: 'Limpieza profunda y fragancia persistente para todo tipo de ambientes.',
    precioMinorista: 1100,
    precioMayorista: 850,
    categoria: 'hogar',
    presentacion: 'Por Litro',
    stock: true,
    imagenUrl: 'https://via.placeholder.com/300'
  },
  {
    id: '5',
    nombre: 'Lavandina Tradicional',
    descripcion: 'Máxima pureza para desinfección de superficies y agua.',
    precioMinorista: 1100,
    precioMayorista: 850,
    categoria: 'hogar',
    presentacion: 'Por Litro',
    stock: true,
    imagenUrl: 'https://via.placeholder.com/300'
  },
  {
    id: '6',
    nombre: 'Cloro Líquido Pura Sangre',
    descripcion: 'Concentrado ideal para mantenimiento de piscinas y blanqueo profundo.',
    precioMinorista: 1800,
    precioMayorista: 1450,
    categoria: 'hogar',
    presentacion: 'Por Litro',
    stock: true,
    imagenUrl: 'https://via.placeholder.com/300'
  },
  {
    id: '7',
    nombre: 'Envase Plástico',
    descripcion: 'Bidón nuevo apto para el fraccionamiento de productos sueltos.',
    precioMinorista: 300,
    precioMayorista: 250,
    categoria: 'insumos',
    presentacion: 'Unidad',
    stock: true,
    imagenUrl: 'https://via.placeholder.com/300'
  }
];