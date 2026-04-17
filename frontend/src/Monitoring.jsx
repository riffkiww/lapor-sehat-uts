import { useState, useEffect } from 'react';
import axios from 'axios';

function Monitoring() {
  const [nama, setNama] = useState('');
  const [penyakit, setPenyakit] = useState('');
  const [desa, setDesa] = useState('');
  const [daftarMonitoring, setDaftarMonitoring] = useState([]);
  const [loading, setLoading] = useState(false);

  const daftarPenyakit = [
    'Demam Berdarah',
    'Malaria',
    'Diare',
    'ISPA',
    'Tuberkulosis',
    'COVID-19',
    'Tifoid',
    'Lainnya'
  ];

  const fetchMonitoring = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/monitoring');
      setDaftarMonitoring(response.data || []);
    } catch (error) {
      console.error("Gagal mengambil data monitoring:", error);
      setDaftarMonitoring([]);
    }
  };

  useEffect(() => {
    fetchMonitoring();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/monitoring', {
        nama,
        penyakit,
        desa
      });
      alert('Berhasil lapor penyakit! ' + response.data.message);
      
      setNama('');
      setPenyakit('');
      setDesa('');
      fetchMonitoring();
    } catch (error) {
      alert('Gagal membuat laporan penyakit!');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial', padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '30px' }}>🩺 Monitoring Penyakit Masyarakat</h2>
      
      <div style={{ display: 'flex', gap: '40px', marginTop: '30px', flexWrap: 'wrap' }}>
        
        <div style={{ flex: '1', minWidth: '300px', padding: '20px', border: '2px solid #e74c3c', borderRadius: '8px', background: '#fff5f5' }}>
          <h3 style={{ color: '#e74c3c', marginTop: 0 }}>📢 Lapor Penyakit</h3>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <label style={{ fontWeight: 'bold' }}>Nama Pelapor:</label><br/>
              <input type="text" required value={nama} onChange={(e) => setNama(e.target.value)} style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ddd' }} />
            </div>

            <div>
              <label style={{ fontWeight: 'bold' }}>Jenis Penyakit:</label><br/>
              <select value={penyakit} onChange={(e) => setPenyakit(e.target.value)} required style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ddd' }}>
                <option value="">-- Pilih Penyakit --</option>
                {daftarPenyakit.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label style={{ fontWeight: 'bold' }}>Desa/Kelurahan:</label><br/>
              <input type="text" required value={desa} onChange={(e) => setDesa(e.target.value)} placeholder="Contoh: Desa Raya Bandung" style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ddd' }} />
            </div>
            
            <button type="submit" disabled={loading} style={{ padding: '10px', background: loading ? '#ccc' : '#e74c3c', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
              {loading ? 'Memproses...' : '⚠️ Kirim Laporan Penyakit'}
            </button>
          </form>
        </div>

        <div style={{ flex: '1', minWidth: '300px' }}>
          <h3 style={{ color: '#2c3e50', marginTop: 0 }}>📊 Monitoring Penyakit ({daftarMonitoring.length})</h3>
          {daftarMonitoring.length === 0 ? (
            <p style={{ color: '#999', fontStyle: 'italic' }}>Belum ada laporan penyakit.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxHeight: '600px', overflowY: 'auto' }}>
              {daftarMonitoring.map((item) => (
                <div key={item.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', background: '#fff9f0', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                  <p style={{ margin: 0, fontWeight: 'bold', color: '#e74c3c' }}>🩺 {item.penyakit}</p>
                  <p style={{ margin: '5px 0', fontSize: '14px' }}>Pelapor: {item.nama}</p>
                  <p style={{ margin: '5px 0', fontSize: '14px' }}>📍 {item.desa}</p>
                  <p style={{ margin: '5px 0', fontSize: '12px', color: '#666' }}>
                    {new Date(item.tanggal_lapor).toLocaleString('id-ID')}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Monitoring;
