const path = require("path");

// get the location of database.sqlite file
const dbPath = path.resolve(__dirname, "db/database.sqlite");

// create connection to sqlite database
const knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: dbPath,
  },
  useNullAsDefault: true,
});

knex.schema

  .hasTable("users")
  .then((exists) => {
    if (!exists) {
      return knex.schema
        .createTable("users", (table) => {
          table.increments("id").primary();
          table.string("firstName");
          table.string("lastName");
          table.date("dob");
          table.string("address");
        })
        .then(() => {
          console.log("Table 'users' created");
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`);
        });
    }
  })
  .then(() => {
    console.log("done");
  })
  .catch((error) => {
    console.error(`There was an error setting up the database: ${error}`);
  });

module.exports = knex;
