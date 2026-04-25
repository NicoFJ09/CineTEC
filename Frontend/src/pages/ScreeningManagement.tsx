import { IonContent, IonPage } from '@ionic/react';
import { useMemo, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import './ScreeningManagement.css';

interface ScreeningForm {
    peliculaId: string;
    sucursal: string;
    sala: string;
    fecha: string;
    hora: string;
}

interface ScreeningItem extends ScreeningForm {
    id: number;
}

const MOVIES = [
    { id: 'm1', nombre: 'Dune: Part Two', duracion: '166 min' },
    { id: 'm2', nombre: 'Inside Out 3', duracion: '97 min' },
    { id: 'm3', nombre: 'Oppenheimer', duracion: '180 min' }
];

const BRANCHES = [
    {
        name: 'Plaza Mayor',
        rooms: [
            { id: 'S1', label: 'Sala 1', capacity: 180 },
            { id: 'S2', label: 'Sala 2', capacity: 140 }
        ]
    },
    {
        name: 'Heredia Mall',
        rooms: [
            { id: 'S3', label: 'Sala 3', capacity: 120 },
            { id: 'S4', label: 'Sala 4', capacity: 100 }
        ]
    },
    {
        name: 'Alajuela Center',
        rooms: [
            { id: 'S5', label: 'Sala 5', capacity: 130 },
            { id: 'S6', label: 'Sala 6', capacity: 110 }
        ]
    }
];

const EMPTY_FORM: ScreeningForm = {
    peliculaId: '',
    sucursal: '',
    sala: '',
    fecha: '',
    hora: ''
};

const ScreeningManagement: React.FC = () => {
    const [form, setForm] = useState<ScreeningForm>(EMPTY_FORM);
    const [screenings, setScreenings] = useState<ScreeningItem[]>([]);

    const selectedBranch = useMemo(
        () => BRANCHES.find((branch) => branch.name === form.sucursal),
        [form.sucursal]
    );

    const availableRooms = selectedBranch?.rooms ?? [];

    const selectedRoom = useMemo(
        () => availableRooms.find((room) => room.id === form.sala),
        [availableRooms, form.sala]
    );

    const isValidForm =
        form.peliculaId && form.sucursal && form.sala && form.fecha && form.hora;

    const handleChange = (field: keyof ScreeningForm, value: string) => {
        setForm((prev) => {
            const draft: ScreeningForm = {
                ...prev,
                [field]: value
            };

            if (field === 'sucursal') {
                draft.sala = '';
            }

            return draft;
        });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!isValidForm) {
            return;
        }

        const newScreening: ScreeningItem = {
            id: Date.now(),
            ...form
        };

        setScreenings((prev) => [newScreening, ...prev]);
        setForm((prev) => ({
            ...EMPTY_FORM,
            sucursal: prev.sucursal
        }));
    };

    const removeScreening = (id: number) => {
        setScreenings((prev) => prev.filter((screening) => screening.id !== id));
    };

    return (
        <IonPage>
            <IonContent>
                <div style={{ backgroundColor: '#0f172a' }} className="text-white py-4">
                    <div className="container-xl d-flex align-items-center gap-3">
                        <img src="https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp9905419.jpg&sp=1777104328Tba032a9027dc967c887833560ddac6e4035b9cf1d047a3192087d80ea52c8e2a" alt="Logo" style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover', marginRight: '8px' }} />
                        <div>
                            <h1 className="fw-bold mb-0">Administración CineTEC</h1>
                            <small className="text-secondary">Programación de proyecciones</small>
                        </div>
                    </div>
                </div>

                <AdminLayout>
                    <div className="screening-grid">
                        <section className="screening-card-shell">
                            <div className="screening-card-shell__head">
                                <h3 className="mb-0">Asignar proyección</h3>
                                <small className="text-secondary">
                                    Flujo visual para conectar POST posteriormente
                                </small>
                            </div>

                            <form className="screening-form" onSubmit={handleSubmit}>
                                <label>
                                    Película
                                    <select
                                        className="form-select"
                                        value={form.peliculaId}
                                        onChange={(e) => handleChange('peliculaId', e.target.value)}
                                    >
                                        <option value="">Seleccionar...</option>
                                        {MOVIES.map((movie) => (
                                            <option key={movie.id} value={movie.id}>
                                                {movie.nombre} ({movie.duracion})
                                            </option>
                                        ))}
                                    </select>
                                </label>

                                <label>
                                    Sucursal
                                    <select
                                        className="form-select"
                                        value={form.sucursal}
                                        onChange={(e) => handleChange('sucursal', e.target.value)}
                                    >
                                        <option value="">Seleccionar...</option>
                                        {BRANCHES.map((branch) => (
                                            <option key={branch.name} value={branch.name}>
                                                {branch.name}
                                            </option>
                                        ))}
                                    </select>
                                </label>

                                <label>
                                    Sala
                                    <select
                                        className="form-select"
                                        value={form.sala}
                                        onChange={(e) => handleChange('sala', e.target.value)}
                                        disabled={!form.sucursal}
                                    >
                                        <option value="">Seleccionar...</option>
                                        {availableRooms.map((room) => (
                                            <option key={room.id} value={room.id}>
                                                {room.label} ({room.capacity} asientos)
                                            </option>
                                        ))}
                                    </select>
                                </label>

                                <label>
                                    Fecha
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={form.fecha}
                                        onChange={(e) => handleChange('fecha', e.target.value)}
                                    />
                                </label>

                                <label>
                                    Hora
                                    <input
                                        type="time"
                                        className="form-control"
                                        value={form.hora}
                                        onChange={(e) => handleChange('hora', e.target.value)}
                                    />
                                </label>

                                <button type="submit" className="btn btn-danger" disabled={!isValidForm}>
                                    Crear proyección
                                </button>
                            </form>
                        </section>

                        <section className="screening-card-shell">
                            <div className="screening-card-shell__head">
                                <h3 className="mb-0">Proyecciones creadas</h3>
                                <small className="text-secondary">
                                    Vista prototipo lista para conectar GET posteriormente
                                </small>
                            </div>

                            <div className="screening-list-head">
                                <h5 className="mb-0">
                                    {selectedRoom
                                        ? `Sala seleccionada: ${selectedRoom.label} (${selectedRoom.capacity} asientos)`
                                        : 'Selecciona una sala para ver capacidad'}
                                </h5>
                            </div>

                            <div className="screening-list">
                                {screenings.length === 0 && (
                                    <div className="screening-empty">Aún no has agregado proyecciones.</div>
                                )}

                                {screenings.map((screening) => {
                                    const movie = MOVIES.find((item) => item.id === screening.peliculaId);
                                    const branch = BRANCHES.find((item) => item.name === screening.sucursal);
                                    const room = branch?.rooms.find((item) => item.id === screening.sala);
                                    return (
                                        <article key={screening.id} className="screening-item">
                                            <div>
                                                <h6>{movie?.nombre ?? 'Película'}</h6>
                                                <small className="text-secondary">
                                                    {screening.fecha} · {screening.hora}
                                                </small>
                                                <p className="mb-0 mt-2">
                                                    {screening.sucursal} / {room?.label ?? 'Sala'}
                                                </p>
                                            </div>
                                            <button
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() => removeScreening(screening.id)}
                                            >
                                                Eliminar
                                            </button>
                                        </article>
                                    );
                                })}
                            </div>
                        </section>
                    </div>
                </AdminLayout>
            </IonContent>
        </IonPage>
    );
};

export default ScreeningManagement;
