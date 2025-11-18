const bcrypt = require('bcrypt');
const User = require('../models/User');

// ============================
// REGISTER
// ============================
exports.register = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // cek username sudah dipakai belum
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser)
      return res.status(400).json({ message: 'Username sudah digunakan' });

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // buat user baru
    const newUser = await User.create({
      username,
      password: hashedPassword,
      role: role || 'pegawai'
    });

    res.status(201).json({
      message: '✅ Registrasi berhasil',
      user: {
        id: newUser.id,
        username: newUser.username,
        role: newUser.role
      }
    });
  } catch (error) {
    res.status(500).json({
      message: '❌ Terjadi kesalahan saat registrasi',
      error: error.message
    });
  }
};

// ============================
// LOGIN (tanpa JWT)
// ============================
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user)
      return res.status(404).json({ message: '❌ User tidak ditemukan' });

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass)
      return res.status(401).json({ message: '❌ Password salah' });

    res.json({
      message: '✅ Login berhasil',
      user: { id: user.id, username: user.username, role: user.role }
    });
  } catch (error) {
    res.status(500).json({
      message: '❌ Terjadi kesalahan saat login',
      error: error.message
    });
  }
};

// ============================
// LOGOUT (sederhana, tanpa JWT)
// ============================
exports.logout = async (req, res) => {
  try {
    // di sisi frontend kamu cukup hapus data user dari sessionStorage / localStorage
    res.json({ message: '✅ Logout berhasil, silakan login kembali.' });
  } catch (error) {
    res.status(500).json({
      message: '❌ Terjadi kesalahan saat logout',
      error: error.message
    });
  }
};
