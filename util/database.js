const Sequelize = require('sequelize');

const postgresDb = process.env.POSTGRES_DB;
const username = process.env.POSTGRES_USER;
const password = process.env.POSTGRES_PASSWORD;

const sequelize = new Sequelize(postgresDb, username, password,
    {
        dialect: 'postgres',
        host: 'localhost',
        logging: false
    })


module.exports = sequelize;