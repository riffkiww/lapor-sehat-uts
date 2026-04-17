import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;

  return (
    <nav style={{
      background: 'rgba(255, 255, 255, 0.88)',
      backdropFilter: 'blur(8px)',
      boxShadow: '0 10px 24px rgba(15, 23, 42, 0.08)',
      borderBottom: '1px solid #e5edf7',
      padding: '10px 18px',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
        <Link to="/" style={{ color: '#0f766e', fontWeight: '800', fontSize: '34px', letterSpacing: '-0.5px' }}>
          🏥 LaporSehat
        </Link>
        
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          <Link to="/" style={{
            padding: '8px 16px',
            color: isActive('/') ? '#0f766e' : '#374151',
            background: isActive('/') ? 'linear-gradient(135deg, #ccfbf1, #f0fdfa)' : 'transparent',
            border: isActive('/') ? '1px solid #99f6e4' : '1px solid transparent',
            borderRadius: '999px',
            fontWeight: isActive('/') ? '700' : '600',
            transition: 'all 0.2s ease'
          }}>
            📊 Dashboard
          </Link>
          
          <Link to="/reports" style={{
            padding: '8px 16px',
            color: isActive('/reports') ? '#0f766e' : '#374151',
            background: isActive('/reports') ? 'linear-gradient(135deg, #ccfbf1, #f0fdfa)' : 'transparent',
            border: isActive('/reports') ? '1px solid #99f6e4' : '1px solid transparent',
            borderRadius: '999px',
            fontWeight: isActive('/reports') ? '700' : '600',
            transition: 'all 0.2s ease'
          }}>
            📋 Laporan Lingkungan
          </Link>
          
          <Link to="/booking" style={{
            padding: '8px 16px',
            color: isActive('/booking') ? '#0f766e' : '#374151',
            background: isActive('/booking') ? 'linear-gradient(135deg, #ccfbf1, #f0fdfa)' : 'transparent',
            border: isActive('/booking') ? '1px solid #99f6e4' : '1px solid transparent',
            borderRadius: '999px',
            fontWeight: isActive('/booking') ? '700' : '600',
            transition: 'all 0.2s ease'
          }}>
            🏥 Booking Puskesmas
          </Link>
          
          <Link to="/monitoring" style={{
            padding: '8px 16px',
            color: isActive('/monitoring') ? '#0f766e' : '#374151',
            background: isActive('/monitoring') ? 'linear-gradient(135deg, #ccfbf1, #f0fdfa)' : 'transparent',
            border: isActive('/monitoring') ? '1px solid #99f6e4' : '1px solid transparent',
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
