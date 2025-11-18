const sequelize = require('./config/db');
const User = require('./models/User');

sequelize.sync({ alter: true })
  .then(() => {
    console.log('✅ Database & tabel berhasil disinkronkan!');
    process.exit();
  })
  .catch(err => console.log('❌ Error sync:', err));
