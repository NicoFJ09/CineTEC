import React, { useState } from 'react';
import { IonContent, IonPage, IonModal, IonButton, IonIcon, IonFooter } from '@ionic/react';
import { closeCircleOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SedeSelector from '../components/SedeSelector';
import MovieCarousel from '../components/MovieCarousel';
import { Movie } from '../models';
import './Home.css';

/* ── Mock data ─────────────────────── */
const SEDES = [
  { id: 1, name: 'Plaza Mayor',    address: 'Av. Central, San José',      horario: '10:00 – 22:00' },
  { id: 2, name: 'Heredia Mall',   address: 'Ruta 3, Heredia',            horario: '10:00 – 21:30' },
  { id: 3, name: 'Alajuela Center',address: 'C.C. La Lima, Alajuela',     horario: '11:00 – 22:00' },
];

const CARTELERA = [
  { id: 1, title: 'Dune: Part Two',   genre: 'Ciencia Ficción',  duration: '166 min', rating: 'PG-13', color: '#1e3a5f', image: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg' },
  { id: 2, title: 'Oppenheimer',      genre: 'Drama · Historia',  duration: '180 min', rating: 'R',     color: '#2a1800', image: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg' },
  { id: 3, title: 'Spider-Man',       genre: 'Acción · Aventura', duration: '148 min', rating: 'PG',    color: '#1a0a2e', image: 'https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg' },
  { id: 4, title: 'The Batman',       genre: 'Acción · Crimen',   duration: '155 min', rating: 'PG-13', color: '#0d1b2e', image: 'https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg' },
  { id: 5, title: 'Kung Fu Panda 4',  genre: 'Animación',         duration: '94 min',  rating: 'PG',    color: '#1a2e0a', image: 'https://image.tmdb.org/t/p/w500/kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg' },
  { id: 6, title: 'Inception',        genre: 'Ciencia Ficción',   duration: '148 min', rating: 'PG-13', color: '#1f1a2e', image: 'https://image.tmdb.org/t/p/w500/xlaY2zyzMfkhk0HSC5VUwzoZPU1.jpg' },
];

const PROXIMAMENTE = [
  { id: 7,  title: 'Mission: Impossible 8', genre: 'Acción',    date: 'Mayo 2025',   color: '#2e1a0a', image: 'https://image.tmdb.org/t/p/w500/NNxYkU70HPurnNCSiCjYAmacwm.jpg' },
  { id: 8,  title: 'Inside Out 2',          genre: 'Animación', date: 'Junio 2025',  color: '#0a2e2a', image: 'https://image.tmdb.org/t/p/w500/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg' },
  { id: 9,  title: 'Joker: Folie à Deux',   genre: 'Drama',     date: 'Julio 2025',  color: '#2e0a0a', image: 'https://image.tmdb.org/t/p/w500/aciP8Km0waTLXEYf5ybFK5CSUxl.jpg' },
  { id: 10, title: 'Avatar: The Way of Water', genre: 'Aventura', date: 'Agosto 2025', color: '#0a1e2e', image: 'https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg' },
];

/* ── Component ───────────────────────────────────────────── */
// Vista de inicio para la selección de sede, navegación y cartelera actual/próxima
const Home: React.FC = () => {
  const [sedeId, setSedeId] = useState<number>(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const history = useHistory();

  // Cierra el modal y redirige a las proyecciones de la película actual
  const handleProjections = () => {
    if (selectedMovie) {
      history.push(`/client/projections/${selectedMovie.id}`);
      setSelectedMovie(null);
    }
  };

  const sede = SEDES.find(s => s.id === sedeId)!;

  // Renderiza el contenido envolvente, modales y headers
  return (
    <IonPage>
      <IonContent fullscreen scrollY style={{ '--background': '#ffffff' }}>
        <Navbar />

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
          onSelectMovie={setSelectedMovie}
        />

        <MovieCarousel
          id="proximamente"
          title="Próximamente"
          subtitle="Lo que viene en CineTEC"
          movies={PROXIMAMENTE}
          variant="upcoming"
          className="bg-white"
        />

      </IonContent>

      <IonFooter className="bg-dark border-top border-white border-opacity-10 py-3">
        <div className="container-xl d-flex align-items-center justify-content-between flex-wrap gap-2">
          <div className="d-flex align-items-center gap-2 text-white fw-bold small">
            <img src="/monkey.png" alt="Logo" style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' }} />
            CineTEC
          </div>
          <small className="text-secondary">
            Instituto Tecnológico de Costa Rica · CE3101 Bases de Datos · v1.0.0
          </small>
        </div>
      </IonFooter>

      {/* Movie Info Modal */}
      <IonModal 
        isOpen={!!selectedMovie} 
        onDidDismiss={() => setSelectedMovie(null)} 
        className="custom-movie-modal"
      >
        <div className="p-4 bg-white text-dark" style={{ maxHeight: '90vh', overflowY: 'auto', borderRadius: '16px' }}>
          {selectedMovie && (
            <>
              <div className="d-flex justify-content-between align-items-start mb-3">
                <h3 className="mb-0 fw-bold">{selectedMovie.title}</h3>
                <IonIcon 
                  icon={closeCircleOutline} 
                  size="large" 
                  color="medium" 
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelectedMovie(null)} 
                />
              </div>
              
              <div 
                className="rounded mb-3" 
                style={{ 
                  background: selectedMovie.image ? `url(${selectedMovie.image}) center/cover no-repeat` : selectedMovie.color, 
                  height: '200px', 
                  width: '100%' 
                }}
              ></div>

              <div className="d-flex gap-2 mb-3 flex-wrap">
                <span className="badge bg-danger">{selectedMovie.genre}</span>
                {selectedMovie.duration && <span className="badge bg-secondary">{selectedMovie.duration}</span>}
                {selectedMovie.rating && <span className="badge bg-dark">{selectedMovie.rating}</span>}
              </div>

              <p className="text-muted" style={{ fontSize: '0.95rem', lineHeight: '1.5' }}>
                Esta es una sinopsis de prueba. {selectedMovie.title} es una de las opciones más esperadas en la cartelera actual, brindando una experiencia inmersiva con nuestra tecnología de proyección y un audio envolvente. ¡No te la pierdas!
              </p>

              <IonButton expand="block" color="danger" className="mt-4" onClick={handleProjections}>
                Ver proyecciones
              </IonButton>
            </>
          )}
        </div>
      </IonModal>
    </IonPage>
  );
};

export default Home;
