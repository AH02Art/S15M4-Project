const knex = require("knex");
const config = require("./knexfile.js");
const environment = process.env.NODE_ENV || "testing";
console.log("this thing... =", config);

module.exports = knex(config[environment]);