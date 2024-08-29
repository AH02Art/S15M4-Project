const characters = [
  { name: "Mario" },
  { name: "Luigi" },
  { name: "Peach" },
  { name: "Toad" },
  { name: "Bowser" }
];

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex("characters").insert(characters);
};
