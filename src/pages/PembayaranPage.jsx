import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Bukti from '../components/Bukti';

function PembayaranPage() {
    const { id } = useParams();
    const [penginapan, setPenginapan] = useState(null);
    const [checkInDate, setCheckInDate] = useState('');
    const [duration, setDuration] = useState(1);
    const [totalHarga, setTotalHarga] = useState(0);
    const [pilihanPembayaran, setPilihanPembayaran] = useState('');
    const [bukti, setBuktiPembayaran] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [namaPemesan, setNamaPemesan] = useState('');

    const dataRekening = {
        BCA: "1234567890 a.n. SewaPenginapan",
        BNI: "9876543210 a.n. Sewa Penginapan",
        BRI: "1122334455 a.n. Sewa Penginapan",
        Mandiri: "5566778899 a.n. Sewa Penginapan",
        OVO: "0812-3456-7890 a.n. SewaPenginapan",
        DANA: "0813-2345-6789 a.n. SewaPenginapan",
        GoPay: "0814-5678-9012 a.n. SewaPenginapan",
        ShopeePay: "0815-6789-0123 a.n. SewaPenginapan"
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`https://67ed07c24387d9117bbbefd2.mockapi.io/penginapan/${id}`);
                if (!res.ok) throw new Error('Data tidak ditemukan atau server error');
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

    useEffect(() => {
        if (penginapan && checkInDate && duration > 0) {
            const hargaPerMalam = typeof penginapan.harga === 'string'
                ? parseInt(penginapan.harga.replace(/[^\d]/g, ''))
                : penginapan.harga || 0;
            setTotalHarga(hargaPerMalam * duration);
        } else {
            setTotalHarga(0);
        }
    }, [penginapan, checkInDate, duration]);

    const handleBooking = () => {
        if (pilihanPembayaran && totalHarga > 0 && namaPemesan) {
            const bukti = {
                nama_pemesan: namaPemesan,
                penginapan: penginapan.name,
                tanggal_check_in: checkInDate,
                durasi: duration,
                total_harga: totalHarga,
                metode_pembayaran: pilihanPembayaran,
                tanggal_pembayaran: new Date().toLocaleDateString(),
                nomor_rekening: dataRekening[pilihanPembayaran] || ''
            };
            setBuktiPembayaran(bukti);
            alert('Pembayaran berhasil!');
        } else {
            alert('Harap isi nama pemesan, pilih metode pembayaran, dan pastikan detail booking sudah benar.');
        }
    };

    if (loading) return <div className="p-4">Loading informasi booking...</div>;
    if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
    if (!penginapan) return <div className="p-4">Data penginapan tidak tersedia.</div>;
    if (bukti) return <Bukti bukti={bukti} />;

    return (
        <div className="payment-container">
            <h1 className="payment-title">Booking Penginapan: {penginapan.name}</h1>

            <div className="payment-details">
                <label htmlFor="namaPemesan" className="detail-item">Nama Pemesan:</label>
                <input
                    type="text"
                    id="namaPemesan"
                    value={namaPemesan}
                    onChange={(e) => setNamaPemesan(e.target.value)}
                    placeholder="Masukkan nama Anda"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>

            <div className="payment-detail">
                <label htmlFor="checkInDate" className="detail-item">Tanggal Check-In:</label>
                <input
                    type="date"
                    id="checkInDate"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>

            <div className="payment-detail">
                <label htmlFor="duration" className="detail-item">Durasi Menginap (malam):</label>
                <input
                    type="number"
                    id="duration"
                    value={duration}
                    onChange={(e) => setDuration(parseInt(e.target.value))}
                    min="1"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-32"
                />
            </div>

            <div className="payment-method">Total Harga: Rp {totalHarga.toLocaleString()}</div>

            <div className="payment-method">
                <label htmlFor="metodePembayaran" className="block text-gray-700 text-sm font-bold mb-2">Metode Pembayaran:</label>
                <select
                    id="metodePembayaran"
                    value={pilihanPembayaran}
                    onChange={(e) => setPilihanPembayaran(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                    <option value="">-- Pilih Metode Pembayaran --</option>

                    <optgroup label="Transfer Bank">
                        <option value="BCA">BCA</option>
                        <option value="BNI">BNI</option>
                        <option value="BRI">BRI</option>
                        <option value="Mandiri">Mandiri</option>
                    </optgroup>

                    <optgroup label="Kartu Kredit">
                        <option value="Visa">Visa</option>
                        <option value="MasterCard">MasterCard</option>
                    </optgroup>

                    <optgroup label="E-Wallet">
                        <option value="OVO">OVO</option>
                        <option value="DANA">DANA</option>
                        <option value="GoPay">GoPay</option>
                        <option value="ShopeePay">ShopeePay</option>
                    </optgroup>
                </select>
            </div>

            {pilihanPembayaran && dataRekening[pilihanPembayaran] && (
                <div className="account-info">
                    No. Rekening / E-Wallet: {dataRekening[pilihanPembayaran]}
                </div>
            )}

            <button
                onClick={handleBooking}
                className="confirm-payment-button"
            >
                Bayar Sekarang
            </button>
        </div>
    );
}

export default PembayaranPage;
