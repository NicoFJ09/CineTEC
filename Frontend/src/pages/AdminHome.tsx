import { IonContent, IonPage } from '@ionic/react';
import AdminLayout from '../components/AdminLayout'; // sidebar

import './Adminhome.css';

const AdminHome: React.FC = () => {

    return (
        <IonPage>
            <IonContent>
                <AdminLayout subtitle="Gestión del sistema">
                    <div className="p-4">
                        {/* Fila 1 - 3 tarjetas iguales */}
                        <div className="row g-3 mb-3">
                            <div className="col-4">
                                <div style={{ backgroundColor: '#1e3a5f' }} className="card text-white p-4">
                                    <span className="material-icons">movie</span>
                                    <small className="text-secondary mt-2">Películas en cartelera</small>
                                    <h2 className="fw-bold mt-1">12</h2>
                                </div>
                            </div>
                            <div className="col-4">
                                <div style={{ backgroundColor: '#2a1800' }} className="card text-white p-4">
                                    <span className="material-icons">pin_drop</span>
                                    <small className="text-secondary mt-2">Sucursales abiertas</small>
                                    <h2 className="fw-bold mt-1">3</h2>
                                </div>
                            </div>
                            <div className="col-4">
                                <div style={{ backgroundColor: '#1a0a2e' }} className="card text-white p-4">
                                    <span className="material-icons">camera_indoor</span>
                                    <small className="text-secondary mt-2">Salas disponibles en todas las sucursales</small>
                                    <h2 className="fw-bold mt-1">17</h2>
                                </div>
                            </div>
                        </div>

                        {/* Fila 2 - 2 grandes y 1 angosta */}
                        <div className="row g-3">
                            <div className="col-5">
                                <div style={{ backgroundColor: '#0d1b2e' }} className="card text-white p-4">
                                    <span className="material-icons">local_activity</span>
                                    <small className="text-secondary mt-2">Ventas hoy</small>
                                    <h2 className="fw-bold mt-1">200</h2>
                                </div>
                            </div>
                            <div className="col-5">
                                <div style={{ backgroundColor: '#2e0a0a' }} className="card text-white p-4">
                                    <span className="material-icons">event</span>
                                    <small className="text-secondary mt-2">Proyecciones totales hoy</small>
                                    <h2 className="fw-bold mt-1">53</h2>
                                </div>
                            </div>
                            <div className="col-2">
                                <div style={{ backgroundColor: '#0a2e2a' }} className="card text-white p-4">
                                    <span className="material-icons">supervisor_account</span>
                                    <small className="text-secondary mt-2">Administradores</small>
                                    <h2 className="fw-bold mt-1">4</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </AdminLayout>

            </IonContent>
         </IonPage>
    );
};

export default AdminHome;
