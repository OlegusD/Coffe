const Sequelize = require('sequelize');
const connection = require('./config.json');


const database = new Sequelize(
    connection.dev.database,
    connection.dev.user,
    connection.dev.password, {
        logging: false,
        host: connection.dev.host,
        dialect: connection.dev.dialect,
        port: connection.dev.port,
        ssl: connection.dev.ssl,
        dialectOptions: connection.dev.dialectOptions,
        operatorsAliases: false,
        pool: {
            max: 5,
            min: 0,
            idle: 10000,
        }
    });


module.exports = database;
