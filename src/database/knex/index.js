const config = require('../../../knexfile');
const knex = require('knex');

const connection = knex(config[process.env.NODE_ENV]);

module.exports = connection;
