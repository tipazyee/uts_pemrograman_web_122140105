import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HalUtama from './pages/HalUtama'; // Pastikan nama komponen benar
import DetailPenginapanPage from './pages/DetailPenginapanPage';
import PembayaranPage from './pages/PembayaranPage';
import Navbar from './components/Atas';
import Footer from './components/Bawah';
import Bukti from './components/Bukti';
import './index.css'; // Import CSS

function App() {
    return (
        <Router>
            <Navbar className="navbar" /> {/* Contoh penggunaan class */}
            <div className="container mx-auto py-8"> {/* Contoh penggunaan class */}
                <Routes>
                    <Route path="/" element={<HalUtama />} />
                    <Route path="/penginapan/:id" element={<DetailPenginapanPage />} />
                    <Route path="/PembayaranPage/:id" element={<PembayaranPage />} />
                    <Route path="/bukti-pembayaran" element={<Bukti />} />
                </Routes>
            </div>
            <Footer className="footer" /> {/* Contoh penggunaan class */}
        </Router>
    );
}

export default App;