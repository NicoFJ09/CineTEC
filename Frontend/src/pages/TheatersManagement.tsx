import React, { useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout'; // sidebar
import './TheatersManagement.css'

const TheatersManagement: React.FC = () => {
    const history = useHistory(); 
    const [sucursalSeleccionada, setSucursalSeleccionada] = useState<number | null>(null);
    
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
                                <button className="btn btn-danger btn-sm">+ Nueva</button>
                            </div>
                            {/* lista de sucursales aquí */}
                        </div>

                        {/* Mitad derecha - Salas */}
                        <div className="w-50 p-4">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h4 className="text-black fw-bold">
                                    {sucursalSeleccionada ? `Salas de ${sucursalSeleccionada}` : 'Seleccioná una sucursal'}
                                </h4>
                                {sucursalSeleccionada && <button className="btn btn-danger btn-sm">+ Nueva Sala</button>}
                            </div>
                            {/* lista de salas aquí */}
                        </div>
                    </div>
                </AdminLayout>

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