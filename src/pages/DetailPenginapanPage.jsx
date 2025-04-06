import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import PembayaranPage from './PembayaranPage';


function DetailPenginapanPage() {
  const { id } = useParams();
  const [penginapan, setPenginapan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState('https://67ed07c24387d9117bbbefd2.mockapi.io/penginapan');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://67ed07c24387d9117bbbefd2.mockapi.io/penginapan');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const selected = data.find(item => String(item.id) === String(id));

        setPenginapan(selected);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleBooking = () => {
    navigate(`/PembayaranPage/${penginapan.id}`);
  };

  if (loading) return <div className="loading-message">Loading detail penginapan...</div>;
  if (error) return <div className="error-message">Error: {error.message}</div>;
  if (!penginapan) return <div className="not-found-message">Penginapan tidak ditemukan.</div>;

  return (
    <div className="detail-page-container">
      <h2 className="detail-title">{penginapan.name}</h2>
      <p className="detail-address">Alamat: {penginapan.addres}</p>
      <p className="detail-rating">Rating: <span className="star-icon">⭐</span> {penginapan.rating}</p>
      <p className="detail-distance">Jarak dari tempat wisata: {penginapan.jarak} km</p>
      <div className="detail-facilities">
        <h3 className="facilities-title">Fasilitas:</h3>
        <ul className="facilities-list">
          {penginapan.fasilitas.map((fasilitas, index) => (
            <li key={index}>{fasilitas}</li>
          ))}
        </ul>
      </div>
      <p className="detail-price">Harga: Rp {penginapan.harga.toLocaleString()}</p>
      <div className="detail-images-container">
        {penginapan.image && penginapan.image.map((img, index) => (
          <img key={index} src={img} alt={`${penginapan.name} - ${index + 1}`} className="detail-image" />
        ))}
      </div>
      <Link to={`/PembayaranPage/${penginapan.id}`} className="booking-button">
        Booking Sekarang
      </Link>
    </div>
  );
}

export default DetailPenginapanPage;
