import React, { useState } from 'react';
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonButton, IonFooter, IonToast } from '@ionic/react';
import { useParams, useHistory } from 'react-router-dom';

/* Mock Data: 5 rows (A-E), 8 seats per row */
const ROWS = ['A', 'B', 'C', 'D', 'E'];
const COLUMNS = [1, 2, 3, 4, 5, 6, 7, 8];
// Asientos predefinidos ocupados
const OCCUPIED_SEATS = ['B3', 'B4', 'C5', 'D1', 'D2', 'E8']; // Just mock occupied ones

// Pantalla para la selección de butacas o espacios
const ClientSeatSelection: React.FC = () => {
  const { projectionId } = useParams<{ projectionId: string }>();
  const history = useHistory();
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [showToast, setShowToast] = useState(false);

  // Cambia el estado interactivamente entre seleccionado o libre a un asiento particular
  const toggleSeat = (seatId: string) => {
    if (OCCUPIED_SEATS.includes(seatId)) return; // Can't select occupied
    
    setSelectedSeats(prev => {
      if (prev.includes(seatId)) return prev.filter(s => s !== seatId);
      return [...prev, seatId];
    });
  };

  // Válida la interacción enviando los asientos via GET url form a la capa de pago
  const handleContinue = () => {
    if (selectedSeats.length === 0) {
      setShowToast(true);
      return;
    }
    // Pass selected seats conceptually. In a prototype we can use history state or URL params.
    // For simplicity, we'll join them by comma in the URL:
    history.push(`/client/payment?proj=${projectionId}&seats=${selectedSeats.join(',')}`);
  };

  // Componente que construye el grid de pantalla e inyexta botones mapeados
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="danger">
          <IonButtons slot="start">
            {/* Go back to projections */}
            <IonBackButton defaultHref={`/home`} />
          </IonButtons>
          <IonTitle>Selección de Asientos</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent style={{ '--background': '#ffffff', '--color': '#111827' }}>
        <div className="container-xl py-4 d-flex flex-column align-items-center">
          
          <div className="w-100 text-center mb-5">
            <div className="py-1 rounded shadow-sm mx-auto fw-bold" style={{ maxWidth: '300px', backgroundColor: '#dee2e6', color: '#111827', letterSpacing: '0.1em' }}>
              PANTALLA
            </div>
          </div>

          <div className="d-flex flex-column gap-3 overflow-auto w-100 align-items-center pb-4">
            {ROWS.map(row => (
              <div key={row} className="d-flex gap-2 align-items-center">
                <span className="fw-bold" style={{ width: '20px', color: '#111827' }}>{row}</span>
                {COLUMNS.map(col => {
                  const seatId = `${row}${col}`;
                  const isOccupied = OCCUPIED_SEATS.includes(seatId);
                  const isSelected = selectedSeats.includes(seatId);
                  
                  let seatColor = '#e0e0e0'; // available
                  if (isOccupied) seatColor = '#6c757d'; // occupied
                  if (isSelected) seatColor = '#dc3545'; // selected (danger/red)

                  return (
                    <div
                      key={seatId}
                      onClick={() => toggleSeat(seatId)}
                      className="rounded shadow-sm d-flex align-items-center justify-content-center"
                      style={{
                        width: '35px',
                        height: '35px',
                        backgroundColor: seatColor,
                        color: isSelected ? 'white' : (isOccupied ? '#fff' : '#000'),
                        cursor: isOccupied ? 'not-allowed' : 'pointer',
                        fontSize: '0.8rem'
                      }}
                    >
                      {col}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="d-flex gap-4 mt-4 justify-content-center w-100 pt-4" style={{ borderTop: '1px solid #dee2e6' }}>
            <div className="d-flex align-items-center gap-2">
              <div style={{ width: 16, height: 16, backgroundColor: '#e0e0e0', border: '1px solid #ccc' }} className="rounded"></div>
              <small style={{ color: '#111827' }}>Disponible</small>
            </div>
            <div className="d-flex align-items-center gap-2">
              <div style={{ width: 16, height: 16, backgroundColor: '#dc3545' }} className="rounded"></div>
              <small style={{ color: '#111827' }}>Seleccionado</small>
            </div>
            <div className="d-flex align-items-center gap-2">
              <div style={{ width: 16, height: 16, backgroundColor: '#6c757d' }} className="rounded"></div>
              <small style={{ color: '#111827' }}>Ocupado</small>
            </div>
          </div>

        </div>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Debes seleccionar al menos un asiento."
          duration={2000}
          color="warning"
        />
      </IonContent>

      <IonFooter>
        <div className="p-3 bg-white border-top shadow-sm d-flex justify-content-between align-items-center">
          <div>
            <div className="small text-muted">Asientos seleccionados</div>
            <div className="fw-bold fs-5">
              {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'Ninguno'}
            </div>
          </div>
          <IonButton color="danger" onClick={handleContinue} disabled={selectedSeats.length === 0}>
            Continuar a Pago
          </IonButton>
        </div>
      </IonFooter>
    </IonPage>
  );
};

export default ClientSeatSelection;