-- ========== TABEL BOOKING PUSKESMAS ==========
CREATE TABLE IF NOT EXISTS `booking_puskesmas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nama` varchar(100) NOT NULL,
  `telepon` varchar(15) NOT NULL,
  `alamat` text NOT NULL,
  `layanan` varchar(50) NOT NULL,
  `tanggal` date NOT NULL,
  `jam` time NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ========== TABEL MONITORING PENYAKIT ==========
CREATE TABLE IF NOT EXISTS `monitoring_penyakit` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nama` varchar(100) NOT NULL,
  `penyakit` varchar(100) NOT NULL,
  `desa` varchar(100) NOT NULL,
  `tanggal_lapor` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ========== SAMPLE DATA BOOKING ==========
INSERT INTO `booking_puskesmas` (`nama`, `telepon`, `alamat`, `layanan`, `tanggal`, `jam`) VALUES
('Budi Santoso', '081234567890', 'Jl. Merdeka No. 123, Bandung', 'umum', '2026-04-20', '09:00'),
('Siti Nurhaliza', '082345678901', 'Jl. Sudirman No. 45, Bandung', 'vaksin', '2026-04-21', '10:00'),
('Ahmad Wijaya', '083456789012', 'Jl. Gatot Subroto No. 67, Bandung', 'ibu_hamil', '2026-04-22', '14:00');

-- ========== SAMPLE DATA MONITORING ==========
INSERT INTO `monitoring_penyakit` (`nama`, `penyakit`, `desa`) VALUES
('Rina Kusuma', 'Demam Berdarah', 'Desa Raya Bandung'),
('Hendra Gunawan', 'Diare', 'Desa Alun-Alun'),
('Lily Wijaya', 'ISPA', 'Desa Raya Bandung');
