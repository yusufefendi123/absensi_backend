// config/db.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME, // nama database dari .env
  process.env.DB_USER, // user MySQL
  process.env.DB_PASS, // password MySQL
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false, // biar console nggak rame
  }
);

// Tes koneksi ke database
sequelize.authenticate()
  .then(() => console.log('✅ MySQL Connected'))
  .catch(err => console.error('❌ DB Connection Error:', err));

module.exports = sequelize;
