import React, { useState } from 'react';
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonInput, IonItem, IonLabel, IonButton, IonList, IonNote } from '@ionic/react';
import { useLocation, useHistory } from 'react-router-dom';

const ClientPayment: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvV] = useState('');

  // Parse parameters
  const searchParams = new URLSearchParams(location.search);
  const seatsParam = searchParams.get('seats');
  const projectionId = searchParams.get('proj');
  
  const seats = seatsParam ? seatsParam.split(',') : [];
  const basePrice = 3500; // Mock base price
  const total = seats.length * basePrice;
  const taxes = total * 0.13; // 13% tax

  const handlePay = () => {
    alert('¡Pago exitoso! Disfruta la función.');
    history.push('/home'); // Return to home prototype
  };

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
          <IonList inset>
            <IonItem>
              <IonLabel position="floating">Número de Tarjeta</IonLabel>
              <IonInput 
                type="tel" 
                placeholder="0000 0000 0000 0000" 
                value={cardNumber} 
                onIonChange={e => setCardNumber(e.detail.value!)} 
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Fecha de Expiración</IonLabel>
              <IonInput 
                type="text" 
                placeholder="MM/YY" 
                value={expiry} 
                onIonChange={e => setExpiry(e.detail.value!)} 
              />
            </IonItem>
            <IonItem lines="none">
              <IonLabel position="floating">CVV</IonLabel>
              <IonInput 
                type="password" 
                placeholder="123" 
                value={cvv} 
                onIonChange={e => setCvV(e.detail.value!)} 
              />
            </IonItem>
          </IonList>

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