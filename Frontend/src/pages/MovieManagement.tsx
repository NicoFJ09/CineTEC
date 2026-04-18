import React, { useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';


const MovieManagement: React.FC = () => {
    const history = useHistory(); 
    
    return (
        <IonPage>
            <IonContent>
                <div style={{ backgroundColor: '#0f172a' }} className="text-white py-4">
                    <div className="container-xl d-flex align-items-center gap-3">
                        <span className="logo-mark">C</span>
                        <div>
                            <h1 className="fw-bold mb-0">Administración CineTEC</h1>
                            <small className="text-secondary"> Gestión del sistema</small>
                        </div>
                    </div>
                </div>

            </IonContent>
        </IonPage>
    );
};

export default MovieManagement