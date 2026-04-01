import React, { useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import Navbar from '../components/Navbar';
import SedeSelector from '../components/SedeSelector';
import MovieCarousel from '../components/MovieCarousel';
import './Home.css';

/* ── Mock data (swap for API calls) ─────────────────────── */
const SEDES = [
  { id: 1, name: 'Plaza Mayor',    address: 'Av. Central, San José',      horario: '10:00 – 22:00' },
  { id: 2, name: 'Heredia Mall',   address: 'Ruta 3, Heredia',            horario: '10:00 – 21:30' },
  { id: 3, name: 'Alajuela Center',address: 'C.C. La Lima, Alajuela',     horario: '11:00 – 22:00' },
];

const CARTELERA = [
  { id: 1, title: 'Dune: Part Two',   genre: 'Ciencia Ficción', duration: '166 min', rating: 'PG-13', color: '#1e3a5f' },
  { id: 2, title: 'Oppenheimer',      genre: 'Drama · Historia', duration: '180 min', rating: 'R',     color: '#2a1800' },
  { id: 3, title: 'Spider-Man',       genre: 'Acción · Aventura',duration: '148 min', rating: 'PG',    color: '#1a0a2e' },
  { id: 4, title: 'The Batman II',    genre: 'Acción · Crimen',  duration: '155 min', rating: 'PG-13', color: '#0d1b2e' },
  { id: 5, title: 'Kung Fu Panda 5',  genre: 'Animación',        duration: '95 min',  rating: 'G',     color: '#1a2e0a' },
  { id: 6, title: 'Inception II',     genre: 'Ciencia Ficción',  duration: '162 min', rating: 'PG-13', color: '#1f1a2e' },
];

const PROXIMAMENTE = [
  { id: 7,  title: 'Mission: Impossible 8', genre: 'Acción',    date: 'Mayo 2025',   color: '#2e1a0a' },
  { id: 8,  title: 'Inside Out 3',          genre: 'Animación', date: 'Junio 2025',  color: '#0a2e2a' },
  { id: 9,  title: 'Joker: Forever',        genre: 'Drama',     date: 'Julio 2025',  color: '#2e0a0a' },
  { id: 10, title: 'Avatar 3',              genre: 'Aventura',  date: 'Agosto 2025', color: '#0a1e2e' },
];

/* ── Component ───────────────────────────────────────────── */
const Home: React.FC = () => {
  const [sedeId, setSedeId] = useState<number>(1);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const sede = SEDES.find(s => s.id === sedeId)!;

  return (
    <IonPage>
      <IonContent fullscreen scrollY>
        <Navbar onScrollTo={scrollTo} />

        <SedeSelector 
          sedes={SEDES} 
          selectedId={sedeId} 
          onSelect={setSedeId} 
        />

        <MovieCarousel
          id="cartelera"
          title="En cartelera"
          subtitle={`${sede.name} · ${sede.address}`}
          movies={CARTELERA}
          variant="now"
          className="bg-light"
        />

        <MovieCarousel
          id="proximamente"
          title="Próximamente"
          subtitle="Lo que viene en CineTEC"
          movies={PROXIMAMENTE}
          variant="upcoming"
          className="bg-white"
        />

        {/* ── Footer ─────────────────────────────────────── */}
        <footer className="bg-dark border-top border-white border-opacity-10 py-3">
          <div className="container-xl d-flex align-items-center justify-content-between flex-wrap gap-2">
            <div className="d-flex align-items-center gap-2 text-white fw-bold small">
              <span className="logo-mark">C</span>
              CineTEC
            </div>
            <small className="text-secondary">
              Instituto Tecnológico de Costa Rica · CE3101 Bases de Datos · v1.0.0
            </small>
          </div>
        </footer>

      </IonContent>
    </IonPage>
  );
};

export default Home;
