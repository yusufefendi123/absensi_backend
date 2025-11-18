const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Absen = sequelize.define('Absen', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  tanggal: {
    type: DataTypes.DATEONLY,
    defaultValue: DataTypes.NOW
  },
  waktu_masuk: {
    type: DataTypes.TIME,
    allowNull: true
  },
  waktu_keluar: {
    type: DataTypes.TIME,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('hadir', 'izin', 'sakit', 'alpa'),
    defaultValue: 'hadir'
  }
}, {
  tableName: 'absen',
  timestamps: true
});

Absen.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Absen;
