const pgtools = require("pgtools");
const config = require('../../helpers/config');
const prompt = require("prompt");

prompt.start();

/**
* Creates a new promise.
* @param {string} promptedValues
* @returns resolve, reject
*/

new Promise((resolve, reject) => {
  prompt.get(
    [
      {
        name: "user",
        description: "PostgreSQL User (Default is postgres)",
        default: "postgres"
      },
      {
        name: "password",
        description: "PostgreSQL Password",
        hidden: true
      },
      {
        name: "port",
        description: "PSQL Server port (Default is 5432)",
        default: "5432"
      },
      {
        name: "host",
        description: "PSQL Server running host (Default is localhost)",
        default: "localhost"
      }
    ],
    (err, result) => {
      if (err) reject(err);
      resolve(result);
    }
  );
})
  .then(promptedValues => {
    console.log(process.env.DB_NAME);
    return pgtools.dropdb(promptedValues, process.env.DB_NAME);
  })
  .then(() => {
    console.log("Successfully Dropped DBs");
  })
  .catch(console.error);
