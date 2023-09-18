const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize('generador_crud', 'admin', '', {
//   host: 'localhost',
//   dialect: 'mysql',
//   port: 3306,
//   define: {
//     freezeTableName: true
//   },
//   logging: false
// });

const sequelize = new Sequelize('pruebacrud', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
  define: {
    freezeTableName: true
  },
  logging: false
});

module.exports = sequelize;