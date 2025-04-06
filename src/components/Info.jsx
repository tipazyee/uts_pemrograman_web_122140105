import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function Info() {
    const { id } = useParams();
    const [penginapan, setPenginapan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`https://67ed07c24387d9117bbbefd2.mockapi.io/penginapan${id}`);
                if (!res.ok) {
                    throw new Error('Gagal mengambil data');
                }
                const data = await res.json();
                setPenginapan(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) return <div>Loading detail penginapan...</div>;
    if (error) return <div className="text-red-500">Error: {error}</div>;
    if (!penginapan) return <div>Data penginapan tidak ditemukan</div>;

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4">{penginapan.name}</h1>
            {penginapan.image && (
                <img
                    src={`/images/${penginapan.image}`}
                    alt={penginapan.name}
                    className="w-full max-h-96 object-cover rounded-md mb-4"
                />
            )}
            <p className="mb-2">{penginapan.deskripsi}</p>
            <p className="mb-2">Alamat: {penginapan.alamat}</p>
            <p className="mb-2">Harga: Rp {parseInt(penginapan.harga).toLocaleString()}</p>

            <Link
                to={`/booking/${penginapan.id}`}
                className="inline-block bg-blue-500 hover:bg-blue-700 text-white py-3 px-6 rounded-md mt-4"
            >
                Booking Sekarang
            </Link>
        </div>
    );
}

export default Info;
