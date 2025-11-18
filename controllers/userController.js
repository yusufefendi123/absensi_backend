const bcrypt = require('bcrypt');
const User = require('../models/User');

// GET semua user
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET user by id
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE user
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password, role } = req.body;

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });

    const hashedPassword = password ? await bcrypt.hash(password, 10) : user.password;

    await user.update({ username, password: hashedPassword, role });
    res.json({ message: 'User berhasil diupdate', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });

    await user.destroy();
    res.json({ message: 'User berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};