const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, '.env'), override: true });
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const mysql = require('mysql2/promise');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static(uploadsDir));

const upload = multer({ storage: multer.memoryStorage() });

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

app.get('/', (req, res) => {
    res.send('Backend LaporSehat Berjalan Lancar!');
});

app.post('/api/kesehatan', upload.single('foto_kondisi'), async (req, res) => {
    try {
        const { lokasi, deskripsi } = req.body;
        const file = req.file;

        if (!file) return res.status(400).json({ error: 'Foto kondisi lingkungan wajib diupload!' });

        const fileName = `kesehatan-${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`;

        // === KITA PAKSA MENGGUNAKAN AWS S3 ===
        console.log("Mencoba upload foto ke S3...");
        console.log("- Bucket:", process.env.S3_BUCKET_NAME);
        console.log("- Access Key terdeteksi:", process.env.AWS_ACCESS_KEY_ID ? "YA" : "TIDAK");

const uploadParams = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: fileName,
            Body: file.buffer,
            ContentType: file.mimetype,
        };

        // Mengirim ke AWS (Perhatikan, sudah tidak ada tanda // di depannya)
        await s3.send(new PutObjectCommand(uploadParams));
        console.log("✅ Upload S3 Berhasil!");

        // Buat URL AWS (Ini sudah memakai backtick ` yang benar)
        const fotoUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

        const query = 'INSERT INTO laporan_kesehatan (lokasi, deskripsi, foto_url) VALUES (?, ?, ?)';
        await db.execute(query, [lokasi, deskripsi, fotoUrl]);

        res.status(200).json({ message: 'Laporan kesehatan lingkungan berhasil dikirim ke AWS S3!', fotoUrl });


    } catch (error) {
        console.error('❌ ERROR AWS S3 TERTANGKAP:', error);
        res.status(500).json({ error: 'Gagal upload ke AWS. Cek terminal VS Code.' });
    }
});

app.get('/api/kesehatan', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM laporan_kesehatan ORDER BY id DESC');
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Gagal mengambil data dari database.' });
    }
});

// ========== BOOKING PUSKESMAS =========
app.post('/api/booking', async (req, res) => {
    try {
        const { nama, telepon, alamat, layanan, tanggal, jam } = req.body;

        if (!nama || !telepon || !alamat || !layanan || !tanggal || !jam) {
            return res.status(400).json({ error: 'Semua field harus diisi!' });
        }

        const query = 'INSERT INTO booking_puskesmas (nama, telepon, alamat, layanan, tanggal, jam) VALUES (?, ?, ?, ?, ?, ?)';
        await db.execute(query, [nama, telepon, alamat, layanan, tanggal, jam]);

        res.status(200).json({ message: 'Booking puskesmas berhasil dibuat!' });
    } catch (error) {
        console.error('Error Booking:', error);
        res.status(500).json({ error: 'Gagal membuat booking puskesmas.' });
    }
});

app.get('/api/booking', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM booking_puskesmas ORDER BY tanggal DESC, jam DESC');
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Gagal mengambil data booking.' });
    }
});

// ========== MONITORING PENYAKIT =========
app.post('/api/monitoring', async (req, res) => {
    try {
        const { nama, penyakit, desa } = req.body;

        if (!nama || !penyakit || !desa) {
            return res.status(400).json({ error: 'Semua field harus diisi!' });
        }

        const query = 'INSERT INTO monitoring_penyakit (nama, penyakit, desa) VALUES (?, ?, ?)';
        await db.execute(query, [nama, penyakit, desa]);

        res.status(200).json({ message: 'Laporan penyakit berhasil dicatat!' });
    } catch (error) {
        console.error('Error Monitoring:', error);
        res.status(500).json({ error: 'Gagal mencatat laporan penyakit.' });
    }
});

app.get('/api/monitoring', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM monitoring_penyakit ORDER BY tanggal_lapor DESC');
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Gagal mengambil data monitoring.' });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server Backend LaporSehat berjalan di port ${PORT}`);
});

// === RADAR PENDETEKSI ERROR ===
process.on('uncaughtException', (err) => {
    console.error('🚨 ERROR FATAL TERSEMBUNYI:', err);
});
process.on('unhandledRejection', (err) => {
    console.error('🚨 PROMISE BOCOR:', err);
});
process.on('exit', (code) => {
    console.log(`🛑 Mesin mati mendadak dengan kode exit: ${code}`);
});