const db = require("../db-config.js");

function getAll() {
    return db("characters");
}

function getById(id) {
    return db("characters")
        .where("id", id).first();
}

async function add(character) {
    const [ id ] = await db("characters").insert(character);
    return getById(id);
}

module.exports = { getAll, getById, add };