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
      const response = await axios.get('http://13.213.7.1:5050/api/kesehatan');
      const data = response.data;
      
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
    <div style={{ minHeight: '100vh', padding: '50px 20px', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
      {/* Header Baru */}
      <div style={{ maxWidth: '1200px', margin: '0 auto 50px', width: '100%', textAlign: 'center' }}>
        <h1 style={{ fontSize: '42px', fontWeight: '800', margin: '0 0 12px 0', color: '#0f766e', letterSpacing: '-1px' }}>
          🏥 Laporan Kesehatan
        </h1>
        <p style={{ fontSize: '18px', color: '#6b7280', margin: 0, fontWeight: '500' }}>
          Sistem Pelaporan Kesehatan Lingkungan Masyarakat
        </p>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        {/* Stats Cards dengan shadow yang lebih modern */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '40px' }}>
          
          {/* Card: Total Laporan */}
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '16px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025)',
            border: '1px solid #f1f5f9',
            textAlign: 'center',
            transition: 'transform 0.2s',
          }}>
            <div style={{ fontSize: '48px', color: '#0ea5e9', fontWeight: '800', marginBottom: '8px' }}>
              {stats.totalLaporan}
            </div>
            <div style={{ fontSize: '16px', color: '#334155', fontWeight: '700' }}>Total Laporan</div>
            <div style={{ fontSize: '13px', color: '#94a3b8', marginTop: '6px' }}>Laporan yang telah masuk</div>
          </div>

          {/* Card: Lokasi Terdampak */}
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '16px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025)',
            border: '1px solid #f1f5f9',
            textAlign: 'center',
            transition: 'transform 0.2s',
          }}>
            <div style={{ fontSize: '48px', color: '#8b5cf6', fontWeight: '800', marginBottom: '8px' }}>
              {stats.lokasiUnik}
            </div>
            <div style={{ fontSize: '16px', color: '#334155', fontWeight: '700' }}>Lokasi Terdampak</div>
            <div style={{ fontSize: '13px', color: '#94a3b8', marginTop: '6px' }}>Area berbeda yang dilaporkan</div>
          </div>

          {/* Card: Status Sistem */}
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '16px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025)',
            border: '1px solid #f1f5f9',
            textAlign: 'center',
            transition: 'transform 0.2s',
          }}>
            <div style={{ fontSize: '48px', color: '#10b981', fontWeight: '800', marginBottom: '8px' }}>
              ✓
            </div>
            <div style={{ fontSize: '16px', color: '#334155', fontWeight: '700' }}>Status Sistem</div>
            <div style={{ fontSize: '13px', color: '#10b981', marginTop: '6px', fontWeight: '600' }}>Aktif dan Berjalan</div>
          </div>
        </div>

        {/* Laporan Terbaru */}
        {stats.terbaru && (
          <div style={{
            background: 'white',
            padding: '32px',
            borderRadius: '16px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025)',
            border: '1px solid #f1f5f9',
            marginBottom: '40px'
          }}>
            <h3 style={{ margin: '0 0 24px 0', color: '#1e293b', fontSize: '20px', fontWeight: '700' }}>📋 Laporan Terbaru</h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: '24px',
              alignItems: 'start'
            }}>
              <div>
                <span style={{ display: 'inline-block', background: '#f1f5f9', padding: '6px 12px', borderRadius: '6px', fontSize: '13px', color: '#64748b', fontWeight: '600', marginBottom: '12px' }}>
                  {new Date(stats.terbaru.tanggal_dibuat).toLocaleString('id-ID')}
                </span>
                <p style={{ margin: '0 0 12px 0', fontSize: '20px', fontWeight: '800', color: '#0f766e' }}>
                  📍 {stats.terbaru.lokasi}
                </p>
                <p style={{ margin: '0', fontSize: '15px', color: '#475569', lineHeight: '1.6' }}>
                  {stats.terbaru.deskripsi}
                </p>
              </div>
              <img
                src={stats.terbaru.foto_url}
                alt="Laporan Terbaru"
                style={{
                  width: '160px',
                  height: '160px',
                  borderRadius: '12px',
                  objectFit: 'cover',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
            </div>
          </div>
        )}

        {/* CTA Button Baru */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={() => navigate('/reports')}
            style={{
              padding: '16px 40px',
              fontSize: '16px',
              fontWeight: '700',
              color: 'white',
              background: '#0f766e',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              boxShadow: '0 10px 15px -3px rgba(15, 118, 110, 0.3)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 20px 25px -5px rgba(15, 118, 110, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 10px 15px -3px rgba(15, 118, 110, 0.3)';
            }}
          >
            ➕ Buat Laporan Baru
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;