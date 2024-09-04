const settings = {
  client: "sqlite3",
  useNullAsDefault: true,
  migrations: { directory: "./data/migrations" },
  seeds: { directory: "./data/seeds" },
};

module.exports = {
  testing: {
    ...settings,
    connection: {
      filename: "./data/characters.db3",
    },
  },
};
