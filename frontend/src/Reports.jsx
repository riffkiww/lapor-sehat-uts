import { useState, useEffect } from 'react';
import axios from 'axios';

function Reports() {
  const [lokasi, setLokasi] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [foto, setFoto] = useState(null);
  const [daftarLaporan, setDaftarLaporan] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchLaporan = async () => {
    try {
      // ✅ Kabel 1 (GET) sudah di 5050
      const response = await axios.get('http://13.213.7.1:5050/api/kesehatan');
      setDaftarLaporan(response.data);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    }
  };

  useEffect(() => {
    fetchLaporan();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData();
    formData.append('lokasi', lokasi);
    formData.append('deskripsi', deskripsi);
    formData.append('foto_kondisi', foto);

    try {
      // ✅ Kabel 2 (POST) SEKARANG SUDAH DI 5050!
      const response = await axios.post('http://13.213.7.1:5050/api/kesehatan', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Berhasil: ' + response.data.message);
      
      setLokasi('');
      setDeskripsi('');
      setFoto(null);
      fetchLaporan();
    } catch (error) {
      alert('Gagal mengirim laporan! Pastikan backend berjalan.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '32px 20px 40px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ color: '#0f172a', fontSize: '34px', fontWeight: '800', letterSpacing: '-0.6px' }}>Sistem Laporan Kesehatan Lingkungan</h2>
        <p style={{ color: '#64748b', marginTop: '6px' }}>Kirim laporan baru dan pantau laporan warga dalam satu panel.</p>
      </div>
      
      <div style={{ display: 'flex', gap: '22px', marginTop: '22px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        
        <div style={{
          flex: '1 1 360px',
          minWidth: '320px',
          padding: '24px',
          border: '1px solid #bbf7d0',
          borderRadius: '18px',
          background: 'linear-gradient(180deg, #f0fdf4 0%, #ffffff 100%)',
          boxShadow: '0 16px 30px rgba(15, 118, 110, 0.10)'
        }}>
          <h3 style={{ color: '#047857', marginBottom: '14px', fontSize: '26px', fontWeight: '800', letterSpacing: '-0.3px' }}>Buat Laporan Baru</h3>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ fontWeight: '700', color: '#0f172a' }}>Lokasi / Alamat</label><br/>
              <input type="text" required value={lokasi} onChange={(e) => setLokasi(e.target.value)} style={{ marginTop: '6px', width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
            </div>
            
            <div>
              <label style={{ fontWeight: '700', color: '#0f172a' }}>Deskripsi Masalah</label><br/>
              <textarea required value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} placeholder="Contoh: Genangan air, limbah, nyamuk, dll..." style={{ marginTop: '6px', height: '96px', width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
            </div>
            
            <div>
              <label style={{ fontWeight: '700', color: '#0f172a' }}>Upload Bukti Foto</label><br/>
              <input type="file" required accept="image/*" onChange={(e) => setFoto(e.target.files[0])} style={{ marginTop: '6px', padding: '8px 0', border: 'none', background: 'transparent' }}/>
            </div>
            
            <button type="submit" disabled={loading} style={{
              padding: '12px 16px',
              background: loading ? '#94a3b8' : 'linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              fontWeight: '700',
              fontSize: '15px',
              boxShadow: loading ? 'none' : '0 10px 20px rgba(20, 184, 166, 0.30)',
              marginTop: '10px'
            }}>
              {loading ? 'Mengirim...' : '📤 Kirim Laporan'}
            </button>
          </form>
        </div>

        <div style={{ flex: '1 1 420px', minWidth: '320px' }}>
          <h3 style={{ color: '#0f172a', marginTop: 0, fontSize: '24px', fontWeight: '800' }}>Daftar Laporan Masuk ({daftarLaporan.length})</h3>
          {daftarLaporan.length === 0 ? (
            <p style={{ color: '#64748b', fontStyle: 'italic', marginTop: '12px' }}>Belum ada laporan.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxHeight: '680px', overflowY: 'auto', paddingRight: '6px', marginTop: '10px' }}>
              {daftarLaporan.map((laporan) => (
                <div key={laporan.id} style={{
                  border: '1px solid #dbe3ee',
                  background: '#ffffff',
                  padding: '16px',
                  borderRadius: '14px',
                  boxShadow: '0 10px 18px rgba(15, 23, 42, 0.06)'
                }}>
                  <p style={{ color: '#0f172a', marginBottom: '8px' }}><strong>📍 Lokasi:</strong> {laporan.lokasi}</p>
                  <p style={{ color: '#334155', marginBottom: '8px', lineHeight: '1.5' }}><strong>📝 Deskripsi:</strong> {laporan.deskripsi}</p>
                  <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '10px' }}>🕐 {new Date(laporan.tanggal_dibuat).toLocaleString('id-ID')}</p>
                  {laporan.foto_url && (
                    <img src={laporan.foto_url} alt="Bukti Laporan" style={{ width: '100%', maxHeight: '170px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #e2e8f0' }} />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Reports;