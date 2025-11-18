const User = require('./models/User');
const sequelize = require('./config/db');
const bcrypt = require('bcrypt');

(async () => {
  try {
    const hashedPassword = await bcrypt.hash('123456', 10);

    await User.create({
      name: 'Yusuf',
      email: 'yusuf@example.com',
      password: hashedPassword
    });

    console.log('✅ User berhasil ditambahkan!');
    await sequelize.close();
  } catch (err) {
    console.error('❌ Error:', err.message);
  }
})();
