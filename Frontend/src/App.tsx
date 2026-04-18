import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Suspense, lazy } from 'react';
import Home from './pages/Home';
import AdminHome from './pages/AdminHome';
import MovieManagement from './pages/MovieManagement';
import TheatersManagement from './pages/TheatersManagement';
import ScreeningManagement from './pages/ScreeningManagement';

const INCLUDE_ADMIN = import.meta.env.VITE_INCLUDE_ADMIN === 'true';
const Login = INCLUDE_ADMIN ? lazy(() => import('./pages/Login')) : null;

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Dark mode */
import '@ionic/react/css/palettes/dark.system.css';

/* Bootstrap CSS */
import 'bootstrap/dist/css/bootstrap.min.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route
          exact
          path="/login"
          render={() =>
            INCLUDE_ADMIN && Login ? (
              <Suspense fallback={null}>
                <Login />
              </Suspense>
            ) : (
              <Redirect to="/admin" />
            )
          }
        />
        <Route exact path="/admin">
          <AdminHome />
        </Route>
        <Route exact path="/admin/movies">
          <MovieManagement />
        </Route>
        <Route exact path="/admin/theaters">
          <TheatersManagement />
        </Route>
        <Route exact path="/admin/screening">
          <ScreeningManagement />
        </Route>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;