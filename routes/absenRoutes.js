const express = require('express');
const router = express.Router();
const absenController = require('../controllers/absenController');

router.get('/', absenController.getAllAbsen);
router.get('/:id', absenController.getAbsenById);
router.post('/', absenController.createAbsen);
router.put('/:id', absenController.updateAbsen);
router.delete('/:id', absenController.deleteAbsen);

// 🔹 Tambahan endpoint untuk absen pulang otomatis
router.post('/pulang/:id', absenController.absenPulang);

module.exports = router;
