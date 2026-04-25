import React from 'react';
import { Sede } from '../models';
import './SedeSelector.css';

interface SedeSelectorProps {
  sedes: Sede[];
  selectedId: number;
  onSelect: (id: number) => void;
}

const SedeSelector: React.FC<SedeSelectorProps> = ({ sedes, selectedId, onSelect }) => {
  return (
    <section className="sede-section border-bottom">
      <div className="container-xl py-4">
        <h6 className="sede-heading">¿En qué cine quieres ver tu película?</h6>
        <div className="row g-3">
          {sedes.map(s => (
            <div key={s.id} className="col-12 col-md-4">
              <div
                className={`card sede-card h-100${s.id === selectedId ? ' sede-selected' : ''}`}
                onClick={() => onSelect(s.id)}
                role="button"
              >
                <div className="card-body py-3">
                  <div className="d-flex align-items-center justify-content-between mb-1">
                    <span className="sede-name">{s.name}</span>
                    {s.id === selectedId && (
                      <span className="badge bg-danger">Seleccionado</span>
                    )}
                  </div>
                  <div className="sede-meta">{s.address}</div>
                  <div className="sede-meta">{s.horario}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SedeSelector;
