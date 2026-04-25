import React, { useState } from 'react';
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonButton, IonIcon } from '@ionic/react';
import { useParams, useHistory } from 'react-router-dom';
import { timeOutline, videocamOutline, calendarOutline } from 'ionicons/icons';

// Mock data
const DAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

type Projection = { id: number; time: string; room: string; availableSeats: number };

// Diccionario de proyecciones configuradas según cada día de la semana
const PROJECTIONS_BY_DAY: Record<string, Projection[]> = {
  'Lunes': [
    { id: 101, time: '14:00', room: 'Sala 1 (2D)', availableSeats: 45 },
    { id: 102, time: '16:30', room: 'Sala 2 (3D)', availableSeats: 12 }
  ],
  'Martes': [
    { id: 103, time: '15:00', room: 'Sala 1 (2D)', availableSeats: 50 },
    { id: 104, time: '19:00', room: 'Sala IMAX', availableSeats: 5 }
  ],
  'Miércoles': [
    { id: 105, time: '14:00', room: 'Sala 1 (2D)', availableSeats: 30 },
    { id: 106, time: '18:30', room: 'Sala VIP', availableSeats: 20 }
  ],
  'Jueves': [
    { id: 107, time: '16:00', room: 'Sala 2 (3D)', availableSeats: 15 },
    { id: 108, time: '21:00', room: 'Sala IMAX', availableSeats: 2 }
  ],
  'Viernes': [
    { id: 109, time: '17:00', room: 'Sala 1 (2D)', availableSeats: 10 },
    { id: 110, time: '20:30', room: 'Sala VIP', availableSeats: 8 },
    { id: 111, time: '22:30', room: 'Sala 2 (3D)', availableSeats: 40 }
  ],
  'Sábado': [
    { id: 112, time: '13:00', room: 'Sala 1 (2D)', availableSeats: 50 },
    { id: 113, time: '16:00', room: 'Sala 2 (3D)', availableSeats: 25 },
    { id: 114, time: '19:30', room: 'Sala IMAX', availableSeats: 0 }
  ],
  'Domingo': [
    { id: 115, time: '14:30', room: 'Sala VIP', availableSeats: 12 },
    { id: 116, time: '18:00', room: 'Sala 1 (2D)', availableSeats: 45 }
  ]
};

// Pantalla para ver proyecciones divididas por días una vez una película es elegida
const ClientProjections: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const history = useHistory();
  const [selectedDay, setSelectedDay] = useState<string>('Lunes');

  // Evento que navega al selector de asientos con el id correcto
  const handleSelectProjection = (projectionId: number) => {
    history.push(`/client/seats/${projectionId}`);
  };

  const projections = PROJECTIONS_BY_DAY[selectedDay] || [];

  // Muestra el calendario horizontal y las funciones disponibles según selección
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="danger">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Seleccionar Función</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="bg-light">
        <div className="container-xl py-4">
          
          <h5 className="mb-3 px-2 d-flex align-items-center">
            <IonIcon icon={calendarOutline} className="me-2" />
            Elige el día
          </h5>
          
          <div className="d-flex gap-2 overflow-auto px-2 pb-3 mb-4" style={{ whiteSpace: 'nowrap' }}>
            {DAYS.map(day => (
              <IonButton 
                key={day} 
                fill={selectedDay === day ? 'solid' : 'outline'} 
                color="danger" 
                shape="round"
                onClick={() => setSelectedDay(day)}
              >
                {day}
              </IonButton>
            ))}
          </div>

          <h5 className="mb-3 px-2">Horarios para {selectedDay}</h5>
          
          <div className="px-2 d-flex flex-wrap gap-3">
            {projections.length > 0 ? (
              projections.map(proj => (
                <div 
                  key={proj.id} 
                  className="bg-white p-3 rounded shadow-sm flex-fill border text-center" 
                  style={{ minWidth: '140px', cursor: 'pointer' }}
                  onClick={() => handleSelectProjection(proj.id)}
                >
                  <div className="fw-bold fs-4 mb-1 text-danger d-flex align-items-center justify-content-center">
                    <IonIcon icon={timeOutline} className="me-1" /> {proj.time}
                  </div>
                  <div className="small text-muted d-flex align-items-center justify-content-center mb-2">
                    <IonIcon icon={videocamOutline} className="me-1" /> {proj.room}
                  </div>
                  <div className={`mt-2 badge ${proj.availableSeats > 10 ? 'bg-success' : 'bg-warning text-dark'}`}>
                    {proj.availableSeats} disponibles
                  </div>
                </div>
              ))
            ) : (
              <div className="text-muted p-3 bg-white rounded border w-100 text-center">
                No hay funciones programadas para este día.
              </div>
            )}
          </div>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default ClientProjections;