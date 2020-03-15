const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
const sequelize = new Sequelize('spider', 'root', '123456', {
    host: 'localhost',
    port     :  3307,
    dialect: 'mysql',/* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize
   
