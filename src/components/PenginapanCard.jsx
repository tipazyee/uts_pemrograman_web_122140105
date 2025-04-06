import React from 'react';
import { Link } from 'react-router-dom';

function PenginapanCard({ penginapan }) {
    const hargaMulaiDari = penginapan.harga ? penginapan.harga.split(' - ')[0] : 'Harga tidak tersedia';

    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-xl font-semibold mb-2">{penginapan.name}</h3>
            <p className="text-gray-600 mb-2">Harga Mulai dari: {hargaMulaiDari}</p>
            {penginapan.image && <img src={`/images/${penginapan.image}`} alt={penginapan.name} className="w-full h-32 object-cover rounded-md mb-2" />}
            <Link to={`/penginapan/${penginapan.id}`} className="inline-block bg-teal-500 hover:bg-teal-700 text-white py-2 px-4 rounded">
                Lihat Detail
            </Link>
        </div>
    );
}

export default PenginapanCard;