import React from 'react';
import { useHistory } from 'react-router-dom';
import './AdminLayout.css'

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const history = useHistory(); 

    return (
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
                    <li>
                        Restricción CoTec-23
                    </li>
                </ul>
            </div>
            <div className="content">
                {children}
            </div>
        </div>

    );
};

export default AdminLayout;