import React, { useState, useEffect } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { obtenerTodosCines, obtenerCinePorNombre } from '../services/cineServices';
import AdminLayout from '../components/AdminLayout';
import './TheatersManagement.css'

// datos mock de salas
const SALAS = [
    { id: 'PMS1', cant_filas: 12, cant_cols: 13, cine_id: 'Plaza Mayor' },
    { id: 'PMS2', cant_filas: 10, cant_cols: 10, cine_id: 'Plaza Mayor' },
    { id: 'PMS3', cant_filas: 10, cant_cols: 13, cine_id: 'Plaza Mayor' },
    { id: 'PMS4', cant_filas: 8,  cant_cols: 10, cine_id: 'Plaza Mayor' },
    { id: 'PMS5', cant_filas: 8,  cant_cols: 8,  cine_id: 'Plaza Mayor' },
    { id: 'PMS6', cant_filas: 6,  cant_cols: 8,  cine_id: 'Plaza Mayor' },
    { id: 'HMS1', cant_filas: 12, cant_cols: 12, cine_id: 'Heredia Mall' },
    { id: 'HMS2', cant_filas: 10, cant_cols: 12, cine_id: 'Heredia Mall' },
    { id: 'HMS3', cant_filas: 10, cant_cols: 10, cine_id: 'Heredia Mall' },
    { id: 'HMS4', cant_filas: 8,  cant_cols: 10, cine_id: 'Heredia Mall' },
    { id: 'HMS5', cant_filas: 8,  cant_cols: 8,  cine_id: 'Heredia Mall' },
    { id: 'HMS6', cant_filas: 6,  cant_cols: 8,  cine_id: 'Heredia Mall' },
    { id: 'ACS1', cant_filas: 12, cant_cols: 12, cine_id: 'Alajuela Center' },
    { id: 'ACS2', cant_filas: 10, cant_cols: 10, cine_id: 'Alajuela Center' },
    { id: 'ACS3', cant_filas: 8,  cant_cols: 10, cine_id: 'Alajuela Center' },
    { id: 'ACS4', cant_filas: 8,  cant_cols: 8,  cine_id: 'Alajuela Center' },
    { id: 'ACS5', cant_filas: 6,  cant_cols: 8,  cine_id: 'Alajuela Center' },
]

