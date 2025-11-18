const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/db');

// 🔹 import routes
const userRoutes = require('./routes/userRoutes');
const authRouter = require('./routes/authRouter');
const absenRoutes = require('./routes/absenRoutes'); // ✅ tambahkan ini

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Route test utama
app.get('/', (req, res) => {
  res.send('API Absen berjalan sukses 🚀');
});

// ✅ Mount routers
app.use('/api/users', userRoutes);
app.use('/api/auth', authRouter);
app.use('/api/absen', absenRoutes); // ✅ tambahkan ini juga

// ✅ Cek koneksi database
sequelize.authenticate()
  .then(() => console.log('✅ MySQL Connected'))
  .catch(err => console.log('❌ Database Error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
