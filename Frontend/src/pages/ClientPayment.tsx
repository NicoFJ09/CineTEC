import React, { useState } from 'react';
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonItem, IonLabel, IonButton, IonList, IonNote } from '@ionic/react';
import { useLocation, useHistory } from 'react-router-dom';

// Muestra el resumen del carrito virtual del cliente, e implementa pago falso con tarjeta
const ClientPayment: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvV] = useState('');

  // Parsea y recupera datos pasados en el query string de selecciones previas
  const searchParams = new URLSearchParams(location.search);
  const seatsParam = searchParams.get('seats');
  const projectionId = searchParams.get('proj');
  
  const seats = seatsParam ? seatsParam.split(',') : [];
  
  // Realiza los cálculos monetarios pertinentes a las compras fijas o dinamicas
  const basePrice = 3500; // Mock base price
  const total = seats.length * basePrice;
  const taxes = total * 0.13; // 13% tax

  // Procesa y envía hacia la vista del ticket con una factura emulada
  const handlePay = () => {
    // Navigate to invoice, passing the same params
    history.push(`/client/invoice?proj=${projectionId}&seats=${seats.join(',')}`);
  };

  // Muestra dos paneles, uno con detalles brutos de precios y otro formulario con pago
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="danger">
          <IonButtons slot="start">
            <IonBackButton defaultHref={`/client/seats/${projectionId}`} />
          </IonButtons>
          <IonTitle>Resumen y Pago</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="bg-light">
        <div className="container-xl py-4">
          <h4 className="mb-3 px-3">Resumen de Compra</h4>
          
          <IonList inset className="mb-4">
             <IonItem>
                <IonLabel>
                  <h2>Película de Prueba</h2>
                  <p>Sala 1 (2D) - 14:00 hrs</p>
                </IonLabel>
             </IonItem>
             <IonItem>
                <IonLabel>
                  <h2>Asientos seleccionados</h2>
                  <p>{seats.join(', ') || 'Ninguno'}</p>
                </IonLabel>
             </IonItem>
             <IonItem>
                <IonLabel>
                   Subtotal ({seats.length} x ₡{basePrice})
                </IonLabel>
                <IonNote slot="end" color="dark">₡{total.toLocaleString()}</IonNote>
             </IonItem>
             <IonItem>
                <IonLabel>Impuestos (13%)</IonLabel>
                <IonNote slot="end" color="dark">₡{taxes.toLocaleString()}</IonNote>
             </IonItem>
             <IonItem lines="none" className="bg-light">
                <IonLabel className="fw-bold fs-5">TOTAL A PAGAR</IonLabel>
                <IonLabel slot="end" color="danger" className="fw-bold text-end fs-5">
                  ₡{(total + taxes).toLocaleString()}
                </IonLabel>
             </IonItem>
          </IonList>

          <h4 className="mb-3 px-3">Método de Pago</h4>
          <div className="px-3">
            <div className="mb-3">
              <label className="form-label fw-semibold">Número de Tarjeta</label>
              <input
                type="tel"
                className="form-control"
                placeholder="0000 0000 0000 0000"
                value={cardNumber}
                onChange={e => setCardNumber(e.target.value)}
              />
            </div>
            <div className="row g-3">
              <div className="col-7">
                <label className="form-label fw-semibold">Fecha de Expiración</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={e => setExpiry(e.target.value)}
                />
              </div>
              <div className="col-5">
                <label className="form-label fw-semibold">CVV</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="123"
                  value={cvv}
                  onChange={e => setCvV(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="px-3 mt-4">
            <IonButton expand="block" color="success" size="large" onClick={handlePay}>
              Confirmar y Pagar
            </IonButton>
            <IonButton expand="block" fill="clear" color="medium" onClick={() => history.push('/home')} className="mt-2">
              Cancelar Compra
            </IonButton>
          </div>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default ClientPayment;