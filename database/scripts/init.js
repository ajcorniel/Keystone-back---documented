var pgtools = require("pgtools");
var prompt = require("prompt");
var fs = require("fs");
var path = require("path");
prompt.start();

/**
* Gets SQL data.
*/

new Promise((resolve, reject) => {
  prompt.get(
    [
      {
        name: "DB_USER",
        description: "PostgreSQL User (Default is postgres)",
        default: "postgres"
      },
      {
        name: "DB_PASSWORD",
        description: "PostgreSQL Password",
        hidden: true
      },
      {
        name: "DB_PORT",
        description: "PSQL Server port (Default is 5432)",
        default: "5432"
      },
      {
        name: "DB_HOST",
        description: "PSQL Server running host (Default is localhost)",
        default: "localhost"
      },
      {
        name: "DB_NAME",
        description: "Database name (default is keystone)",
        default: "keystone"
      }
    ],
    function(err, result) {
      if (err) reject(err);

      let final = {
        DB_USER: result.DB_USER,
        DB_HOST: result.DB_HOST,
        DB_NAME: result.DB_NAME,
        DB_PORT: result.DB_PORT,
        DB_PASSWORD: result.DB_PASSWORD,
        DB_URL: `postgres://${result.DB_USER}:${result.DB_PASSWORD}@${
          result.DB_HOST
        }:${result.DB_PORT}/${result.DB_NAME}`,
        PORT: 3000,
        SECRET: "secret"
      };

      resolve(final);
    }
  );
})
  .then(createEnvFile)
  .then(({ DB_USER, DB_HOST, DB_NAME, DB_PORT, DB_PASSWORD, DATABASE_URL }) => {
    return pgtools.createdb(
      { user: DB_USER, password: DB_PASSWORD, port: DB_PORT, host: DB_HOST },
      DB_NAME
    );
  })
  .then(() => {
    require("./tables")();
  })
  .then(() => {
    console.log("Successful DB created");
  });
  
/**
* Creates an enviroment file
*/

function createEnvFile(environmentVariables) {
  return new Promise((resolve, reject) => {
    var outputDirectory = path.join(__dirname, "../..", ".env");
    var output = Object.keys(environmentVariables).reduce(
      (output, variable) =>
        `${output}${variable}=${environmentVariables[variable]}\n`,
      ""
    );
    fs.writeFile(outputDirectory, output, "utf8", (err, result) => {
      if (err) reject(err);
      resolve(environmentVariables);
    });
  });
}
