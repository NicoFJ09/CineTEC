import React, { useState, useEffect } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { obtenerTodosCines } from '../services/cineServices'; // import del api
import { obtenerCinePorNombre } from '../services/cineServices'; // import del api
import AdminLayout from '../components/AdminLayout'; // sidebar
import './TheatersManagement.css'

/* ── Mock data (swap for API calls) ─────────────────────── */
const SALAS = [
    // Plaza Mayor (PM) - 6 salas
    { id: 'PMS1', cant_filas: 12, cant_cols: 13, cine_id: 'Plaza Mayor' },
    { id: 'PMS2', cant_filas: 10, cant_cols: 10, cine_id: 'Plaza Mayor' },
    { id: 'PMS3', cant_filas: 10, cant_cols: 13, cine_id: 'Plaza Mayor' },
    { id: 'PMS4', cant_filas: 8,  cant_cols: 10, cine_id: 'Plaza Mayor' },
    { id: 'PMS5', cant_filas: 8,  cant_cols: 8,  cine_id: 'Plaza Mayor' },
    { id: 'PMS6', cant_filas: 6,  cant_cols: 8,  cine_id: 'Plaza Mayor' },

    // Heredia Mall (HM) - 6 salas
    { id: 'HMS1', cant_filas: 12, cant_cols: 12, cine_id: 'Heredia Mall' },
    { id: 'HMS2', cant_filas: 10, cant_cols: 12, cine_id: 'Heredia Mall' },
    { id: 'HMS3', cant_filas: 10, cant_cols: 10, cine_id: 'Heredia Mall' },
    { id: 'HMS4', cant_filas: 8,  cant_cols: 10, cine_id: 'Heredia Mall' },
    { id: 'HMS5', cant_filas: 8,  cant_cols: 8,  cine_id: 'Heredia Mall' },
    { id: 'HMS6', cant_filas: 6,  cant_cols: 8,  cine_id: 'Heredia Mall' },

    // Alajuela Center (AC) - 5 salas
    { id: 'ACS1', cant_filas: 12, cant_cols: 12, cine_id: 'Alajuela Center' },
    { id: 'ACS2', cant_filas: 10, cant_cols: 10, cine_id: 'Alajuela Center' },
    { id: 'ACS3', cant_filas: 8,  cant_cols: 10, cine_id: 'Alajuela Center' },
    { id: 'ACS4', cant_filas: 8,  cant_cols: 8,  cine_id: 'Alajuela Center' },
    { id: 'ACS5', cant_filas: 6,  cant_cols: 8,  cine_id: 'Alajuela Center' },
]


