import React, { useState } from 'react';
import { IonContent, IonPage, IonModal, IonButton, IonIcon } from '@ionic/react';
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
  { id: 1, title: 'Dune: Part Two',   genre: 'Ciencia Ficción', duration: '166 min', rating: 'PG-13', color: '#1e3a5f', image: 'https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Ftse2.mm.bing.net%2Fth%2Fid%2FOIP.CwXpQIVwcfJAYMWTsoKv-QHaK0%3Fpid%3DApi&sp=1777103908Td7cdd8f38a642d22e8e9297e03421d92dc46c63b6a87401aff69f7cb6f3dd251' },
  { id: 2, title: 'Oppenheimer',      genre: 'Drama · Historia', duration: '180 min', rating: 'R',     color: '#2a1800', image: 'https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fstatic1.srcdn.com%2Fwordpress%2Fwp-content%2Fuploads%2F2023%2F05%2Foppenheimer-poster.jpg&sp=1777103947T66ed9cd1c714f174cd6d12d6bcc5ee7e3ad17ac57c66f7dca715098d0c19022c' },
  { id: 3, title: 'Spider-Man',       genre: 'Acción · Aventura',duration: '148 min', rating: 'PG',    color: '#1a0a2e', image: 'https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fi.pinimg.com%2F736x%2F1f%2F44%2Fde%2F1f44dec1c1d28970cde8c8125cb8f054.jpg&sp=1777103978Tb7f41f7ed8a8d04dcf7cfa243445389d8f063c58c4657daf89b373824ae40f4f' },
  { id: 4, title: 'The Batman II',    genre: 'Acción · Crimen',  duration: '155 min', rating: 'PG-13', color: '#0d1b2e', image: 'https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fstatic1.cbrimages.com%2Fwordpress%2Fwp-content%2Fuploads%2F2025%2F01%2Fbatman-156-cover-header.jpg&sp=1777104038Tea382a71f281cf03f143dca2447afc3f5c33405d34d42ddf5cfb6b779736fe52' },
  { id: 5, title: 'Kung Fu Panda 5',  genre: 'Animación',        duration: '95 min',  rating: 'G',     color: '#1a2e0a', image: 'https://www.startpage.com/av/proxy-image?piurl=http%3A%2F%2Fsimplywallpaper.net%2Fpictures%2F2010%2F11%2F27%2FPo-Kung-Fu-Panda-wallpaper.jpg&sp=1777104078T8d8e314fbd3dd72d00ff035d06de6629a3504f90bcbb1a55636dee49b7a79c10' },
  { id: 6, title: 'Inception II',     genre: 'Ciencia Ficción',  duration: '162 min', rating: 'PG-13', color: '#1f1a2e', image: 'https://www.startpage.com/av/proxy-image?piurl=http%3A%2F%2Fimages2.fanpop.com%2Fimage%2Fphotos%2F14300000%2FInception-inception-2010-14355477-1680-1050.jpg&sp=1777104097T72f9ae1e424533377f4136f55df14d40c424ab1221f1f5c64fcb3d6a5944ad3f' },
];

const PROXIMAMENTE = [
  { id: 7,  title: 'Mission: Impossible 8', genre: 'Acción',    date: 'Mayo 2025',   color: '#2e1a0a', image: 'https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fcdn.revistafama.com%2Fuploads%2Fmedia%2F2023%2F07%2F13%2Finstagram-mission-impossible.jpg&sp=1777104138T09eb9e2095e47c0545e91e6ab81fce8f44b5185b8cbd91e6ec354ecafe5890a3' },
  { id: 8,  title: 'Inside Out 3',          genre: 'Animación', date: 'Junio 2025',  color: '#0a2e2a', image: 'https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fimages.thedirect.com%2Fmedia%2Fphotos%2Finsideout1_PGIQ0OW.png&sp=1777104223T8931127d585630dae1e62e32ee19c8bb0f3150fde75e8cf81f38bbbeb3e1ee86' },
  { id: 9,  title: 'Joker: Forever',        genre: 'Drama',     date: 'Julio 2025',  color: '#2e0a0a', image: 'https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2F2.bp.blogspot.com%2F-vJfJlFhzOo8%2FWbUkGVyPg9I%2FAAAAAAAAAFg%2Fk7jeCeGPeZIgi2RqOjl8-vdRZigwyPLmwCEwYBhgL%2Fs1600%2Fthe-joker.jpg&sp=1777104268T0c4aebed5f6adc3f987970615fa496ee52a83a8f6719b225e06c8a07c962246b' },
  { id: 10, title: 'Avatar 3',              genre: 'Aventura',  date: 'Agosto 2025', color: '#0a1e2e', image: 'https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fstatic1.moviewebimages.com%2Fwordpress%2Fwp-content%2Fuploads%2Fmovie%2F947EkBrn4gaYo1V8Z7iAhmxYsDkIdq.jpg&sp=1777105105T3e37d576999118c3bebe9c535931591be1318e59ede887fe76253828b9ffa52e' },
];

/* ── Component ───────────────────────────────────────────── */
// Vista de inicio para la selección de sede, navegación y cartelera actual/próxima
const Home: React.FC = () => {
  const [sedeId, setSedeId] = useState<number>(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const history = useHistory();

  // Mueve la ventana hacia el contenedor de id seleccionado suavemente
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

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

        {/* ── Footer ─────────────────────────────────────── */}
        <footer className="bg-dark border-top border-white border-opacity-10 py-3">
          <div className="container-xl d-flex align-items-center justify-content-between flex-wrap gap-2">
            <div className="d-flex align-items-center gap-2 text-white fw-bold small">
              <img src="https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp9905419.jpg&sp=1777104328Tba032a9027dc967c887833560ddac6e4035b9cf1d047a3192087d80ea52c8e2a" alt="Logo" style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' }} />
              CineTEC
            </div>
            <small className="text-secondary">
              Instituto Tecnológico de Costa Rica · CE3101 Bases de Datos · v1.0.0
            </small>
          </div>
        </footer>

      </IonContent>

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
