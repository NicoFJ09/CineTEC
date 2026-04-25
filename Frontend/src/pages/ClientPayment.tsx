import React, { useState } from 'react';
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonButton } from '@ionic/react';
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

      <IonContent style={{ '--background': '#ffffff', '--color': '#111827' }}>
        <div className="container-xl py-4" style={{ color: '#111827', backgroundColor: '#ffffff' }}>
          <h4 className="mb-3 px-3" style={{ color: '#111827' }}>Resumen de Compra</h4>

          <div className="card border mx-3 mb-4" style={{ backgroundColor: '#111827', borderColor: '#334155' }}>
            <div className="card-body p-0">
              <div className="px-3 py-3 border-bottom" style={{ borderColor: '#334155' }}>
                <div className="fw-semibold" style={{ color: '#f1f5f9' }}>Película de Prueba</div>
                <div className="small" style={{ color: '#94a3b8' }}>Sala 1 (2D) · 14:00 hrs</div>
              </div>
              <div className="px-3 py-3 border-bottom" style={{ borderColor: '#334155' }}>
                <div className="fw-semibold" style={{ color: '#f1f5f9' }}>Asientos seleccionados</div>
                <div className="small" style={{ color: '#94a3b8' }}>{seats.join(', ') || 'Ninguno'}</div>
              </div>
              <div className="px-3 py-2 border-bottom d-flex justify-content-between align-items-center" style={{ borderColor: '#334155' }}>
                <span style={{ color: '#cbd5e1' }}>Subtotal ({seats.length} × ₡{basePrice.toLocaleString()})</span>
                <span style={{ color: '#f1f5f9' }}>₡{total.toLocaleString()}</span>
              </div>
              <div className="px-3 py-2 border-bottom d-flex justify-content-between align-items-center" style={{ borderColor: '#334155' }}>
                <span style={{ color: '#cbd5e1' }}>Impuestos (13%)</span>
                <span style={{ color: '#f1f5f9' }}>₡{taxes.toLocaleString()}</span>
              </div>
              <div className="px-3 py-3 d-flex justify-content-between align-items-center">
                <span className="fw-bold fs-5" style={{ color: '#f1f5f9' }}>TOTAL A PAGAR</span>
                <span className="fw-bold fs-5" style={{ color: '#f87171' }}>₡{(total + taxes).toLocaleString()}</span>
              </div>
            </div>
          </div>

          <h4 className="mb-3 px-3" style={{ color: '#111827' }}>Método de Pago</h4>
          <div className="px-3">
            <div className="mb-3">
              <label className="form-label fw-semibold" style={{ color: '#111827' }}>Número de Tarjeta</label>
              <input
                type="tel"
                className="form-control"
                placeholder="0000 0000 0000 0000"
                style={{ color: '#111827', backgroundColor: '#ffffff' }}
                value={cardNumber}
                onChange={e => setCardNumber(e.target.value)}
              />
            </div>
            <div className="row g-3">
              <div className="col-7">
                <label className="form-label fw-semibold" style={{ color: '#111827' }}>Fecha de Expiración</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="MM/YY"
                  style={{ color: '#111827', backgroundColor: '#ffffff' }}
                  value={expiry}
                  onChange={e => setExpiry(e.target.value)}
                />
              </div>
              <div className="col-5">
                <label className="form-label fw-semibold" style={{ color: '#111827' }}>CVV</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="123"
                  style={{ color: '#111827', backgroundColor: '#ffffff' }}
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