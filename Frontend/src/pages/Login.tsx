import { IonContent, IonPage } from '@ionic/react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { loginAdmin } from '../services/adminServices';
import './Login.css';

const Login: React.FC = () => {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const valido = await loginAdmin(username, password);
    if (valido) {
        alert('Login exitoso!');
        history.push('/home');
    } else {
        alert('Correo o contraseña incorrectos');
    }
};

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="login-container">
          <div className="card login-box shadow-sm">
            <div className="card-body p-4">

              <div className="text-center mb-4">
                <span className="logo-mark">C</span>
                <h5 className="fw-bold mt-2 mb-0">CineTEC</h5>
                <small className="text-muted">Panel de Administración</small>
              </div>

              <form onSubmit={e => { e.preventDefault(); handleLogin(); }}>
                <div className="mb-3">
                  <label className="form-label fw-semibold" htmlFor="username">
                    Usuario
                  </label>
                  <input
                    id="username"
                    type="text"
                    className="form-control"
                    placeholder="Ingresa tu usuario"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    autoComplete="username"
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold" htmlFor="password">
                    Contraseña
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="form-control"
                    placeholder="Ingresa tu contraseña"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    autoComplete="current-password"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-danger w-100"
                  disabled={!username || !password}
                >
                  Ingresar
                </button>
              </form>

              <div className="text-center mt-3">
                <button
                  className="btn btn-link btn-sm text-muted text-decoration-none"
                  onClick={() => history.push('/home')}
                >
                  ← Volver al inicio
                </button>
              </div>

            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
