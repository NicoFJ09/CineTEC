import React from 'react';
import { useHistory } from 'react-router-dom';
import './Navbar.css';

const INCLUDE_ADMIN = import.meta.env.VITE_INCLUDE_ADMIN === 'true';

const Navbar: React.FC = () => {
  const history = useHistory();

  return (
    <>
      <nav className="cinetec-nav">
        <div className="nav-inner container-xl">
          <div className="nav-bar-simple">

            <div className="nav-brand">
              <img src="/monkey.png" alt="Logo" style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
              <span className="nav-brand-name">CineTEC</span>
            </div>

            {INCLUDE_ADMIN && (
              <button className="nav-admin-btn" onClick={() => history.push('/login')}>
                Admin
              </button>
            )}

          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;