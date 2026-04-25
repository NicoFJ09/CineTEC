import React from 'react';
import { useHistory } from 'react-router-dom';
import './Navbar.css';

const INCLUDE_ADMIN = import.meta.env.VITE_INCLUDE_ADMIN === 'true';

interface NavbarProps {
  onScrollTo: (id: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onScrollTo }) => {
  const history = useHistory();
  const handleNav = (id: string) => onScrollTo(id);

  return (
    <>
      <nav className="cinetec-nav">
        <div className="nav-inner container-xl">
          <div className={`nav-bar${INCLUDE_ADMIN ? '' : ' nav-bar--no-admin'}`}>

            {/* Brand */}
            <div className="nav-brand">
              <img src="/Monkey.png" alt="Logo" style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
              <span className="nav-brand-name">CineTEC</span>
            </div>

            {/* Center links — desktop */}
            <div className="nav-center">
              <button className="nav-link-btn" onClick={() => handleNav('cartelera')}>
                Cartelera
              </button>
              <button className="nav-link-btn" onClick={() => handleNav('proximamente')}>
                Próximamente
              </button>
            </div>

            {/* Right — desktop */}
            {INCLUDE_ADMIN && (
              <div className="nav-end">
                <button
                  className="nav-admin-btn"
                  onClick={() => history.push('/login')}
                >
                  Admin
                </button>
              </div>
            )}

          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;