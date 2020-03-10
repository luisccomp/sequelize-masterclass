const { Sequelize } = require('sequelize');

// Loading database configurations from file
const dbConfig = require('../config/database');

// Carregando os modelos
const User = require('../models/User');
const Address = require('../models/Address');
const Tech = require('../models/Tech');


const connection = new Sequelize(dbConfig);

// Inicializando os modelos
User.init(connection);
Address.init(connection);
Tech.init(connection);

// Criando as associações entre as entidades no banco de dados
User.associate(connection.models);
Address.associate(connection.models);
Tech.associate(connection.models);

module.exports = connection;
