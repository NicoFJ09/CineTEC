import React from 'react';
import { Movie } from '../models';
import MovieCard from './MovieCard';
import './MovieCarousel.css';

interface MovieCarouselProps {
  id?: string;
  title: string;
  subtitle: string;
  movies: Movie[];
  variant: 'now' | 'upcoming';
  className?: string;
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({
  id,
  title,
  subtitle,
  movies,
  variant,
  className = '',
}) => {
  return (
    <section id={id} className={`movie-carousel-section ${className}`}>
      <div className="container-xl py-4">
        <div className="mb-3">
          <h5 className="carousel-title">{title}</h5>
          <small className="carousel-subtitle">{subtitle}</small>
        </div>
        <div className="carousel-scroll d-flex gap-3 pb-1">
          {movies.map(m => (
            <MovieCard key={m.id} movie={m} variant={variant} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MovieCarousel;
