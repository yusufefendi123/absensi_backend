const Absen = require('../models/Absen');

// ✅ Ambil semua data absen
exports.getAllAbsen = async (req, res) => {
  try {
    const data = await Absen.findAll();
    res.json({ message: '✅ Semua data absen berhasil diambil', data });
  } catch (error) {
    res.status(500).json({ message: '❌ Gagal mengambil data absen', error: error.message });
  }
};

// ✅ Ambil data absen berdasarkan ID
exports.getAbsenById = async (req, res) => {
  try {
    const data = await Absen.findByPk(req.params.id);
    if (!data) return res.status(404).json({ message: '❌ Data tidak ditemukan' });
    res.json({ message: '✅ Data absen ditemukan', data });
  } catch (error) {
    res.status(500).json({ message: '❌ Gagal mengambil data absen', error: error.message });
  }
};

// ✅ Tambah data absen (otomatis waktu masuk)
exports.createAbsen = async (req, res) => {
  try {
    const { user_id, status } = req.body;
    if (!user_id) {
      return res.status(400).json({ message: "user_id wajib diisi" });
    }

    const now = new Date();

    let waktuMasuk = null;

    // Jika status hadir → isi otomatis
    if (status === "hadir") {
      waktuMasuk = now.toTimeString().slice(0, 8);
    }

    const data = await Absen.create({
      user_id,
      tanggal: now,
      status: status || "hadir",
      waktu_masuk: waktuMasuk
    });

    res.status(201).json({
      message: "✅ Absen berhasil ditambahkan",
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: "❌ Gagal menambahkan absen",
      error: error.message,
    });
  }
};
 

// ✅ Edit data absen (ubah waktu masuk, keluar, status, dll)
exports.updateAbsen = async (req, res) => {
  try {
    const { id } = req.params;
    const absen = await Absen.findByPk(id);

    if (!absen) return res.status(404).json({ message: '❌ Data absen tidak ditemukan' });

    // Update field yang dikirim dari body
    await absen.update(req.body);

    res.json({ message: '✅ Data absen berhasil diperbarui', absen });
  } catch (error) {
    res.status(500).json({ message: '❌ Gagal memperbarui data absen', error: error.message });
  }
};

// ✅ Hapus data absen
exports.deleteAbsen = async (req, res) => {
  try {
    const { id } = req.params;
    const absen = await Absen.findByPk(id);

    if (!absen) return res.status(404).json({ message: '❌ Data absen tidak ditemukan' });

    await absen.destroy();
    res.json({ message: '🗑️ Data absen berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: '❌ Gagal menghapus data absen', error: error.message });
  }
};

// ✅ Absen pulang (otomatis waktu keluar sekarang)
exports.absenPulang = async (req, res) => {
  try {
    const absen = await Absen.findByPk(req.params.id);
    if (!absen) return res.status(404).json({ message: '❌ Data absen tidak ditemukan' });

    const now = new Date();
    await absen.update({ waktu_keluar: now.toTimeString().slice(0, 8) });

    res.json({ message: '✅ Waktu pulang berhasil disimpan', absen });
  } catch (error) {
    res.status(500).json({ message: '❌ Gagal mengupdate waktu pulang', error: error.message });
  }
};
