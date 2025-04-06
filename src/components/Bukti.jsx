import React from 'react';

function Bukti({ bukti }) {
    return (
        <div className="printable" style={{ maxWidth: "600px", margin: "auto", padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "10px" }}>Pembayaran Berhasil!</h1>
            <p style={{ fontSize: "18px", marginBottom: "20px" }}>Terima kasih, pesanan kamu sedang diproses 🙌</p>

            <p><strong>Nama Pemesan:</strong> {bukti.nama}</p>
            <p><strong>Tanggal Check-In:</strong> {bukti.tanggal_check_in}</p>
            <p><strong>Durasi Menginap:</strong> {bukti.durasi} malam</p>

            <hr style={{ margin: "20px 0" }} />

            <h3 style={{ fontWeight: "bold", marginBottom: "10px" }}>Detail Pemesanan:</h3>
            <div style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "10px",
                marginBottom: "10px",
                display: "flex",
                justifyContent: "space-between"
            }}>
                <div>{bukti.penginapan}</div>
                <div>Rp {bukti.total_harga.toLocaleString()}</div>
            </div>

            <p><strong>Metode Pembayaran:</strong> {bukti.metode_pembayaran}</p>
            <p><strong>Tanggal Pembayaran:</strong> {bukti.tanggal_pembayaran}</p>

            <h2 style={{ fontWeight: "bold", marginTop: "20px" }}>Total: Rp {bukti.total_harga.toLocaleString()}</h2>

            <div style={{ marginTop: "30px", display: "flex", gap: "10px" }}>
                <button
                    onClick={() => window.print()}
                    className="print-button"
                    style={{
                        padding: "10px 20px",
                        border: "1px solid #999",
                        borderRadius: "6px",
                        backgroundColor: "#f8f8f8",
                        cursor: "pointer"
                    }}
                >
                    🖨 Cetak Struk
                </button>

                <button
                    onClick={() => window.location.href = '/'}
                    style={{
                        padding: "10px 20px",
                        border: "none",
                        borderRadius: "6px",
                        backgroundColor: "#D29F16",
                        color: "#fff",
                        fontWeight: "bold",
                        cursor: "pointer"
                    }}
                >
                    Kembali ke Beranda
                </button>
            </div>
        </div>
    );
}

export default Bukti;
