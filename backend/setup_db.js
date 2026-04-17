const mysql = require('mysql2/promise');
require('dotenv').config();

async function setupDatabase() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

  try {
    console.log('📦 Membuat tabel booking_puskesmas...');
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS booking_puskesmas (
        id INT(11) NOT NULL AUTO_INCREMENT,
        nama VARCHAR(100) NOT NULL,
        telepon VARCHAR(15) NOT NULL,
        alamat TEXT NOT NULL,
        layanan VARCHAR(50) NOT NULL,
        tanggal DATE NOT NULL,
        jam TIME NOT NULL,
        created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci
    `);
    console.log('✅ Tabel booking_puskesmas berhasil dibuat');

    console.log('📦 Membuat tabel monitoring_penyakit...');
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS monitoring_penyakit (
        id INT(11) NOT NULL AUTO_INCREMENT,
        nama VARCHAR(100) NOT NULL,
        penyakit VARCHAR(100) NOT NULL,
        desa VARCHAR(100) NOT NULL,
        tanggal_lapor TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci
    `);
    console.log('✅ Tabel monitoring_penyakit berhasil dibuat');

    console.log('📄 Memasukkan sample data booking...');
    await connection.execute(`
      INSERT IGNORE INTO booking_puskesmas (nama, telepon, alamat, layanan, tanggal, jam) VALUES
      ('Budi Santoso', '081234567890', 'Jl. Merdeka No. 123, Bandung', 'umum', '2026-04-20', '09:00'),
      ('Siti Nurhaliza', '082345678901', 'Jl. Sudirman No. 45, Bandung', 'vaksin', '2026-04-21', '10:00');
    `);
    console.log('✅ Sample data booking berhasil ditambahkan');

    console.log('📄 Memasukkan sample data monitoring...');
    await connection.execute(`
      INSERT IGNORE INTO monitoring_penyakit (nama, penyakit, desa) VALUES
      ('Rina Kusuma', 'Demam Berdarah', 'Desa Raya Bandung'),
      ('Hendra Gunawan', 'Diare', 'Desa Alun-Alun');
    `);
    console.log('✅ Sample data monitoring berhasil ditambahkan');

    console.log('\n🎉 Database setup selesai!');
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await connection.end();
  }
}

setupDatabase();
