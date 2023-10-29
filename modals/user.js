const Sequelize = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const User = sequelize.define('User', {
  FirstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  LastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  DOB: {
    type: Sequelize.DATE,
    allowNull: false
  },
  Address: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

User.sync();

module.exports = User;