// src/views/Admin.tsx
import React, { useState } from 'react';
import { db } from '../firebase/config';
import { collection, getDocs, doc, updateDoc, addDoc } from 'firebase/firestore';
import { type Producto } from '../info/productos';
import { hashSHA256, HASH_CLAVE_MAESTRA } from '../utils/auth';

export const Admin: React.FC = () => {
    const [autenticado, setAutenticado] = useState(false);
    const [claveIngresada, setClaveIngresada] = useState('');
    const [errorClave, setErrorClave] = useState('');
    const [verificando, setVerificando] = useState(false);

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

    const manejarLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!claveIngresada.trim()) {
            setErrorClave('Debe ingresar la clave de administrador.');
            return;
        }
        setVerificando(true);
        setErrorClave('');
        try {
            const hash = await hashSHA256(claveIngresada);
            if (hash === HASH_CLAVE_MAESTRA) {
                setAutenticado(true);
                obtenerProductos();
            } else {
                setErrorClave('Clave incorrecta. Acceso denegado.');
            }
        } catch {
            setErrorClave('Error al verificar la clave.');
        } finally {
            setVerificando(false);
        }
    };

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
        } catch (error) {
            console.error("Error al traer productos: ", error);
            setErrorDb("No se pudo conectar con la base de datos.");
        } finally {
            setCargando(false);
        }
    };

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

    if (!autenticado) {
        return (
            <div style={{
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                minHeight: '60vh', padding: '20px', boxSizing: 'border-box'
            }}>
                <div style={{
                    backgroundColor: 'var(--color-bg-card)', padding: '35px', borderRadius: '12px',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.05)', width: '100%', maxWidth: '400px',
                    boxSizing: 'border-box'
                }}>
                    <h2 style={{ margin: '0 0 8px 0', textAlign: 'center', color: 'var(--color-navy)', fontSize: '22px' }}>
                        🔐 Acceso Administrador
                    </h2>
                    <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)', fontSize: '14px', marginBottom: '25px' }}>
                        Ingresá la clave maestra para administrar el catálogo.
                    </p>
                    <form onSubmit={manejarLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <input
                            type="password"
                            value={claveIngresada}
                            onChange={(e) => { setClaveIngresada(e.target.value); setErrorClave(''); }}
                            placeholder="Clave maestra"
                            autoFocus
                            style={{
                                width: '100%', padding: '12px', borderRadius: '6px',
                                border: `1px solid ${errorClave ? 'var(--color-danger)' : 'var(--color-border)'}`,
                                boxSizing: 'border-box', fontSize: '15px'
                            }}
                        />
                        {errorClave && (
                            <p style={{ color: 'var(--color-danger)', fontSize: '13px', margin: 0 }}>{errorClave}</p>
                        )}
                        <button
                            type="submit"
                            disabled={verificando}
                            style={{
                                width: '100%', backgroundColor: 'var(--color-primary)', color: '#fff',
                                border: 'none', padding: '12px', borderRadius: '6px',
                                fontWeight: 'bold', fontSize: '15px', cursor: 'pointer',
                                opacity: verificando ? 0.7 : 1
                            }}
                        >
                            {verificando ? 'Verificando...' : 'Ingresar'}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div style={{ width: '100%', maxWidth: '900px', margin: '0 auto', padding: '15px', boxSizing: 'border-box' }}>

            {/* SECCIÓN 1: FORMULARIO ULTRA-RESPONSIVO (GRID AUTOMÁTICO) */}
            <div style={{ backgroundColor: 'var(--color-bg-card)', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', marginBottom: '25px', boxSizing: 'border-box' }}>
                <h2 style={{ marginTop: 0, fontSize: '20px', color: idEnEdicion ? 'var(--color-primary)' : '#2d3748', marginBottom: '20px' }}>
                    {idEnEdicion ? `✏️ Editando: ${nombre}` : '➕ Alta de Producto'}
                </h2>

                <form onSubmit={manejarEnvio} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div style={{ width: '100%' }}>
                        <label style={styles.label}>Nombre del Producto *</label>
                        <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} style={styles.input} placeholder="Ej: Jabón Líquido Premium" />
                    </div>

                    <div style={{ width: '100%' }}>
                        <label style={styles.label}>Descripción</label>
                        <textarea value={descripcion} onChange={e => setDescripcion(e.target.value)} style={{ ...styles.input, minHeight: '60px' }} placeholder="Detalles del producto..." />
                    </div>

                    {/* CSS Grid adaptativo: 1 columna en celus, 2 en pantallas más grandes */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                        gap: '15px',
                        width: '100%'
                    }}>
                        <div>
                            <label style={styles.label}>Precio Minorista ($) *</label>
                            <input type="number" value={precioMinorista} onChange={e => setPrecioMinorista(e.target.value)} style={styles.input} placeholder="Ej: 1500" />
                        </div>
                        <div>
                            <label style={styles.label}>Precio Mayorista ($) *</label>
                            <input type="number" value={precioMayorista} onChange={e => setPrecioMayorista(e.target.value)} style={styles.input} placeholder="Ej: 1200" />
                        </div>
                        <div>
                            <label style={styles.label}>Categoría</label>
                            <select value={categoria} onChange={e => setCategoria(e.target.value)} style={styles.input}>
                                <option value="hogar">🏡 Línea Hogar</option>
                                <option value="automotor">🚗 Línea Automotor</option>
                                <option value="insumos">📦 Insumos</option>
                            </select>
                        </div>
                        <div>
                            <label style={styles.label}>Presentación</label>
                            <input type="text" value={presentacion} onChange={e => setPresentacion(e.target.value)} style={styles.input} placeholder="Por Litro, Bidón 5L, etc." />
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px', flexWrap: 'wrap' }}>
                        <button type="submit" style={{ flex: '1 1 180px', backgroundColor: idEnEdicion ? 'var(--color-primary)' : 'var(--color-success)', color: '#fff', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                            {idEnEdicion ? '💾 Guardar Cambios' : '🚀 Registrar Producto'}
                        </button>
                        {idEnEdicion && (
                            <button type="button" onClick={cancelarEdicion} style={{ flex: '1 1 100px', backgroundColor: 'var(--color-border-light)', color: 'var(--color-text-secondary)', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                                Cancelar
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* SECCIÓN 2: LISTADO DE INVENTARIO EN TARJETAS PARA CELULAR */}
            <div>
                <h3 style={{ marginTop: 0, marginBottom: '15px', fontSize: '18px', color: '#2d3748' }}>📦 Inventario en Tiempo Real</h3>

                {cargando ? (
                    <p style={{ color: 'var(--color-text-secondary)', textAlign: 'center' }}>Sincronizando con Firestore...</p>
                ) : errorDb ? (
                    <div style={{ color: 'var(--color-danger)', textAlign: 'center', padding: '10px', border: '1px solid #fed7d7', borderRadius: '6px', backgroundColor: '#fff5f5' }}>
                        ⚠️ {errorDb}
                    </div>
                ) : productos.length === 0 ? (
                    <p style={{ color: 'var(--color-text-secondary)', textAlign: 'center' }}>No hay productos cargados.</p>
                ) : (
                    /* Contenedor Flex que acumula tarjetas ordenadas verticales */
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
                        {productos.map((prod) => (
                            <div
                                key={prod.id}
                                style={{
                                    backgroundColor: idEnEdicion === prod.id ? '#ebf8ff' : 'var(--color-bg-card)',
                                    padding: '15px',
                                    borderRadius: '8px',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
                                    border: idEnEdicion === prod.id ? '1px solid var(--color-primary-light)' : '1px solid #edf2f7',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '8px',
                                    boxSizing: 'border-box',
                                    width: '100%'
                                }}
                            >
                                {/* Fila superior: Nombre y Presentación */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '5px' }}>
                                    <span style={{ fontWeight: 'bold', color: 'var(--color-footer-bg)', fontSize: '15px' }}>{prod.nombre}</span>
                                    <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)', backgroundColor: '#edf2f7', padding: '2px 8px', borderRadius: '4px' }}>
                                        {prod.presentacion || 'Por Litro'}
                                    </span>
                                </div>

                                {/* Fila media: Precios */}
                                <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', padding: '4px 0' }}>
                                    <span>Min: <strong style={{ color: 'var(--color-primary-dark)' }}>${prod.precioMinorista}</strong></span>
                                    <span style={{ margin: '0 10px', color: 'var(--color-border)' }}>|</span>
                                    <span>May: <strong style={{ color: 'var(--color-success-dark)' }}>${prod.precioMayorista}</strong></span>
                                </div>

                                {/* Fila inferior: Acciones de Stock y Edición (Hacen wrap si no entran) */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '5px', flexWrap: 'wrap', gap: '10px' }}>
                                    <button
                                        onClick={() => conmutarStock(prod.id, prod.stock)}
                                        style={{
                                            backgroundColor: prod.stock ? '#e6fffa' : '#fff5f5',
                                            color: prod.stock ? '#319795' : 'var(--color-danger)',
                                            border: `1px solid ${prod.stock ? '#b2f5ea' : '#fed7d7'}`,
                                            padding: '6px 12px',
                                            borderRadius: '20px',
                                            fontSize: '12px',
                                            fontWeight: 'bold',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {prod.stock ? '🟢 Disponible' : '🔴 Sin Stock'}
                                    </button>

                                    <button
                                        onClick={() => activarEdicion(prod)}
                                        style={{
                                            backgroundColor: '#edf2f7',
                                            color: 'var(--color-primary-dark)',
                                            border: 'none',
                                            padding: '6px 16px',
                                            borderRadius: '6px',
                                            fontWeight: 'bold',
                                            fontSize: '12px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        ✏️ Editar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
};

const styles = {
    label: {
        display: 'block',
        marginBottom: '5px',
        fontWeight: 'bold' as const,
        fontSize: '14px',
        color: 'var(--color-text-secondary)'
    },
    input: {
        width: '100%',
        padding: '11px',
        borderRadius: '6px',
        border: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-bg-card)',
        color: 'var(--color-footer-bg)',
        boxSizing: 'border-box' as const,
        fontSize: '14px'
    }
};
