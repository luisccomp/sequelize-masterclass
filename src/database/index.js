const { Sequelize } = require('sequelize');

// Loading database configurations from file
const dbConfig = require('../config/database');
const User = require('../models/User');


const connection = new Sequelize(dbConfig);

User.init(connection);

module.exports = connection;
