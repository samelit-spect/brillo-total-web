// src/views/Admin.tsx
import React, { useState, useEffect, useRef } from 'react';
import { db, storage, auth } from '../firebase/config';
import { signInAnonymously, signOut } from 'firebase/auth';
import { collection, doc, updateDoc, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { type Producto } from '../info/productos';
import { obtenerProductos } from '../services/productos';
import { hashSHA256, HASH_CLAVE_MAESTRA } from '../utils/auth';
import { formatearPrecio } from '../utils/constants';

export const Admin: React.FC = () => {
    const [autenticado, setAutenticado] = useState(false);
    const [claveIngresada, setClaveIngresada] = useState('');
    const [errorClave, setErrorClave] = useState('');
    const [verificando, setVerificando] = useState(false);
    const [intentosFallidos, setIntentosFallidos] = useState(0);
    const [bloqueado, setBloqueado] = useState(false);
    const [segundosRestantes, setSegundosRestantes] = useState(0);
    const bloqueadoHastaRef = useRef<number | null>(null);

    const [productos, setProductos] = useState<Producto[]>([]);
    const [cargando, setCargando] = useState<boolean>(true);
    const [errorDb, setErrorDb] = useState<string | null>(null);

    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precioMinorista, setPrecioMinorista] = useState('');
    const [precioMayorista, setPrecioMayorista] = useState('');
    const [categoria, setCategoria] = useState<string>('hogar');
    const [presentacion, setPresentacion] = useState('Por Litro');
    const [imagenUrl, setImagenUrl] = useState('');
    const [subiendoImagen, setSubiendoImagen] = useState(false);
    const [errorAuthFirebase, setErrorAuthFirebase] = useState<string | null>(null);

    const [idEnEdicion, setIdEnEdicion] = useState<string | null>(null);

    // Activa bloqueo cuando se superan los intentos
    useEffect(() => {
        if (intentosFallidos >= 5) {
            const espera = Math.min(60, Math.pow(2, intentosFallidos - 5) * 10);
            bloqueadoHastaRef.current = espera * 1000;
            const t1 = setTimeout(() => setBloqueado(true), 0);
            const t2 = setTimeout(() => setSegundosRestantes(espera), 0);
            return () => { clearTimeout(t1); clearTimeout(t2); };
        }
    }, [intentosFallidos]);

    // Efecto de cuenta regresiva para el bloqueo
    useEffect(() => {
        if (!bloqueado) return;
        const inicio = Date.now();
        const duracion = bloqueadoHastaRef.current || 0;
        const intervalo = setInterval(() => {
            const transcurrido = Date.now() - inicio;
            const restantes = Math.max(0, Math.ceil((duracion - transcurrido) / 1000));
            setSegundosRestantes(restantes);
            if (restantes <= 0) {
                setBloqueado(false);
                setIntentosFallidos(0);
            }
        }, 1000);
        return () => clearInterval(intervalo);
    }, [bloqueado]);

    const manejarLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!claveIngresada.trim()) {
            setErrorClave('Debe ingresar la clave de administrador.');
            return;
        }
        if (bloqueado) {
            setErrorClave(`Demasiados intentos. Esperá ${segundosRestantes}s para reintentar.`);
            return;
        }
        setVerificando(true);
        setErrorClave('');
        try {
            const hash = await hashSHA256(claveIngresada);
            if (hash === HASH_CLAVE_MAESTRA) {
                setAutenticado(true);
                setIntentosFallidos(0);
                setBloqueado(false);
                setSegundosRestantes(0);
                setErrorClave('');
                try {
                    await signInAnonymously(auth);
                    setErrorAuthFirebase(null);
                } catch (authErr) {
                    console.error("Error al autenticar anónimamente en Firebase:", authErr);
                    setErrorAuthFirebase("No se pudo autenticar con Firebase. Verificá que la autenticación anónima esté habilitada en Firebase Console.");
                }
                cargarProductos();
            } else {
                const nuevos = intentosFallidos + 1;
                setIntentosFallidos(nuevos);
                if (nuevos >= 5) {
                    setErrorClave(`Clave incorrecta. Demasiados intentos.`);
                } else {
                    setErrorClave(`Clave incorrecta. Intento ${nuevos}/5.`);
                }
            }
        } catch {
            setErrorClave('Error al verificar la clave.');
        } finally {
            setVerificando(false);
        }
    };

    const cargarProductos = async () => {
        try {
            setCargando(true);
            setErrorDb(null);
            const lista = await obtenerProductos();
            setProductos(lista);
        } catch (error) {
            console.error("Error al traer productos: ", error);
            const err = error as { code?: string };
            if (err.code === 'permission-denied') {
                setErrorDb("Error de permisos: las reglas de Firestore no permiten la lectura.");
            } else if (err.code === 'unavailable' || err.code === 'deadline-exceeded') {
                setErrorDb("No se pudo conectar con la base de datos. Verificá tu conexión a internet.");
            } else {
                setErrorDb("Error inesperado al cargar los productos.");
            }
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
        setImagenUrl(producto.imagenUrl || '');
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
        setImagenUrl('');
    };

    const manejarEnvio = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!nombre || !precioMinorista || !precioMayorista) {
            alert("Por favor completá los campos obligatorios (Nombre y Precios).");
            return;
        }

        const min = Number(precioMinorista);
        const may = Number(precioMayorista);
        if (isNaN(min) || isNaN(may) || min <= 0 || may <= 0) {
            alert("Los precios deben ser números válidos mayores a cero.");
            return;
        }

        const datosProducto: Record<string, unknown> = {
            nombre,
            descripcion,
            precioMinorista: min,
            precioMayorista: may,
            categoria,
            presentacion,
            imagenUrl: imagenUrl.trim() || 'https://via.placeholder.com/180',
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
                });
                alert("✅ ¡Producto creado con éxito!");
            }

            cancelarEdicion();
            cargarProductos();
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
                            disabled={bloqueado}
                            style={{
                                width: '100%', padding: '12px', borderRadius: '6px',
                                border: `1px solid ${errorClave ? 'var(--color-danger)' : 'var(--color-border)'}`,
                                boxSizing: 'border-box', fontSize: '15px',
                                opacity: bloqueado ? 0.6 : 1
                            }}
                        />
                        {errorClave && (
                            <p style={{ color: 'var(--color-danger)', fontSize: '13px', margin: 0 }}>{errorClave}</p>
                        )}
                        <button
                            type="submit"
                            disabled={verificando || bloqueado}
                            style={{
                                width: '100%', backgroundColor: 'var(--color-primary)', color: '#fff',
                                border: 'none', padding: '12px', borderRadius: '6px',
                                fontWeight: 'bold', fontSize: '15px', cursor: 'pointer',
                                opacity: (verificando || bloqueado) ? 0.7 : 1
                            }}
                        >
                            {verificando ? 'Verificando...' : bloqueado ? `⏳ Bloqueado (${segundosRestantes}s)` : 'Ingresar'}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    const cerrarSesion = async () => {
        try {
            await signOut(auth);
        } catch (e) {
            console.error("Error al cerrar sesión:", e);
        }
        setAutenticado(false);
        setClaveIngresada('');
        cancelarEdicion();
    };

    return (
        <div style={{ width: '100%', maxWidth: '900px', margin: '0 auto', padding: '15px', boxSizing: 'border-box' }}>
            {errorAuthFirebase && (
                <div style={{ color: 'var(--color-danger)', textAlign: 'center', padding: '10px', border: '1px solid #fed7d7', borderRadius: '6px', backgroundColor: '#fff5f5', marginBottom: '15px' }}>
                    ⚠️ {errorAuthFirebase}
                </div>
            )}

            {/* SECCIÓN 1: FORMULARIO ULTRA-RESPONSIVO (GRID AUTOMÁTICO) */}
            <div style={{ backgroundColor: 'var(--color-bg-card)', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', marginBottom: '25px', boxSizing: 'border-box' }}>
                <h2 style={{ marginTop: 0, fontSize: '20px', color: idEnEdicion ? 'var(--color-primary)' : 'var(--color-text)', marginBottom: '20px' }}>
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

                    {/* URL de la imagen + subir archivo + previsualización */}
                    <div style={{ width: '100%' }}>
                        <label style={styles.label}>Imagen del Producto</label>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                            <div style={{ flex: '1 1 240px', display: 'flex', gap: '8px' }}>
                                <input
                                    type="text"
                                    value={imagenUrl}
                                    onChange={e => setImagenUrl(e.target.value)}
                                    style={{ ...styles.input, flex: '1' }}
                                    placeholder="https://ejemplo.com/imagen.jpg"
                                />
                                <button
                                    type="button"
                                    onClick={() => document.getElementById('input-imagen')?.click()}
                                    disabled={subiendoImagen}
                                    style={{
                                        padding: '11px 14px', borderRadius: '6px', border: '1px solid var(--color-border)',
                                        backgroundColor: 'var(--color-bg-card)', cursor: subiendoImagen ? 'not-allowed' : 'pointer',
                                        fontSize: '18px', lineHeight: 1, flexShrink: 0, opacity: subiendoImagen ? 0.6 : 1
                                    }}
                                    title={subiendoImagen ? 'Subiendo...' : 'Subir imagen del dispositivo'}
                                >
                                    {subiendoImagen ? '⏳' : '📁'}
                                </button>
                            </div>
                            {imagenUrl.trim() && (
                                <div style={{
                                    width: '60px', height: '60px', borderRadius: '8px', overflow: 'hidden',
                                    border: '1px solid var(--color-border)', flexShrink: 0,
                                    backgroundColor: '#f8f8f8', display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <img
                                        src={imagenUrl.trim()}
                                        alt="Preview"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                    />
                                </div>
                            )}
                        </div>
                        <input
                            id="input-imagen"
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                setSubiendoImagen(true);
                                try {
                                    const ext = file.name.split('.').pop() || 'jpg';
                                    const nombreArchivo = `productos/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
                                    const storageRef = ref(storage, nombreArchivo);
                                    const snapshot = await uploadBytes(storageRef, file);
                                    const url = await getDownloadURL(snapshot.ref);
                                    setImagenUrl(url);
                                } catch (error) {
                                    console.error("Error al subir imagen: ", error);
                                    alert("Error al subir la imagen. Verificá que Firebase Storage esté configurado.");
                                } finally {
                                    setSubiendoImagen(false);
                                    e.target.value = '';
                                }
                            }}
                        />
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '15px' }}>
                    <h3 style={{ margin: 0, fontSize: '18px', color: 'var(--color-text)' }}>📦 Inventario en Tiempo Real</h3>
                    <button onClick={cerrarSesion} style={{ backgroundColor: 'transparent', color: 'var(--color-danger)', border: '1px solid var(--color-danger)', padding: '5px 12px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', fontWeight: 'bold' }}>
                        🔒 Cerrar Sesión
                    </button>
                </div>

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
                                className="card-hover"
                                style={{
                                    backgroundColor: idEnEdicion === prod.id ? '#ebf8ff' : 'var(--color-bg-card)',
                                    padding: '15px',
                                    borderRadius: '8px',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
                                    border: idEnEdicion === prod.id ? '1px solid var(--color-primary-light)' : '1px solid var(--color-border-light)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '8px',
                                    boxSizing: 'border-box',
                                    width: '100%'
                                }}
                            >
                                {/* Fila superior: Nombre y Presentación */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '5px' }}>
                                    <span style={{ fontWeight: 'bold', color: 'var(--color-text)', fontSize: '15px' }}>{prod.nombre}</span>
                                    <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)', backgroundColor: 'var(--color-border-light)', padding: '2px 8px', borderRadius: '4px' }}>
                                        {prod.presentacion || 'Por Litro'}
                                    </span>
                                </div>

                                {/* Fila media: Precios */}
                                <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', padding: '4px 0' }}>
                                    <span>Min: <strong style={{ color: 'var(--color-primary-dark)' }}>${formatearPrecio(prod.precioMinorista)}</strong></span>
                                    <span style={{ margin: '0 10px', color: 'var(--color-border)' }}>|</span>
                                    <span>May: <strong style={{ color: 'var(--color-success-dark)' }}>${formatearPrecio(prod.precioMayorista)}</strong></span>
                                </div>

                                {/* Fila inferior: Acciones de Stock y Edición (Hacen wrap si no entran) */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '5px', flexWrap: 'wrap', gap: '10px' }}>
                                    <button
                                        onClick={() => conmutarStock(prod.id, prod.stock)}
                                        style={{
                                            backgroundColor: prod.stock ? '#e6fffa' : '#fff5f5',
                                            color: prod.stock ? 'var(--color-success-dark)' : 'var(--color-danger)',
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
                                            backgroundColor: 'var(--color-border-light)',
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
        color: 'var(--color-text)',
        boxSizing: 'border-box' as const,
        fontSize: '14px'
    }
};
