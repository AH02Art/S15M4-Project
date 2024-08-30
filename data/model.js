const db = require("../db-config.js");

function getAll() {
    return db("characters");
}

function getById(id) {
    return db("characters")
        .where("id", id).first();
}

function add(character) {
    return null;
}

module.exports = { getAll, getById, add };