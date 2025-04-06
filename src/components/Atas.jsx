import React from 'react';
import { Link } from 'react-router-dom';

function Atas() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Sewa Penginapan</div>
      <div className="navbar-nav">
        <ul>
          <li>
            <Link to="/">Beranda</Link>
          </li>
          {/* Tambahkan link navigasi lainnya jika perlu */}
        </ul>
      </div>
    </nav>
  );
}

export default Atas;