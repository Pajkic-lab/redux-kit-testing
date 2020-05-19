const Sequelize = require('sequelize');

module.exports = new Sequelize(
process.env.DB_NAME,
process.env.USER_NAME,
process.env.DB_PASSWORD,
   {
  host: 'localhost',
  dialect: 'postgres', //obrisi define ... bez define je default
  define: {
      timestamps: false
  }
});

