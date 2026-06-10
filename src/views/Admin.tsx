// src/views/Admin.tsx
import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, getDocs, doc, updateDoc, addDoc } from 'firebase/firestore';
import { type Producto } from '../info/productos';

export const Admin: React.FC = () => {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [cargando, setCargando] = useState<boolean>(true);
    const [errorDb, setErrorDb] = useState<string | null>(null);

    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precioMinorista, setPrecioMinorista] = useState('');
    const [precioMayorista, setPrecioMayorista] = useState('');
    const [categoria, setCategoria] = useState<string>('hogar');
    const [presentacion, setPresentacion] = useState('Por Litro');

    const [idEnEdicion, setIdEnEdicion] = useState<string | null>(null);

    const obtenerProductos = async () => {
        try {
            setCargando(true);
            setErrorDb(null);
            const querySnapshot = await getDocs(collection(db, "productos"));
            const lista: Producto[] = [];

            querySnapshot.forEach((docSnap) => {
                lista.push({ id: docSnap.id, ...docSnap.data() } as Producto);
            });

            setProductos(lista);
        } catch (error: any) {
            console.error("Error al traer productos: ", error);
            setErrorDb(error.message || "No se pudo conectar con Firestore");
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        obtenerProductos();
    }, []);

    const conmutarStock = async (id: string, stockActual: boolean) => {
        try {
            const productoRef = doc(db, "productos", id);
            await updateDoc(productoRef, { stock: !stockActual });
            setProductos(prev => prev.map(p => p.id === id ? { ...p, stock: !stockActual } : p));
        } catch (error) {
            console.error("Error al cambiar stock: ", error);
            alert("No se pudo actualizar el stock en Firebase.");
        }
    };

    const activarEdicion = (producto: Producto) => {
        setIdEnEdicion(producto.id);
        setNombre(producto.nombre);
        setDescripcion(producto.descripcion || '');
        setPrecioMinorista(producto.precioMinorista.toString());
        setPrecioMayorista(producto.precioMayorista.toString());
        setCategoria(producto.categoria);
        setPresentacion(producto.presentacion || 'Por Litro');

        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const cancelarEdicion = () => {
        setIdEnEdicion(null);
        setNombre('');
        setDescripcion('');
        setPrecioMinorista('');
        setPrecioMayorista('');
        setCategoria('hogar');
        setPresentacion('Por Litro');
    };

    const manejarEnvio = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!nombre || !precioMinorista || !precioMayorista) {
            alert("Por favor completá los campos obligatorios (Nombre y Precios).");
            return;
        }

        const datosProducto = {
            nombre,
            descripcion,
            precioMinorista: Number(precioMinorista),
            precioMayorista: Number(precioMayorista),
            categoria,
            presentacion,
        };

        try {
            if (idEnEdicion) {
                const productoRef = doc(db, "productos", idEnEdicion);
                await updateDoc(productoRef, datosProducto);
                alert("✨ ¡Producto actualizado con éxito!");
            } else {
                await addDoc(collection(db, "productos"), {
                    ...datosProducto,
                    stock: true,
                    imagenUrl: 'https://via.placeholder.com/180'
                });
                alert("✅ ¡Producto creado con éxito!");
            }

            cancelarEdicion();
            obtenerProductos();
        } catch (error) {
            console.error("Error al guardar en Firebase: ", error);
            alert("Hubo un error al procesar la operación.");
        }
    };

    return (
        /* 📱 CONTENEDOR PRINCIPAL: Ahora usa porcentajes dinámicos y box-sizing para no desbordar */
        <div style={{ maxWidth: '950px', width: '100%', margin: '20px auto', padding: '0 10px', boxSizing: 'border-box' }}>

            {/* SECCIÓN 1: FORMULARIO RESPONSIVO */}
            <div style={{
                backgroundColor: '#ffffff',
                padding: '20px 15px', // Reducido para pantallas de celular
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                marginBottom: '25px',
                boxSizing: 'border-box'
            }}>
                <h2 style={{ marginTop: 0, fontSize: '20px', color: idEnEdicion ? '#3182ce' : '#2d3748' }}>
                    {idEnEdicion ? `✏️ Editando: ${nombre}` : '➕ Alta de Producto'}
                </h2>

                <form onSubmit={manejarEnvio} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px', color: '#4a5568' }}>Nombre del Producto *</label>
                        <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} style={styles.input} placeholder="Ej: Jabón Líquido Premium" />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px', color: '#4a5568' }}>Descripción</label>
                        <textarea value={descripcion} onChange={e => setDescripcion(e.target.value)} style={{ ...styles.input, minHeight: '60px', resize: 'vertical' }} placeholder="Detalles del producto..." />
                    </div>

                    <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                        <div style={{ flex: '1 1 140px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px', color: '#4a5568' }}>Precio Minorista ($) *</label>
                            <input type="number" value={precioMinorista} onChange={e => setPrecioMinorista(e.target.value)} style={styles.input} placeholder="Ej: 1500" />
                        </div>
                        <div style={{ flex: '1 1 140px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px', color: '#4a5568' }}>Precio Mayorista ($) *</label>
                            <input type="number" value={precioMayorista} onChange={e => setPrecioMayorista(e.target.value)} style={styles.input} placeholder="Ej: 1200" />
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                        <div style={{ flex: '1 1 140px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px', color: '#4a5568' }}>Categoría</label>
                            <select value={categoria} onChange={e => setCategoria(e.target.value)} style={styles.input}>
                                <option value="hogar">🏡 Línea Hogar</option>
                                <option value="automotor">🚗 Línea Automotor</option>
                                <option value="insumos">📦 Insumos</option>
                            </select>
                        </div>
                        <div style={{ flex: '1 1 140px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px', color: '#4a5568' }}>Presentación</label>
                            <input type="text" value={presentacion} onChange={e => setPresentacion(e.target.value)} style={styles.input} placeholder="Por Litro, Bidón 5L, etc." />
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                        <button type="submit" style={{ flex: 1, backgroundColor: idEnEdicion ? '#3182ce' : '#48bb78', color: '#fff', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>
                            {idEnEdicion ? '💾 Guardar Cambios' : '🚀 Registrar Producto'}
                        </button>

                        {idEnEdicion && (
                            <button type="button" onClick={cancelarEdicion} style={{ backgroundColor: '#e2e8f0', color: '#4a5568', border: 'none', padding: '12px 15px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>
                                Cancelar
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* SECCIÓN 2: TABLA DE INVENTARIO CONTROLADA */}
            <div style={{
                backgroundColor: '#ffffff',
                padding: '20px 15px', // Reducido para celulares
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                maxWidth: '100%', // Evita estirarse más de la pantalla
                boxSizing: 'border-box'
            }}>
                <h3 style={{ marginTop: 0, marginBottom: '15px', fontSize: '18px', color: '#2d3748' }}>📦 Inventario en Tiempo Real</h3>

                {cargando ? (
                    <p style={{ color: '#718096', textAlign: 'center' }}>Sincronizando con Firestore...</p>
                ) : errorDb ? (
                    <div style={{ color: '#e53e3e', textAlign: 'center', padding: '10px', border: '1px solid #fed7d7', borderRadius: '6px', backgroundColor: '#fff5f5' }}>
                        ⚠️ Error al conectar: {errorDb}
                    </div>
                ) : productos.length === 0 ? (
                    <p style={{ color: '#718096', textAlign: 'center' }}>No hay productos cargados.</p>
                ) : (
                    /* 🔥 EL SECRETO REPARADOR: Forzamos ancho máximo e inyectamos scroll controlado horizontal */
                    <div style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                        <table style={{ width: '100%', minWidth: '600px', borderCollapse: 'collapse', fontSize: '14px' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid #edf2f7', textAlign: 'left', color: '#4a5568' }}>
                                    <th style={{ padding: '12px 8px' }}>Producto</th>
                                    <th style={{ padding: '12px 8px' }}>Precios (Min / May)</th>
                                    <th style={{ padding: '12px 8px', textAlign: 'center' }}>Stock</th>
                                    <th style={{ padding: '12px 8px', textAlign: 'right' }}>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productos.map((prod) => (
                                    <tr key={prod.id} style={{ borderBottom: '1px solid #edf2f7', backgroundColor: idEnEdicion === prod.id ? '#ebf8ff' : 'transparent' }}>
                                        <td style={{ padding: '12px 8px', fontWeight: '500', color: '#1a202c' }}>
                                            {prod.nombre} <span style={{ fontSize: '12px', color: '#718096', display: 'block' }}>({prod.presentacion})</span>
                                        </td>
                                        <td style={{ padding: '12px 8px', color: '#2d3748', whiteSpace: 'nowrap' }}>
                                            <span style={{ fontWeight: 'bold', color: '#2b6cb0' }}>${prod.precioMinorista}</span> /
                                            <span style={{ color: '#38a169', marginLeft: '4px' }}>${prod.precioMayorista}</span>
                                        </td>
                                        <td style={{ padding: '12px 8px', textAlign: 'center' }}>
                                            <button
                                                onClick={() => conmutarStock(prod.id, prod.stock)}
                                                style={{
                                                    backgroundColor: prod.stock ? '#e6fffa' : '#fff5f5',
                                                    color: prod.stock ? '#319795' : '#e53e3e',
                                                    border: `1px solid ${prod.stock ? '#b2f5ea' : '#fed7d7'}`,
                                                    padding: '4px 10px',
                                                    borderRadius: '20px',
                                                    fontSize: '12px',
                                                    fontWeight: 'bold',
                                                    cursor: 'pointer',
                                                    whiteSpace: 'nowrap',
                                                    transition: 'all 0.2s'
                                                }}
                                            >
                                                {prod.stock ? '🟢 Disp.' : '🔴 Sin Stk'}
                                            </button>
                                        </td>
                                        <td style={{ padding: '12px 8px', textAlign: 'right' }}>
                                            <button
                                                onClick={() => activarEdicion(prod)}
                                                style={{ backgroundColor: '#edf2f7', color: '#2b6cb0', border: 'none', padding: '6px 12px', borderRadius: '4px', fontWeight: '500', cursor: 'pointer', whiteSpace: 'nowrap' }}
                                            >
                                                ✏️ Editar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

        </div>
    );
};

const styles = {
    input: {
        width: '100%',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #cbd5e0',
        backgroundColor: '#ffffff',
        color: '#1a202c',
        boxSizing: 'border-box' as const,
        fontSize: '14px'
    }
};