exports.up = async function(knex) {
    await knex.schema.createTable("characters", function(table) {
        table.increments();
        table.string("name", 128).unique().notNullable();
    });
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("characters");
};