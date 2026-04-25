import React from 'react';
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonButton, IonIcon } from '@ionic/react';
import { useLocation, useHistory } from 'react-router-dom';
import { printOutline, homeOutline, checkmarkCircle } from 'ionicons/icons';

// Renderiza un boleto y resumen fiscal detallado con soporte para imprimir en PDF limpio
const ClientInvoice: React.FC = () => {
  const history = useHistory();
  const location = useLocation();

  // Extrae y procesa los datos finales de compra traidos por QueryString de cliente
  const searchParams = new URLSearchParams(location.search);
  const seatsParam = searchParams.get('seats');
  const projectionId = searchParams.get('proj');
  const txId = searchParams.get('tx') || Math.floor(Math.random() * 1000000000).toString();
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();
  
  // Realiza los cálculos monetarios finales aplicables y asientos totales 
  const seats = seatsParam ? seatsParam.split(',') : [];
  const basePrice = 3500; // Mock base price
  const total = seats.length * basePrice;
  const taxes = total * 0.13; // 13% tax
  const finalTotal = total + taxes;

  // Llama a la funcion estandar print html del navegador, aislada de CSS por media-print
  const handleDownloadPDF = () => {
    window.print();
  };

  // Limpia el flujo y manda al usuario a interactuar a la pagina principal inicial
  const handleGoHome = () => {
    history.push('/home');
  };

  // Muestra la interfaz final incluyendo titulos, comprobantes, calculos, y botones a home
  return (
    <IonPage>
      <IonHeader className="ion-no-border print-hide">
        <IonToolbar color="success">
          <IonTitle>¡Pago Exitoso!</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="bg-light">
        <div className="container-xl py-4 pb-5">
          
          <div className="text-center mb-4 print-hide">
            <IonIcon icon={checkmarkCircle} color="success" style={{ fontSize: '5rem' }} />
            <h3 className="fw-bold mt-2">Tu compra está confirmada</h3>
            <p className="text-muted">A continuación tu factura detallada.</p>
          </div>

          <div id="invoice-content" className="p-4 p-md-5 rounded shadow-sm border mx-auto" style={{ maxWidth: '600px', backgroundColor: '#ffffff', color: '#333333' }}>
            <div className="text-center mb-4">
              <div className="d-inline-flex align-items-center justify-content-center bg-danger text-white rounded p-2 mb-3" style={{ width: '40px', height: '40px', fontSize: '1.2rem', fontWeight: 'bold' }}>
                C
              </div>
              <h4 className="fw-bold m-0" style={{ color: '#000' }}>CineTEC</h4>
              <small style={{ color: '#666' }}>Instituto Tecnológico de Costa Rica</small>
            </div>

            <div className="d-flex justify-content-between border-bottom pb-3 mb-4">
              <div>
                <small className="d-block text-uppercase" style={{ color: '#666', fontSize: '0.75rem' }}>Factura / Ticket #</small>
                <span className="fw-bold" style={{ color: '#000', fontSize: '1.1rem' }}>{txId}</span>
              </div>
              <div className="text-end">
                <small className="d-block text-uppercase" style={{ color: '#666', fontSize: '0.75rem' }}>Fecha de Emisión</small>
                <span className="fw-bold" style={{ color: '#000', fontSize: '1.1rem' }}>{date} {time}</span>
              </div>
            </div>

            <div className="mb-4 bg-light p-3 rounded border">
              <h6 className="fw-bold text-danger mb-3 border-bottom pb-2">Detalles de la Función</h6>
              <div className="row g-3">
                <div className="col-6">
                  <small className="d-block text-uppercase" style={{ color: '#666', fontSize: '0.75rem' }}>Película</small>
                  <span className="fw-bold" style={{ color: '#000' }}>Película de Prueba</span>
                </div>
                <div className="col-6">
                  <small className="d-block text-uppercase" style={{ color: '#666', fontSize: '0.75rem' }}>Sala</small>
                  <span className="fw-bold" style={{ color: '#000' }}>Sala 1 (2D)</span>
                </div>
                <div className="col-6">
                  <small className="d-block text-uppercase" style={{ color: '#666', fontSize: '0.75rem' }}>Horario</small>
                  <span className="fw-bold" style={{ color: '#000' }}>14:00 hrs</span>
                </div>
                <div className="col-6">
                  <small className="d-block text-uppercase" style={{ color: '#666', fontSize: '0.75rem' }}>Asientos ({seats.length})</small>
                  <span className="fw-bold" style={{ color: '#000' }}>{seats.join(', ') || 'Ninguno'}</span>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h6 className="fw-bold text-danger mb-3 border-bottom pb-2">Desglose de Compra</h6>
              
              <div className="d-flex justify-content-between mb-2">
                <span style={{ color: '#555' }}>Subtotal ({seats.length} entradas)</span>
                <span className="fw-bold" style={{ color: '#000' }}>₡{total.toLocaleString()}</span>
              </div>
              
              <div className="d-flex justify-content-between mb-3">
                <span style={{ color: '#555' }}>IVA (13%)</span>
                <span className="fw-bold" style={{ color: '#000' }}>₡{taxes.toLocaleString()}</span>
              </div>
              
              <div className="d-flex justify-content-between pt-3 border-top bg-light p-2 rounded">
                <span className="fw-bold fs-5" style={{ color: '#000' }}>Total Pagado</span>
                <span className="fw-bold text-danger fs-5">₡{finalTotal.toLocaleString()}</span>
              </div>
            </div>

            <div className="text-center mt-5 small" style={{ color: '#888' }}>
              ¡Gracias por elegir CineTEC! Debes presentar este comprobante o el código QR digital en taquilla.
            </div>
          </div>

          <div className="d-flex gap-3 justify-content-center mt-4 print-hide mx-auto" style={{ maxWidth: '600px' }}>
            <IonButton color="dark" fill="outline" className="flex-fill" onClick={handleDownloadPDF}>
              <IonIcon icon={printOutline} slot="start" />
              Generar PDF
            </IonButton>
            <IonButton color="danger" className="flex-fill" onClick={handleGoHome}>
              <IonIcon icon={homeOutline} slot="start" />
              Ir al Inicio
            </IonButton>
          </div>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default ClientInvoice;