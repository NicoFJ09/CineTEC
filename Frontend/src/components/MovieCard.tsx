import React from 'react';
import { useHistory } from 'react-router-dom';
import { Movie } from '../models';
import './MovieCard.css';

// Props esperadas para configurar y mostrar la tarjeta de película
interface MovieCardProps {
  movie: Movie;
  variant: 'now' | 'upcoming';
  onClick?: (movie: Movie) => void;
}

// Renderiza un póster interactivo de la película con su información principal
const MovieCard: React.FC<MovieCardProps> = ({ movie, variant, onClick }) => {
  const history = useHistory();

  // Controla el clic en toda la tarjeta para abrir modales o detalles
  const handleClick = () => {
    if (variant === 'now' && onClick) {
      onClick(movie);
    }
  };

  // Previene que se dispare el click de la tarjeta y redirige a horarios
  const handleProjections = (e: React.MouseEvent) => {
    e.stopPropagation();
    history.push(`/client/projections/${movie.id}`);
  };

  // Contenedor principal de la tarjeta de película
  return (
    <div className="movie-card" onClick={handleClick} style={variant === 'now' ? { cursor: 'pointer' } : {}}>
      <div
        className={`movie-poster rounded${variant === 'upcoming' ? ' movie-poster-upcoming' : ''}`}
        style={movie.image ? { background: `url(${movie.image}) center/cover no-repeat` } : { background: movie.color }}
      />
      <h6 className="movie-card-title text-truncate">{movie.title}</h6>
      <small className="movie-card-genre text-truncate d-block">
        {movie.genre}{movie.duration ? ` · ${movie.duration}` : ''}
      </small>
      {variant === 'now'
        ? <button className="btn btn-danger btn-sm w-100 mt-1" onClick={handleProjections}>Ver proyecciones</button>
        : <span className="badge bg-secondary fw-normal mt-1 d-inline-block">{movie.date}</span>
      }
    </div>
  );
};

export default MovieCard;
