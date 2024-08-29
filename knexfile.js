const settings = {
    client: "sqlite3",
    useNullAsDefault: true,
    migrations: { directory: "./data/migrations" },
    seeds: { directory: "./data/seeds" }
  }
  
  module.exports = {
    development: {
      ...settings,
      connection: {
        filename: "./data/characters.db3",
      }
    }
  };
  