import { useState, useEffect } from 'react';
import axios from 'axios';

function Booking() {
  const [nama, setNama] = useState('');
  const [telepon, setTelepon] = useState('');
  const [alamat, setAlamat] = useState('');
  const [layanan, setLayanan] = useState('umum');
  const [tanggal, setTanggal] = useState('');
  const [jam, setJam] = useState('09:00');
  const [daftarBooking, setDaftarBooking] = useState([]);
  const [loading, setLoading] = useState(false);

  const layananPuskesmas = [
    { id: 'umum', label: 'Pemeriksaan Umum', harga: 'Gratis' },
    { id: 'gigi', label: 'Pemeriksaan Gigi', harga: 'Rp 50.000' },
    { id: 'ibu_hamil', label: 'Pemeriksaan Ibu Hamil', harga: 'Gratis' },
    { id: 'vaksin', label: 'Vaksinasi', harga: 'Gratis' },
  ];

  const fetchBooking = async () => {
    try {
      const response = await axios.get('http://13.213.7.1:5050/api/booking');
      setDaftarBooking(response.data || []);
    } catch (error) {
      console.error("Gagal mengambil data booking:", error);
      setDaftarBooking([]);
    }
  };

  useEffect(() => {
    fetchBooking();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/booking', {
        nama,
        telepon,
        alamat,
        layanan,
        tanggal,
        jam
      });
      alert('Berhasil booking! ' + response.data.message);
      
      setNama('');
      setTelepon('');
      setAlamat('');
      setLayanan('umum');
      setTanggal('');
      setJam('09:00');
      fetchBooking();
    } catch (error) {
      alert('Gagal membuat booking!');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getLayananLabel = (id) => layananPuskesmas.find(l => l.id === id)?.label || id;

  return (
    <div style={{ fontFamily: 'Arial', padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '30px' }}>🏥 Booking Layanan Puskesmas</h2>
      
      <div style={{ display: 'flex', gap: '40px', marginTop: '30px', flexWrap: 'wrap' }}>
        
        <div style={{ flex: '1', minWidth: '300px', padding: '20px', border: '2px solid #3498db', borderRadius: '8px', background: '#f0f8ff' }}>
          <h3 style={{ color: '#3498db', marginTop: 0 }}>📅 Form Booking</h3>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <label style={{ fontWeight: 'bold' }}>Nama Lengkap:</label><br/>
              <input type="text" required value={nama} onChange={(e) => setNama(e.target.value)} style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ddd' }} />
            </div>
            
            <div>
              <label style={{ fontWeight: 'bold' }}>Nomor Telepon:</label><br/>
              <input type="tel" required value={telepon} onChange={(e) => setTelepon(e.target.value)} style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ddd' }} />
            </div>

            <div>
              <label style={{ fontWeight: 'bold' }}>Alamat:</label><br/>
              <textarea required value={alamat} onChange={(e) => setAlamat(e.target.value)} style={{ width: '100%', padding: '8px', marginTop: '5px', height: '60px', borderRadius: '4px', border: '1px solid #ddd' }} />
            </div>
            
            <div>
              <label style={{ fontWeight: 'bold' }}>Jenis Layanan:</label><br/>
              <select value={layanan} onChange={(e) => setLayanan(e.target.value)} style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ddd' }}>
                {layananPuskesmas.map(l => (
                  <option key={l.id} value={l.id}>{l.label} ({l.harga})</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ fontWeight: 'bold' }}>Tanggal:</label><br/>
              <input type="date" required value={tanggal} onChange={(e) => setTanggal(e.target.value)} style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ddd' }} />
            </div>

            <div>
              <label style={{ fontWeight: 'bold' }}>Jam:</label><br/>
              <input type="time" required value={jam} onChange={(e) => setJam(e.target.value)} style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ddd' }} />
            </div>
            
            <button type="submit" disabled={loading} style={{ padding: '10px', background: loading ? '#ccc' : '#3498db', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
              {loading ? 'Memproses...' : '✓ Konfirmasi Booking'}
            </button>
          </form>
        </div>

        <div style={{ flex: '1', minWidth: '300px' }}>
          <h3 style={{ color: '#2c3e50', marginTop: 0 }}>📋 Daftar Booking ({daftarBooking.length})</h3>
          {daftarBooking.length === 0 ? (
            <p style={{ color: '#999', fontStyle: 'italic' }}>Belum ada booking.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxHeight: '600px', overflowY: 'auto' }}>
              {daftarBooking.map((booking) => (
                <div key={booking.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', background: '#f9f9f9', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                  <p style={{ margin: 0, fontWeight: 'bold' }}>{booking.nama}</p>
                  <p style={{ margin: '5px 0', fontSize: '14px' }}>📞 {booking.telepon}</p>
                  <p style={{ margin: '5px 0', fontSize: '14px' }}>🏥 {getLayananLabel(booking.layanan)}</p>
                  <p style={{ margin: '5px 0', fontSize: '14px' }}>📅 {new Date(booking.tanggal).toLocaleDateString('id-ID')} - {booking.jam}</p>
                  <p style={{ margin: '5px 0', fontSize: '12px', color: '#666' }}>Status: <span style={{ background: '#e8f5e9', padding: '2px 8px', borderRadius: '4px', color: '#27ae60', fontWeight: 'bold' }}>Terjadwal</span></p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Booking;
