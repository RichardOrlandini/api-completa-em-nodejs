const config = require("../../../knexfile"); //Arquivo de config do knex
const knex = require("knex"); //chamando a biblioteca do knex
const connection = knex(config.development);
module.exports = connection;