import { IonContent, IonPage } from '@ionic/react';
import { useMemo, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import './MovieManagement.css';

interface MovieForm {
    nombreOriginal: string;
    nombreComercial: string;
    imagen: string;
    duracion: string;
    protagonistas: string;
    director: string;
    clasificacion: string;
}

interface MovieItem extends MovieForm {
    id: number;
}

const EMPTY_FORM: MovieForm = {
    nombreOriginal: '',
    nombreComercial: '',
    imagen: '',
    duracion: '',
    protagonistas: '',
    director: '',
    clasificacion: 'PG-13'
};

const INITIAL_MOVIES: MovieItem[] = [
    {
        id: 1,
        nombreOriginal: 'Dune: Part Two',
        nombreComercial: 'Dune: Part Two',
        imagen: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
        duracion: '166',
        protagonistas: 'Timothee Chalamet, Zendaya',
        director: 'Denis Villeneuve',
        clasificacion: 'PG-13'
    },
    {
        id: 2,
        nombreOriginal: 'Inside Out 2',
        nombreComercial: 'Inside Out 2',
        imagen: 'https://image.tmdb.org/t/p/w500/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg',
        duracion: '97',
        protagonistas: 'Amy Poehler, Maya Hawke',
        director: 'Kelsey Mann',
        clasificacion: 'G'
    }
];

const MovieManagement: React.FC = () => {
    const [movies, setMovies] = useState<MovieItem[]>(INITIAL_MOVIES);
    const [form, setForm] = useState<MovieForm>(EMPTY_FORM);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [query, setQuery] = useState('');

    const filteredMovies = useMemo(() => {
        const safeQuery = query.toLowerCase().trim();
        if (!safeQuery) {
            return movies;
        }

        return movies.filter((movie) => {
            const source = [
                movie.nombreOriginal,
                movie.nombreComercial,
                movie.director,
                movie.clasificacion
            ]
                .join(' ')
                .toLowerCase();

            return source.includes(safeQuery);
        });
    }, [movies, query]);

    const isValidForm =
        form.nombreOriginal.trim() &&
        form.nombreComercial.trim() &&
        form.duracion.trim() &&
        form.protagonistas.trim() &&
        form.director.trim() &&
        form.clasificacion.trim();

    const handleChange = (field: keyof MovieForm, value: string) => {
        setForm((prev) => ({
            ...prev,
            [field]: value
        }));
    };

    const resetForm = () => {
        setForm(EMPTY_FORM);
        setEditingId(null);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!isValidForm) {
            return;
        }

        if (editingId !== null) {
            setMovies((prev) =>
                prev.map((movie) =>
                    movie.id === editingId
                        ? {
                                ...movie,
                                ...form
                            }
                        : movie
                )
            );
            resetForm();
            return;
        }

        const newMovie: MovieItem = {
            id: Date.now(),
            ...form
        };

        setMovies((prev) => [newMovie, ...prev]);
        resetForm();
    };

    const handleEdit = (movie: MovieItem) => {
        setEditingId(movie.id);
        setForm({
            nombreOriginal: movie.nombreOriginal,
            nombreComercial: movie.nombreComercial,
            imagen: movie.imagen,
            duracion: movie.duracion,
            protagonistas: movie.protagonistas,
            director: movie.director,
            clasificacion: movie.clasificacion
        });
    };

    const handleDelete = (id: number) => {
        setMovies((prev) => prev.filter((movie) => movie.id !== id));
        if (editingId === id) {
            resetForm();
        }
    };

    return (
        <IonPage>
            <IonContent>
                <AdminLayout subtitle="Gestión de cartelera">
                    <div className="movie-admin-grid">
                        <section className="movie-card-shell">
                            <div className="movie-card-shell__head">
                                <h3 className="mb-0">{editingId ? 'Editar película' : 'Registrar película'}</h3>
                                <small className="text-secondary">Vista prototipo lista para conectar lógica</small>
                            </div>

                            <form className="movie-form-grid" onSubmit={handleSubmit}>
                                <label>
                                    Nombre original
                                    <input
                                        value={form.nombreOriginal}
                                        onChange={(e) => handleChange('nombreOriginal', e.target.value)}
                                        className="form-control"
                                        placeholder="Ej: Gladiator II"
                                    />
                                </label>

                                <label>
                                    Nombre comercial
                                    <input
                                        value={form.nombreComercial}
                                        onChange={(e) => handleChange('nombreComercial', e.target.value)}
                                        className="form-control"
                                        placeholder="Ej: Gladiador II"
                                    />
                                </label>

                                <label>
                                    Imagen (URL)
                                    <input
                                        value={form.imagen}
                                        onChange={(e) => handleChange('imagen', e.target.value)}
                                        className="form-control"
                                        placeholder="https://..."
                                    />
                                </label>

                                <label>
                                    Duración (min)
                                    <input
                                        value={form.duracion}
                                        onChange={(e) => handleChange('duracion', e.target.value)}
                                        className="form-control"
                                        placeholder="120"
                                    />
                                </label>

                                <label>
                                    Protagonistas
                                    <input
                                        value={form.protagonistas}
                                        onChange={(e) => handleChange('protagonistas', e.target.value)}
                                        className="form-control"
                                        placeholder="Actor 1, Actor 2"
                                    />
                                </label>

                                <label>
                                    Director
                                    <input
                                        value={form.director}
                                        onChange={(e) => handleChange('director', e.target.value)}
                                        className="form-control"
                                        placeholder="Nombre del director"
                                    />
                                </label>

                                <label>
                                    Clasificación
                                    <select
                                        value={form.clasificacion}
                                        onChange={(e) => handleChange('clasificacion', e.target.value)}
                                        className="form-select"
                                    >
                                        <option value="G">G</option>
                                        <option value="PG">PG</option>
                                        <option value="PG-13">PG-13</option>
                                        <option value="R">R</option>
                                        <option value="+18">+18</option>
                                    </select>
                                </label>

                                <div className="movie-form-actions">
                                    <button type="submit" className="btn btn-danger" disabled={!isValidForm}>
                                        {editingId ? 'Guardar cambios' : 'Agregar película'}
                                    </button>
                                    <button type="button" className="btn btn-outline-secondary" onClick={resetForm}>
                                        Limpiar
                                    </button>
                                </div>
                            </form>
                        </section>

                        <section className="movie-card-shell">
                            <div className="movie-card-shell__head movie-card-shell__head--inline">
                                <h3 className="mb-0">Películas cargadas</h3>
                                <input
                                    className="form-control movie-search"
                                    placeholder="Buscar por título o director"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                            </div>

                            <div className="movie-list-grid">
                                {filteredMovies.length === 0 && (
                                    <div className="movie-empty-state">No hay resultados para la búsqueda.</div>
                                )}

                                {filteredMovies.map((movie) => (
                                    <article key={movie.id} className="movie-list-item">
                                        <div className="movie-poster">
                                            {movie.imagen ? (
                                                <img src={movie.imagen} alt={movie.nombreComercial} loading="lazy" />
                                            ) : (
                                                <span>Sin imagen</span>
                                            )}
                                        </div>
                                        <div className="movie-main-info">
                                            <h5>{movie.nombreComercial}</h5>
                                            <small className="text-secondary">Original: {movie.nombreOriginal}</small>
                                            <p className="mb-1 mt-2">
                                                <strong>Director:</strong> {movie.director}
                                            </p>
                                            <p className="mb-2">
                                                <strong>Protagonistas:</strong> {movie.protagonistas}
                                            </p>
                                            <div className="movie-tags">
                                                <span>{movie.duracion} min</span>
                                                <span>{movie.clasificacion}</span>
                                            </div>
                                        </div>
                                        <div className="movie-item-actions">
                                            <button className="btn btn-sm btn-outline-primary" onClick={() => handleEdit(movie)}>
                                                Editar
                                            </button>
                                            <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(movie.id)}>
                                                Eliminar
                                            </button>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </section>
                    </div>
                </AdminLayout>
            </IonContent>
        </IonPage>
    );
};

export default MovieManagement;
