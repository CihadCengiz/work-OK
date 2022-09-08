const { Sequelize } = require('sequelize');
require('dotenv').config()


const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
          rejectUnauthorized: false,
        }
      }
  });

module.exports = sequelize;