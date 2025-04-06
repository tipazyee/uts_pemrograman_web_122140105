import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function HalUtama() {
  const [daftarPenginapan, setDaftarPenginapan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState('https://67ed07c24387d9117bbbefd2.mockapi.io/penginapan'); // Pastikan server json-server berjalan

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        setDaftarPenginapan(json);
        setLoading(false);
        setError(null);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        setDaftarPenginapan(null);
      }
    };

    fetchData();
  }, ['https://67ed07c24387d9117bbbefd2.mockapi.io/penginapan']);

  if (loading) {
    return <div>Loading penginapan...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="homepage">
      <h1 className="homepage-title">Daftar Penginapan</h1>
      <div className="penginapan-list">
        {daftarPenginapan && daftarPenginapan.map((penginapan) => (
          <div key={penginapan.id} className="penginapan-card">
            <img src={penginapan.image} alt={penginapan.name} className="penginapan-image" />
            <div className="penginapan-info">
              <h3 className="penginapan-nama">{penginapan.nama}</h3>
              <p className="penginapan-harga">Harga: Rp {penginapan.harga.toLocaleString()}</p>
              <Link to={`/penginapan/${penginapan.id}`} className="lihat-detail-link">Lihat Detail</Link>
            </div>
          </div>
        ))}
        {!daftarPenginapan && !loading && !error && <div>Tidak ada data penginapan.</div>}
      </div>
    </div>
  );
}

export default HalUtama; // Pastikan export menggunakan 'Homepage'