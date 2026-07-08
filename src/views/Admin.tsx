import React, { useState, useEffect, useRef } from 'react';
import { db, storage, auth } from '../firebase/config';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { collection, doc, updateDoc, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { type Producto } from '../info/productos';
import { obtenerProductos } from '../services/productos';
import { hashSHA256, HASH_CLAVE_MAESTRA } from '../utils/auth';
import { formatearPrecio } from '../utils/constants';

export const Admin: React.FC = () => {
    const [autenticado, setAutenticado] = useState(false);
    const [claveIngresada, setClaveIngresada] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
    const [guardando, setGuardando] = useState(false);
    const [toast, setToast] = useState<{ mensaje: string; tipo: 'exito' | 'error' } | null>(null);

    const mostrarToast = (mensaje: string, tipo: 'exito' | 'error') => {
        setToast({ mensaje, tipo });
        setTimeout(() => setToast(null), 3000);
    };

    const [idEnEdicion, setIdEnEdicion] = useState<string | null>(null);

    useEffect(() => {
        if (intentosFallidos >= 5) {
            const espera = Math.min(60, Math.pow(2, intentosFallidos - 5) * 10);
            bloqueadoHastaRef.current = espera * 1000;
            const t1 = setTimeout(() => setBloqueado(true), 0);
            const t2 = setTimeout(() => setSegundosRestantes(espera), 0);
            return () => { clearTimeout(t1); clearTimeout(t2); };
        }
    }, [intentosFallidos]);

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
        if (!email.trim() || !password.trim()) {
            setErrorClave('Ingresá email y contraseña.');
            return;
        }
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
        setErrorAuthFirebase(null);
        try {
            const hash = await hashSHA256(claveIngresada);
            if (hash !== HASH_CLAVE_MAESTRA) {
                const nuevos = intentosFallidos + 1;
                setIntentosFallidos(nuevos);
                setErrorClave(nuevos >= 5 ? `Clave incorrecta. Demasiados intentos.` : `Clave incorrecta. Intento ${nuevos}/5.`);
                return;
            }
            setIntentosFallidos(0);
            setBloqueado(false);
            setSegundosRestantes(0);
            setErrorClave('');
            await signInWithEmailAndPassword(auth, email, password);
            setAutenticado(true);
            setErrorAuthFirebase(null);
            cargarProductos();
        } catch (err) {
            console.error("Error de autenticación:", err);
            const fbErr = err as { code?: string };
            if (fbErr.code === 'auth/user-not-found' || fbErr.code === 'auth/wrong-password' || fbErr.code === 'auth/invalid-credential') {
                setErrorClave('Email o contraseña incorrectos.');
            } else if (fbErr.code === 'auth/too-many-requests') {
                setErrorClave('Demasiados intentos. Esperá un momento antes de reintentar.');
            } else if (fbErr.code === 'auth/invalid-email') {
                setErrorClave('El formato del email no es válido.');
            } else {
                setErrorAuthFirebase("Error al autenticar con Firebase. Verificá que el usuario exista en Firebase Console.");
            }
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
            mostrarToast(`Stock cambiado a ${!stockActual ? 'disponible' : 'sin stock'}`, 'exito');
        } catch (error) {
            console.error("Error al cambiar stock: ", error);
            mostrarToast("No se pudo actualizar el stock.", 'error');
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
            mostrarToast("Completá los campos obligatorios (Nombre y Precios).", 'error');
            return;
        }
        const min = Number(precioMinorista);
        const may = Number(precioMayorista);
        if (isNaN(min) || isNaN(may) || min <= 0 || may <= 0) {
            mostrarToast("Los precios deben ser números válidos mayores a cero.", 'error');
            return;
        }
        if (min < may) {
            mostrarToast("El precio minorista no puede ser menor al mayorista.", 'error');
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
        setGuardando(true);
        try {
            if (idEnEdicion) {
                const productoRef = doc(db, "productos", idEnEdicion);
                await updateDoc(productoRef, datosProducto);
                mostrarToast("✨ ¡Producto actualizado con éxito!", 'exito');
            } else {
                await addDoc(collection(db, "productos"), { ...datosProducto, stock: true, });
                mostrarToast("✅ ¡Producto creado con éxito!", 'exito');
            }
            cancelarEdicion();
            cargarProductos();
        } catch (error) {
            console.error("Error al guardar en Firebase: ", error);
            mostrarToast("Hubo un error al procesar la operación.", 'error');
        } finally {
            setGuardando(false);
        }
    };

    if (!autenticado) {
        return (
            <div style={{
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                minHeight: '60vh', padding: 'var(--space-5)', boxSizing: 'border-box'
            }}>
                <div style={{
                    backgroundColor: 'var(--color-bg-card)', padding: 'var(--space-8)',
                    borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)',
                    width: '100%', maxWidth: '400px', boxSizing: 'border-box',
                }}>
                    <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
                        <div style={{ fontSize: '48px', marginBottom: 'var(--space-2)' }}>🔐</div>
                        <h2 style={{ margin: '0 0 var(--space-1)', color: 'var(--color-text)', fontSize: '22px' }}>
                            Acceso Administrador
                        </h2>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '14px', margin: 0 }}>
                            Ingresá tus credenciales de Firebase y la clave maestra.
                        </p>
                    </div>
                    <form onSubmit={manejarLogin} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value); setErrorClave(''); }}
                            placeholder="Email de administrador"
                            autoFocus
                            disabled={bloqueado}
                            style={{
                                width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)',
                                border: `1px solid ${errorClave ? 'var(--color-danger)' : 'var(--color-border)'}`,
                                boxSizing: 'border-box', fontSize: '15px',
                                opacity: bloqueado ? 0.6 : 1,
                                fontFamily: 'inherit',
                            }}
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value); setErrorClave(''); }}
                            placeholder="Contraseña"
                            disabled={bloqueado}
                            style={{
                                width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)',
                                border: `1px solid ${errorClave ? 'var(--color-danger)' : 'var(--color-border)'}`,
                                boxSizing: 'border-box', fontSize: '15px',
                                opacity: bloqueado ? 0.6 : 1,
                                fontFamily: 'inherit',
                            }}
                        />
                        <input
                            type="password"
                            value={claveIngresada}
                            onChange={(e) => { setClaveIngresada(e.target.value); setErrorClave(''); }}
                            placeholder="Clave maestra"
                            disabled={bloqueado}
                            style={{
                                width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)',
                                border: `1px solid ${errorClave ? 'var(--color-danger)' : 'var(--color-border)'}`,
                                boxSizing: 'border-box', fontSize: '15px',
                                opacity: bloqueado ? 0.6 : 1,
                                fontFamily: 'inherit',
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
                                border: 'none', padding: '12px', borderRadius: 'var(--radius-sm)',
                                fontWeight: 600, fontSize: '15px', cursor: 'pointer',
                                opacity: (verificando || bloqueado) ? 0.7 : 1,
                                fontFamily: 'inherit',
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
        try { await signOut(auth); } catch (e) { console.error("Error al cerrar sesión:", e); }
        setAutenticado(false);
        setClaveIngresada('');
        setEmail('');
        setPassword('');
        cancelarEdicion();
    };

    return (
        <div style={{
            width: '100%', maxWidth: '900px', margin: '0 auto',
            padding: 'var(--space-4)', boxSizing: 'border-box',
            position: 'relative',
        }}>
            {errorAuthFirebase && (
                <div style={{
                    textAlign: 'center', padding: 'var(--space-4)',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--color-danger-light)',
                    border: '1px solid var(--color-danger)',
                    color: 'var(--color-danger-dark)',
                    fontSize: '14px', fontWeight: 600,
                    marginBottom: 'var(--space-4)',
                }}>
                    ⚠️ {errorAuthFirebase}
                </div>
            )}

            {toast && (
                <div style={{
                    position: 'fixed', bottom: '80px', left: '50%', transform: 'translateX(-50%)',
                    backgroundColor: toast.tipo === 'exito' ? 'var(--color-navy-light)' : 'var(--color-danger-dark)',
                    color: 'white', padding: 'var(--space-3) var(--space-6)',
                    borderRadius: 'var(--radius-md)', fontSize: '14px', fontWeight: 600,
                    zIndex: 9999, boxShadow: 'var(--shadow-xl)',
                    animation: 'fadeInUp 0.25s ease',
                    display: 'flex', alignItems: 'center', gap: 'var(--space-2)',
                    whiteSpace: 'nowrap', backdropFilter: 'blur(8px)',
                }}>
                    {toast.mensaje}
                </div>
            )}

            {/* Formulario */}
            <div style={{
                backgroundColor: 'var(--color-bg-card)', padding: 'var(--space-5)',
                borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)',
                marginBottom: 'var(--space-6)', boxSizing: 'border-box',
                border: '1px solid var(--color-border)',
            }}>
                <h2 style={{
                    marginTop: 0, fontSize: '20px',
                    color: idEnEdicion ? 'var(--color-primary)' : 'var(--color-text)',
                    marginBottom: 'var(--space-5)',
                }}>
                    {idEnEdicion ? `✏️ Editando: ${nombre}` : '➕ Alta de Producto'}
                </h2>

                <form onSubmit={manejarEnvio} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: 'var(--space-1)', fontWeight: 600, fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                            Nombre del Producto *
                        </label>
                        <input type="text" value={nombre} onChange={e => setNombre(e.target.value)}
                            style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-card)', color: 'var(--color-text)', boxSizing: 'border-box', fontSize: '14px', fontFamily: 'inherit' }}
                            placeholder="Ej: Jabón Líquido Premium" />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: 'var(--space-1)', fontWeight: 600, fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                            Descripción
                        </label>
                        <textarea value={descripcion} onChange={e => setDescripcion(e.target.value)}
                            style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-card)', color: 'var(--color-text)', boxSizing: 'border-box', fontSize: '14px', fontFamily: 'inherit', minHeight: '60px', resize: 'vertical' }}
                            placeholder="Detalles del producto..." />
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                        gap: 'var(--space-4)',
                    }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: 'var(--space-1)', fontWeight: 600, fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                                Precio Minorista ($) *
                            </label>
                            <input type="number" value={precioMinorista} onChange={e => setPrecioMinorista(e.target.value)}
                                style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-card)', color: 'var(--color-text)', boxSizing: 'border-box', fontSize: '14px', fontFamily: 'inherit' }}
                                placeholder="Ej: 1500" />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: 'var(--space-1)', fontWeight: 600, fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                                Precio Mayorista ($) *
                            </label>
                            <input type="number" value={precioMayorista} onChange={e => setPrecioMayorista(e.target.value)}
                                style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-card)', color: 'var(--color-text)', boxSizing: 'border-box', fontSize: '14px', fontFamily: 'inherit' }}
                                placeholder="Ej: 1200" />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: 'var(--space-1)', fontWeight: 600, fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                                Categoría
                            </label>
                            <select value={categoria} onChange={e => setCategoria(e.target.value)}
                                style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-card)', color: 'var(--color-text)', boxSizing: 'border-box', fontSize: '14px', fontFamily: 'inherit' }}>
                                <option value="hogar">🏡 Línea Hogar</option>
                                <option value="automotor">🚗 Línea Automotor</option>
                                <option value="insumos">📦 Insumos</option>
                            </select>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: 'var(--space-1)', fontWeight: 600, fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                                Presentación
                            </label>
                            <input type="text" value={presentacion} onChange={e => setPresentacion(e.target.value)}
                                style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-card)', color: 'var(--color-text)', boxSizing: 'border-box', fontSize: '14px', fontFamily: 'inherit' }}
                                placeholder="Por Litro, Bidón 5L, etc." />
                        </div>
                    </div>

                    {/* Imagen */}
                    <div>
                        <label style={{ display: 'block', marginBottom: 'var(--space-1)', fontWeight: 600, fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                            Imagen del Producto
                        </label>
                        <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                            <div style={{ flex: '1 1 240px', display: 'flex', gap: 'var(--space-2)' }}>
                                <input
                                    type="text"
                                    value={imagenUrl}
                                    onChange={e => setImagenUrl(e.target.value)}
                                    style={{
                                        flex: '1', padding: '10px 12px', borderRadius: 'var(--radius-sm)',
                                        border: '1px solid var(--color-border)',
                                        backgroundColor: 'var(--color-bg-card)',
                                        color: 'var(--color-text)',
                                        fontSize: '14px', fontFamily: 'inherit',
                                    }}
                                    placeholder="https://ejemplo.com/imagen.jpg"
                                />
                                <button
                                    type="button"
                                    onClick={() => document.getElementById('input-imagen')?.click()}
                                    disabled={subiendoImagen}
                                    style={{
                                        padding: '10px 14px', borderRadius: 'var(--radius-sm)',
                                        border: '1px solid var(--color-border)',
                                        backgroundColor: 'var(--color-bg-card)',
                                        cursor: subiendoImagen ? 'not-allowed' : 'pointer',
                                        fontSize: '18px', lineHeight: 1, flexShrink: 0,
                                        opacity: subiendoImagen ? 0.6 : 1,
                                    }}
                                    title={subiendoImagen ? 'Subiendo...' : 'Subir imagen del dispositivo'}
                                >
                                    {subiendoImagen ? '⏳' : '📁'}
                                </button>
                            </div>
                            {imagenUrl.trim() && (
                                <div style={{
                                    width: '100px', height: '100px', borderRadius: 'var(--radius-sm)',
                                    overflow: 'hidden', border: '1px solid var(--color-border)',
                                    flexShrink: 0, backgroundColor: 'var(--color-border-light)',
                                }}>
                                    <img src={imagenUrl.trim()} alt="Preview"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
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

                    <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-2)', flexWrap: 'wrap' }}>
                        <button type="submit" disabled={guardando}
                            style={{
                                flex: '1 1 160px',
                                backgroundColor: guardando ? 'var(--color-text-muted)' : (idEnEdicion ? 'var(--color-primary)' : 'var(--color-success)'),
                                color: '#fff', border: 'none', padding: '12px', borderRadius: 'var(--radius-sm)',
                                fontWeight: 600, cursor: guardando ? 'not-allowed' : 'pointer',
                                opacity: guardando ? 0.7 : 1, fontFamily: 'inherit',
                            }}>
                            {guardando ? '⏳ Guardando...' : (idEnEdicion ? '💾 Guardar Cambios' : '🚀 Registrar Producto')}
                        </button>
                        {idEnEdicion && (
                            <button type="button" onClick={cancelarEdicion} disabled={guardando}
                                style={{
                                    flex: '1 1 100px', backgroundColor: 'var(--color-border)', color: 'var(--color-text-secondary)',
                                    border: 'none', padding: '12px', borderRadius: 'var(--radius-sm)',
                                    fontWeight: 600, cursor: guardando ? 'not-allowed' : 'pointer',
                                    opacity: guardando ? 0.5 : 1, fontFamily: 'inherit',
                                }}>
                                Cancelar
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* Listado de inventario */}
            <div>
                <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    flexWrap: 'wrap', gap: 'var(--space-3)', marginBottom: 'var(--space-4)',
                }}>
                    <h3 style={{ margin: 0, fontSize: '18px', color: 'var(--color-text)' }}>
                        📦 Inventario {productos.length > 0 && (
                            <span style={{ fontSize: '14px', fontWeight: 'normal', color: 'var(--color-text-muted)' }}>
                                ({productos.length} productos)
                            </span>
                        )}
                    </h3>
                    <button onClick={cerrarSesion}
                        style={{
                            backgroundColor: 'transparent', color: 'var(--color-danger)',
                            border: '1px solid var(--color-danger)', padding: '6px 14px',
                            borderRadius: 'var(--radius-sm)', fontSize: '12px',
                            cursor: 'pointer', fontWeight: 600, fontFamily: 'inherit',
                            transition: 'all 0.2s',
                        }}>
                        🔒 Cerrar Sesión
                    </button>
                </div>

                {cargando ? (
                    <p style={{ color: 'var(--color-text-muted)', textAlign: 'center' }}>Sincronizando con Firestore...</p>
                ) : errorDb ? (
                    <div style={{
                        textAlign: 'center', padding: 'var(--space-4)',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'var(--color-danger-light)',
                        border: '1px solid var(--color-danger)',
                        color: 'var(--color-danger-dark)',
                        fontSize: '14px', fontWeight: 600,
                    }}>
                        ⚠️ {errorDb}
                    </div>
                ) : productos.length === 0 ? (
                    <p style={{ color: 'var(--color-text-muted)', textAlign: 'center' }}>No hay productos cargados.</p>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                        {productos.map((prod) => (
                            <div
                                key={prod.id}
                                className="card-hover"
                                style={{
                                    backgroundColor: idEnEdicion === prod.id ? 'var(--color-primary-lighter)' : 'var(--color-bg-card)',
                                    padding: 'var(--space-4)',
                                    borderRadius: 'var(--radius-md)',
                                    border: idEnEdicion === prod.id
                                        ? '1.5px solid var(--color-primary)'
                                        : '1px solid var(--color-border)',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    gap: 'var(--space-3)',
                                    alignItems: 'center',
                                }}
                            >
                                <div style={{
                                    width: '48px', height: '48px', borderRadius: 'var(--radius-sm)',
                                    overflow: 'hidden', flexShrink: 0,
                                    border: '1px solid var(--color-border-light)',
                                    backgroundColor: 'var(--color-border-light)',
                                }}>
                                    <img src={prod.imagenUrl} alt={prod.nombre}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                                </div>

                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{
                                        display: 'flex', justifyContent: 'space-between',
                                        alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--space-1)',
                                    }}>
                                        <span style={{ fontWeight: 600, color: 'var(--color-text)', fontSize: '15px' }}>
                                            {prod.nombre}
                                        </span>
                                        <span style={{
                                            fontSize: '11px', color: 'var(--color-text-muted)',
                                            backgroundColor: 'var(--color-border-light)',
                                            padding: '2px 8px', borderRadius: 'var(--radius-full)',
                                        }}>
                                            {prod.presentacion || 'Por Litro'}
                                        </span>
                                    </div>

                                    <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', padding: 'var(--space-1) 0' }}>
                                        <span>Min: <strong style={{ color: 'var(--color-primary)' }}>${formatearPrecio(prod.precioMinorista)}</strong></span>
                                        <span style={{ margin: '0 8px', color: 'var(--color-border)' }}>|</span>
                                        <span>May: <strong style={{ color: 'var(--color-success-dark)' }}>${formatearPrecio(prod.precioMayorista)}</strong></span>
                                    </div>

                                    <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                                        <button
                                            onClick={() => conmutarStock(prod.id, prod.stock)}
                                            style={{
                                                backgroundColor: prod.stock ? '#f0fdf4' : '#fef2f2',
                                                color: prod.stock ? 'var(--color-success-dark)' : 'var(--color-danger)',
                                                border: `1px solid ${prod.stock ? '#bbf7d0' : '#fecaca'}`,
                                                padding: '4px 12px', borderRadius: 'var(--radius-full)',
                                                fontSize: '12px', fontWeight: 600, cursor: 'pointer',
                                                fontFamily: 'inherit',
                                            }}
                                        >
                                            {prod.stock ? '🟢 Disponible' : '🔴 Sin Stock'}
                                        </button>
                                        <button
                                            onClick={() => activarEdicion(prod)}
                                            style={{
                                                backgroundColor: 'var(--color-border-light)',
                                                color: 'var(--color-primary)',
                                                border: 'none', padding: '4px 14px',
                                                borderRadius: 'var(--radius-sm)',
                                                fontWeight: 600, fontSize: '12px', cursor: 'pointer',
                                                fontFamily: 'inherit',
                                                transition: 'background-color 0.2s',
                                            }}
                                        >
                                            ✏️ Editar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
