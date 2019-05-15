var path = require("path");
var QueryFile = require("pg-promise").QueryFile;
var fs = require("fs");
var db = require("./connect").db;

const createInitialTables = sql("../dumps/create.sql");
const seed = sql("../dumps/seed.sql");

/**
* Creates a SQL file.
* @returns Query file
*/

function sql(file) {
  const fullPath = path.join(__dirname, file);
  return new QueryFile(fullPath, { minify: true });
}

/**
* Creates a table in the database.
* @returns table, error message
*/

const tableCreation = () => {
  db.tx(t1 => {
    return t1.batch([
      t1.none(createInitialTables).catch(error => console.error(error))
    ]);
  })
    .then(async () => {
      console.log("successfully created tables on DB");
      await db
        .tx(t2 => {
          return t2.batch([
            t2.none(seed).catch(e => console.error(e || e.message)),
          ]);
        })
        .then(() => console.log("Sucessfully added data."))
        .catch(e => console.log(e || e.message));
    })
    .catch(error => {
      console.error(error);
      console.error("Something went wrong. Execute reset.js");
    })
    // .then(() => {
    //   require("./mockdata")();
    // });
};

module.exports = tableCreation;
