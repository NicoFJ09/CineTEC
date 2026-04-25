import React from 'react';
import { useHistory } from 'react-router-dom';
import './AdminLayout.css'

const AdminLayout: React.FC<{ children: React.ReactNode; subtitle?: string }> = ({ children, subtitle = 'Gestión del sistema' }) => {
    const history = useHistory();

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <div style={{ backgroundColor: '#0f172a' }} className="text-white py-4">
                <div className="container-xl d-flex align-items-center gap-3">
                    <img src="/Monkey.png" alt="Logo" style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover', marginRight: '8px' }} />
                    <div>
                        <h1 className="fw-bold mb-0">Administración CineTEC</h1>
                        <small className="text-secondary">{subtitle}</small>
                    </div>
                </div>
            </div>

            <div className="admin-layout">
                <div className="sidebar">
                    <ul>
                        <li onClick={() => history.push('/admin')}>
                            Dashboard
                        </li>
                        <li onClick={() => history.push('/admin/movies')}>
                            Cartelera
                        </li>
                        <li onClick={() => history.push('/admin/theaters')}>
                            Sucursales y Salas
                        </li>
                        <li onClick={() => history.push('/admin/screening')}>
                            Programación de proyecciones
                        </li>
                    </ul>
                </div>
                <div className="content">
                    {children}
                </div>
            </div>

            <footer className="bg-dark border-top border-white border-opacity-10 py-3">
                <div className="container-xl d-flex align-items-center justify-content-between flex-wrap gap-2">
                    <div className="d-flex align-items-center gap-2 text-white fw-bold small">
                        <img src="/Monkey.png" alt="Logo" style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' }} />
                        CineTEC
                    </div>
                    <small className="text-secondary">
                        Instituto Tecnológico de Costa Rica · CE3101 Bases de Datos · v1.0.0
                    </small>
                </div>
            </footer>
        </div>
    );
};

export default AdminLayout;