const TheatersManagement: React.FC = () => {
    const history = useHistory(); 
    const [sucursalSeleccionada, setSucursalSeleccionada] = useState<any | null>(null);
    const [cines, setCines] = useState<any[]>([]);
    const [cineExpandido, setCineExpandido] = useState<string | null>(null);
    const [cineDetalle, setCineDetalle] = useState<any | null>(null);
    const salasDeSucursal = SALAS.filter(s => s.cine_id === sucursalSeleccionada?.nombre);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [mostrarformSala, setMostrarformSala] = useState(false);

    useEffect(() => {
        obtenerTodosCines().then(data => setCines(data));
    }, []);
    
    return (
        <IonPage>
            <IonContent>
                <div style={{ backgroundColor: '#0f172a' }} className="text-white py-4">
                    <div className="container-xl d-flex align-items-center gap-3">
                        <span className="logo-mark">C</span>
                        <div>
                            <h1 className="fw-bold mb-0">Administración CineTEC</h1>
                            <small className="text-secondary"> Gestión Sucursales y Salas</small>
                        </div>
                    </div>
                </div>

                <AdminLayout>
                    <div className="d-flex h-100">
                        {/* Mitad izquierda - Sucursales */}
                        <div className="w-50 p-4 border-end border-secondary">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h4 className="text-black fw-bold">Sucursales</h4>
                                <button className="btn btn-danger btn-sm" onClick={() => setMostrarModal(true)}>+ Nueva</button>
                            </div>
                            {cines.map(cine => (
                                <div key={cine.nombre} className="p-3 mb-2 rounded" style={{ backgroundColor: '#1e293b' }}>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <p className="text-white fw-bold mb-0">{cine.nombre}</p>
                                            <small className="text-secondary">{cine.provincia}</small>
                                        </div>
                                        <div className="d-flex gap-2">
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
                                            <button className="btn btn-sm btn-outline-light">Editar</button>
                                            <button className="btn btn-sm btn-outline-danger">Eliminar</button>
                                            <button className="btn btn-sm btn-danger" onClick={() => setSucursalSeleccionada(cine)}>
                                                Ver salas
                                            </button>
                                        </div>
                                    </div>
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

                        {/* Mitad derecha - Salas */}
                        <div className="w-50 p-4">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h4 className="text-black fw-bold">
                                    {sucursalSeleccionada ? `Salas de ${sucursalSeleccionada.nombre}` : 'Seleccioná una sucursal'}
                                </h4>
                                {sucursalSeleccionada && <button className="btn btn-danger btn-sm" onClick={() => setMostrarformSala(true)}>+ Nueva Sala</button>}
                            </div>
                            {salasDeSucursal.map(sala => (
                                <div key={sala.id} className="p-3 mb-2 rounded" style={{ backgroundColor: '#1e2737' }}>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <p className="text-white fw-bold mb-0">{sala.id}</p>
                                            <small className="text-secondary">{sala.cant_filas} filas × {sala.cant_cols} columnas</small>
                                        </div>
                                        <div className="d-flex gap-2">
                                            <button className="btn btn-sm btn-outline-light">Editar</button>
                                            <button className="btn btn-sm btn-outline-danger">Eliminar</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </AdminLayout>
                
                {/* ── Formularo para nueva sucursal────────── */}
                {mostrarModal && (
                    <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <div className="modal-dialog">
                            <div style={{ backgroundColor: '#e1e5ed' }} className="modal-content text-white">
                                <div className="modal-header">
                                    <h5 className="modal-title text-black">Nueva Sucursal</h5>
                                    <button className="btn-close btn-close-black" onClick={() => setMostrarModal(false)}></button>
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
                                    <button className="btn btn-danger" onClick={() => alert('Se ha añadido la sucursal correctamente') }>Guardar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ── Formularo para nueva sala────────── */}
                {mostrarformSala && (
                    <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <div className="modal-dialog">
                            <div style={{ backgroundColor: '#e1e5ed' }} className="modal-content text-white">
                                <div className="modal-header">
                                    <h5 className="modal-title text-black">Nueva Sucursal</h5>
                                    <button className="btn-close btn-close-black" onClick={() => setMostrarformSala(false)}></button>
                                </div>
                                <div className="modal-body">
                                    <input className="form-control mb-3 modal-input" placeholder="Numero de sala" type="number"/>
                                    <input className="form-control mb-3 modal-input" placeholder="Cantidad de filas" type="number" />
                                    <input className="form-control mb-3 modal-input" placeholder="Cantidad de columnas" type="number" />
                                    <select className="form-control mb-3 modal-input">
                                        <option value="">Seleccioná una sucursal</option>
                                        {cines.map(cine => (
                                            <option key={cine.nombre} value={cine.nombre}>
                                                {cine.nombre}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-secondary" onClick={() => setMostrarformSala(false)}>Cancelar</button>
                                    <button className="btn btn-danger" onClick={() => alert('Se ha añadido la sala correctamente') }>Guardar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ── Footer ─────────────────────────────────────── */}
                <footer className="bg-dark border-top border-white border-opacity-10 py-3">
                <div className="container-xl d-flex align-items-center justify-content-between flex-wrap gap-2">
                    <div className="d-flex align-items-center gap-2 text-white fw-bold small">
                    <span className="logo-mark">C</span>
                    CineTEC
                    </div>
                    <small className="text-secondary">
                    Instituto Tecnológico de Costa Rica · CE3101 Bases de Datos · v1.0.0
                    </small>
                </div>
                </footer>

            </IonContent>
        </IonPage>
    );
};

export default TheatersManagement