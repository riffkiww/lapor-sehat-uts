import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;

  return (
    <nav style={{
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(12px)',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
      borderBottom: '1px solid #e2e8f0',
      padding: '12px 20px',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
        {/* LOGO BARU */}
        <Link to="/" style={{ color: '#0f766e', fontWeight: '800', fontSize: '26px', letterSpacing: '-0.5px' }}>
          🏥 Laporan Kesehatan
        </Link>
        
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          <Link to="/" style={{
            padding: '8px 16px',
            color: isActive('/') ? '#0f766e' : '#475569',
            background: isActive('/') ? '#ccfbf1' : 'transparent',
            borderRadius: '999px',
            fontWeight: isActive('/') ? '700' : '600',
            transition: 'all 0.2s ease'
          }}>
            📊 Dashboard
          </Link>
          
          <Link to="/reports" style={{
            padding: '8px 16px',
            color: isActive('/reports') ? '#0f766e' : '#475569',
            background: isActive('/reports') ? '#ccfbf1' : 'transparent',
            borderRadius: '999px',
            fontWeight: isActive('/reports') ? '700' : '600',
            transition: 'all 0.2s ease'
          }}>
            📋 Laporan Lingkungan
          </Link>
          
          <Link to="/booking" style={{
            padding: '8px 16px',
            color: isActive('/booking') ? '#0f766e' : '#475569',
            background: isActive('/booking') ? '#ccfbf1' : 'transparent',
            borderRadius: '999px',
            fontWeight: isActive('/booking') ? '700' : '600',
            transition: 'all 0.2s ease'
          }}>
            🏥 Booking Puskesmas
          </Link>
          
          <Link to="/monitoring" style={{
            padding: '8px 16px',
            color: isActive('/monitoring') ? '#0f766e' : '#475569',
            background: isActive('/monitoring') ? '#ccfbf1' : 'transparent',
            borderRadius: '999px',
            fontWeight: isActive('/monitoring') ? '700' : '600',
            transition: 'all 0.2s ease'
          }}>
            🩺 Monitoring Penyakit
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;