const db = require("../db-config.js");

function getAll() {
    return db("characters");
}

module.exports = { getAll };