const TheatersManagement: React.FC = () => {
    const history = useHistory();

    // cine seleccionado para ver sus salas
    const [sucursalSeleccionada, setSucursalSeleccionada] = useState<any | null>(null);
    // lista de cines del API
    const [cines, setCines] = useState<any[]>([]);
    // nombre del cine con info expandida
    const [cineExpandido, setCineExpandido] = useState<string | null>(null);
    // detalle completo del cine (viene del GET simple)
    const [cineDetalle, setCineDetalle] = useState<any | null>(null);

    // modal nueva sucursal
    const [mostrarModal, setMostrarModal] = useState(false);
    // modal nueva sala
    const [mostrarformSala, setMostrarformSala] = useState(false);

    // modal editar cine — guarda el cine que se está editando
    const [cineEditando, setCineEditando] = useState<any | null>(null);
    // modal editar sala — guarda la sala que se está editando
    const [salaEditando, setSalaEditando] = useState<any | null>(null);

    // confirmación eliminar cine — guarda el nombre del cine a eliminar
    const [cineAEliminar, setCineAEliminar] = useState<string | null>(null);
    // confirmación eliminar sala — guarda el id de la sala a eliminar
    const [salaAEliminar, setSalaAEliminar] = useState<string | null>(null);

    // salas filtradas según la sucursal seleccionada
    const salasDeSucursal = SALAS.filter(s => s.cine_id === sucursalSeleccionada?.nombre);

    // carga los cines del API al abrir la página
    useEffect(() => {
        obtenerTodosCines().then(data => setCines(data));
    }, []);

    return (
        <IonPage>
            <IonContent>
                <AdminLayout subtitle="Gestión de sucursales y salas">
                    {/* contenedor principal de dos mitades */}
                    <div className="d-flex" style={{ minHeight: '400px' }}>

                        {/* mitad izquierda — sucursales */}
                        <div className="w-50 p-4 border-end border-secondary">
                            {/* título y botón nueva sucursal */}
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h4 className="text-black fw-bold">Sucursales</h4>
                                <button className="btn btn-danger btn-sm" onClick={() => setMostrarModal(true)}>+ Nueva</button>
                            </div>

                            {/* lista de cines del API */}
                            {cines.map(cine => (
                                <div key={cine.nombre} className="p-3 mb-2 rounded" style={{ backgroundColor: '#1e293b' }}>
                                    <div className="d-flex justify-content-between align-items-center">
                                        {/* nombre y provincia */}
                                        <div>
                                            <p className="text-white fw-bold mb-0">{cine.nombre}</p>
                                            <small className="text-secondary">{cine.provincia}</small>
                                        </div>
                                        {/* botones de acción */}
                                        <div className="d-flex gap-2">
                                            {/* ver info — llama al GET simple */}
                                            <button className="btn btn-sm btn-outline-light"
                                                onClick={() => {
                                                    if (cineExpandido === cine.nombre) {
                                                        setCineExpandido(null);
                                                        setCineDetalle(null);
                                                    } else {
                                                        setCineExpandido(cine.nombre);
                                                        obtenerCinePorNombre(cine.nombre).then(data => setCineDetalle(data));
                                                    }
                                                }}>
                                                Ver info
                                            </button>
                                            {/* botón editar — abre modal con datos del cine */}
                                            <button className="btn btn-sm btn-outline-light"
                                                onClick={() => setCineEditando({ ...cine })}>
                                                Editar
                                            </button>
                                            {/* botón eliminar — pide confirmación */}
                                            <button className="btn btn-sm btn-outline-danger"
                                                onClick={() => setCineAEliminar(cine.nombre)}>
                                                Eliminar
                                            </button>
                                            {/* ver salas de esta sucursal */}
                                            <button className="btn btn-sm btn-danger"
                                                onClick={() => setSucursalSeleccionada(cine)}>
                                                Ver salas
                                            </button>
                                        </div>
                                    </div>

                                    {/* info expandida del cine — datos del GET simple */}
                                    {cineExpandido === cine.nombre && (
                                        <div className="mt-2 p-2 rounded" style={{ backgroundColor: '#0f172a' }}>
                                            <small className="text-secondary d-block">Provincia: {cineDetalle?.provincia}</small>
                                            <small className="text-secondary d-block">Cantón: {cineDetalle?.canton}</small>
                                            <small className="text-secondary d-block">Distrito: {cineDetalle?.distrito}</small>
                                            <small className="text-secondary d-block">Cantidad de Salas: {cineDetalle?.cantidad_salas}</small>
                                            <small className="text-secondary d-block">Correo de administrador: {cineDetalle?.admin_id}</small>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* mitad derecha — salas */}
                        <div className="w-50 p-4">
                            {/* título dinámico y botón nueva sala */}
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h4 className="text-black fw-bold">
                                    {sucursalSeleccionada ? `Salas de ${sucursalSeleccionada.nombre}` : 'Salas'}
                                </h4>
                                {sucursalSeleccionada && (
                                    <button className="btn btn-danger btn-sm" onClick={() => setMostrarformSala(true)}>
                                        + Nueva Sala
                                    </button>
                                )}
                            </div>

                            {/* placeholder cuando no hay sucursal seleccionada */}
                            {!sucursalSeleccionada && (
                                <div className="text-center text-secondary mt-5">
                                    <span className="material-icons" style={{ fontSize: '3rem' }}>arrow_back</span>
                                    <p className="mt-2">Seleccioná una sucursal para ver sus salas</p>
                                </div>
                            )}

                            {/* lista de salas filtradas */}
                            {salasDeSucursal.map(sala => (
                                <div key={sala.id} className="p-3 mb-2 rounded" style={{ backgroundColor: '#1e2737' }}>
                                    <div className="d-flex justify-content-between align-items-center">
                                        {/* id y dimensiones */}
                                        <div>
                                            <p className="text-white fw-bold mb-0">{sala.id}</p>
                                            <small className="text-secondary d-block">{sala.cant_filas} filas × {sala.cant_cols} columnas</small>
                                            <small className="text-secondary d-block"> Capacidad: {sala.cant_filas*sala.cant_cols} personas </small>
                                        </div>
                                        {/* botones de acción */}
                                        <div className="d-flex gap-2">
                                            {/* editar sala — abre modal con datos de la sala */}
                                            <button className="btn btn-sm btn-outline-light"
                                                onClick={() => setSalaEditando({ ...sala })}>
                                                Editar
                                            </button>
                                            {/* eliminar sala — pide confirmación */}
                                            <button className="btn btn-sm btn-outline-danger"
                                                onClick={() => setSalaAEliminar(sala.id)}>
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </AdminLayout>

                {/* ── modal nueva sucursal ── */}
                {mostrarModal && (
                    <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <div className="modal-dialog">
                            <div style={{ backgroundColor: '#e1e5ed' }} className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title text-black">Nueva Sucursal</h5>
                                    <button className="btn-close" onClick={() => setMostrarModal(false)}></button>
                                </div>
                                <div className="modal-body">
                                    <input className="form-control mb-3 modal-input" placeholder="Nombre del cine" />
                                    <input className="form-control mb-3 modal-input" placeholder="Provincia" />
                                    <input className="form-control mb-3 modal-input" placeholder="Cantón" />
                                    <input className="form-control mb-3 modal-input" placeholder="Distrito" />
                                    <input className="form-control mb-3 modal-input" placeholder="Cantidad de salas" type="number" />
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-secondary" onClick={() => setMostrarModal(false)}>Cancelar</button>
                                    <button className="btn btn-danger" onClick={() => { alert('Sucursal agregada correctamente'); setMostrarModal(false); }}>Guardar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ── modal nueva sala ── */}
                {mostrarformSala && (
                    <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <div className="modal-dialog">
                            <div style={{ backgroundColor: '#e1e5ed' }} className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title text-black">Nueva Sala</h5>
                                    <button className="btn-close" onClick={() => setMostrarformSala(false)}></button>
                                </div>
                                <div className="modal-body">
                                    <input className="form-control mb-3 modal-input" placeholder="Número de sala" type="number" />
                                    <input className="form-control mb-3 modal-input" placeholder="Cantidad de filas" type="number" />
                                    <input className="form-control mb-3 modal-input" placeholder="Cantidad de columnas" type="number" />
                                    <select className="form-control mb-3 modal-input">
                                        <option value="" disabled>Seleccioná una sucursal</option>
                                        {cines.map(cine => (
                                            <option key={cine.nombre} value={cine.nombre}>{cine.nombre}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-secondary" onClick={() => setMostrarformSala(false)}>Cancelar</button>
                                    <button className="btn btn-danger" onClick={() => { alert('Sala agregada correctamente'); setMostrarformSala(false); }}>Guardar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ── modal editar cine ── */}
                {cineEditando && (
                    <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <div className="modal-dialog">
                            <div style={{ backgroundColor: '#e1e5ed' }} className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title text-black">Editar Sucursal</h5>
                                    <button className="btn-close" onClick={() => setCineEditando(null)}></button>
                                </div>
                                <div className="modal-body">
                                    {/* campos prellenados con los datos actuales del cine */}
                                    <label className="form-label text-black fw-semibold">Nombre del cine</label>
                                    <input className="form-control mb-3 modal-input" defaultValue={cineEditando.nombre} placeholder="Nombre del cine" />
                                    
                                    <label className="form-label text-black fw-semibold">Provincia</label>
                                    <input className="form-control mb-3 modal-input" defaultValue={cineEditando.provincia} placeholder="Provincia" />
                                    
                                    <label className="form-label text-black fw-semibold">Cantón</label>
                                    <input className="form-control mb-3 modal-input" defaultValue={cineEditando.canton} placeholder="Cantón" />
                                    
                                    <label className="form-label text-black fw-semibold">Distrito</label>
                                    <input className="form-control mb-3 modal-input" defaultValue={cineEditando.distrito} placeholder="Distrito" />
                                    
                                    <label className="form-label text-black fw-semibold">Cantidad de salas</label>
                                    <input className="form-control mb-3 modal-input" defaultValue={cineEditando.cantidad_salas} placeholder="Cantidad de salas" type="number" />
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-secondary" onClick={() => setCineEditando(null)}>Cancelar</button>
                                    <button className="btn btn-danger" onClick={() => { alert('Sucursal actualizada correctamente'); setCineEditando(null); }}>Guardar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ── modal editar sala ── */}
                {salaEditando && (
                    <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <div className="modal-dialog">
                            <div style={{ backgroundColor: '#e1e5ed' }} className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title text-black">Editar Sala</h5>
                                    <button className="btn-close" onClick={() => setSalaEditando(null)}></button>
                                </div>
                                <div className="modal-body">
                                    {/* campos prellenados con los datos actuales de la sala */}
                                    <label className="form-label text-black fw-semibold">ID de sala</label>
                                    <input className="form-control mb-3 modal-input" defaultValue={salaEditando.id} placeholder="ID de sala" />
                                    
                                    <label className="form-label text-black fw-semibold">Cantidad de filas</label>
                                    <input className="form-control mb-3 modal-input" defaultValue={salaEditando.cant_filas} placeholder="Cantidad de filas" type="number" />
                                    
                                    <label className="form-label text-black fw-semibold">Cantidad de columnas</label>
                                    <input className="form-control mb-3 modal-input" defaultValue={salaEditando.cant_cols} placeholder="Cantidad de columnas" type="number" />
                                    
                                    <label className="form-label text-black fw-semibold">Sucursal</label>
                                    <select className="form-control mb-3 modal-input" defaultValue={salaEditando.cine_id}>
                                        {cines.map(cine => (
                                            <option key={cine.nombre} value={cine.nombre}>{cine.nombre}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-secondary" onClick={() => setSalaEditando(null)}>Cancelar</button>
                                    <button className="btn btn-danger" onClick={() => { alert('Sala actualizada correctamente'); setSalaEditando(null); }}>Guardar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ── confirmación eliminar cine ── */}
                {cineAEliminar && (
                    <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <div className="modal-dialog">
                            <div style={{ backgroundColor: '#e1e5ed' }} className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title text-black">⚠️ Confirmar eliminación</h5>
                                </div>
                                <div className="modal-body text-black">
                                    <p>¿Estás segura de que querés eliminar <strong>{cineAEliminar}</strong>?</p>
                                    <p className="text-danger small">Esta acción es permanente y no se puede deshacer.</p>
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-secondary" onClick={() => setCineAEliminar(null)}>Cancelar</button>
                                    <button className="btn btn-danger" onClick={() => { alert(`${cineAEliminar} eliminado`); setCineAEliminar(null); }}>Sí, eliminar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ── confirmación eliminar sala ── */}
                {salaAEliminar && (
                    <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <div className="modal-dialog">
                            <div style={{ backgroundColor: '#e1e5ed' }} className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title text-black">⚠️ Confirmar eliminación</h5>
                                </div>
                                <div className="modal-body text-black">
                                    <p>¿Estás segura de que querés eliminar la sala <strong>{salaAEliminar}</strong>?</p>
                                    <p className="text-danger small">Esta acción es permanente y no se puede deshacer.</p>
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-secondary" onClick={() => setSalaAEliminar(null)}>Cancelar</button>
                                    <button className="btn btn-danger" onClick={() => { alert(`Sala ${salaAEliminar} eliminada`); setSalaAEliminar(null); }}>Sí, eliminar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}


            </IonContent>
        </IonPage>
    );
};

export default TheatersManagement;
