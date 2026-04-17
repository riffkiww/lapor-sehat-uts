import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [stats, setStats] = useState({
    totalLaporan: 0,
    lokasiUnik: 0,
    terbaru: null
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/kesehatan');
      const data = response.data;
      
      // Hitung lokasi unik
      const lokasiSet = new Set(data.map(item => item.lokasi));
      
      setStats({
        totalLaporan: data.length,
        lokasiUnik: lokasiSet.size,
        terbaru: data[0] || null
      });
    } catch (error) {
      console.error('Gagal mengambil statistik:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial', minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ maxWidth: '1200px', margin: '0 auto 50px', width: '100%', textAlign: 'center', color: 'white' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 'bold', margin: '0 0 10px 0' }}>🏥 LaporSehat</h1>
        <p style={{ fontSize: '18px', opacity: 0.9, margin: 0 }}>Sistem Pelaporan Kesehatan Lingkungan Masyarakat</p>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          {/* Card: Total Laporan */}
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '12px',
            boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
            textAlign: 'center',
            transition: 'transform 0.3s'
          }}>
            <div style={{ fontSize: '40px', color: '#667eea', fontWeight: 'bold', marginBottom: '10px' }}>
              {stats.totalLaporan}
            </div>
            <div style={{ fontSize: '16px', color: '#555', fontWeight: 'bold' }}>Total Laporan</div>
            <div style={{ fontSize: '13px', color: '#999', marginTop: '5px' }}>Laporan yang telah masuk</div>
          </div>

          {/* Card: Lokasi Terdampak */}
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '12px',
            boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
            textAlign: 'center',
            transition: 'transform 0.3s'
          }}>
            <div style={{ fontSize: '40px', color: '#764ba2', fontWeight: 'bold', marginBottom: '10px' }}>
              {stats.lokasiUnik}
            </div>
            <div style={{ fontSize: '16px', color: '#555', fontWeight: 'bold' }}>Lokasi Terdampak</div>
            <div style={{ fontSize: '13px', color: '#999', marginTop: '5px' }}>Area berbeda yang dilaporkan</div>
          </div>

          {/* Card: Status Sistem */}
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '12px',
            boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
            textAlign: 'center',
            transition: 'transform 0.3s'
          }}>
            <div style={{ fontSize: '40px', color: '#27ae60', fontWeight: 'bold', marginBottom: '10px', }}>
              ✓
            </div>
            <div style={{ fontSize: '16px', color: '#555', fontWeight: 'bold' }}>Status Sistem</div>
            <div style={{ fontSize: '13px', color: '#27ae60', marginTop: '5px' }}>Sistem Aktif dan Berjalan</div>
          </div>
        </div>

        {/* Laporan Terbaru */}
        {stats.terbaru && (
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '12px',
            boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
            marginBottom: '40px',
            marginTop: '20px'
          }}>
            <h3 style={{ margin: '0 0 20px 0', color: '#333', fontSize: '20px' }}>📋 Laporan Terbaru</h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: '20px',
              alignItems: 'start'
            }}>
              <div>
                <p style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#999' }}>
                  {new Date(stats.terbaru.tanggal_dibuat).toLocaleString('id-ID')}
                </p>
                <p style={{ margin: '0 0 10px 0', fontSize: '18px', fontWeight: 'bold', color: '#333' }}>
                  📍 {stats.terbaru.lokasi}
                </p>
                <p style={{ margin: '0', fontSize: '14px', color: '#555', lineHeight: '1.5' }}>
                  {stats.terbaru.deskripsi}
                </p>
              </div>
              <img
                src={stats.terbaru.foto_url}
                alt="Laporan Terbaru"
                style={{
                  width: '150px',
                  height: '150px',
                  borderRadius: '8px',
                  objectFit: 'cover'
                }}
              />
            </div>
          </div>
        )}

        {/* CTA Button */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={() => navigate('/reports')}
            style={{
              padding: '15px 50px',
              fontSize: '18px',
              fontWeight: 'bold',
              color: 'white',
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            📝 Buat Laporan Baru / Lihat Semua Laporan
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
