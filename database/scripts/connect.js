var pgp = require("pg-promise")();
var dotenv = require("dotenv").config();

/**
* Connects to the database.
*/

const connection = {
  host: process.env.DB_HOST || "localhost",
  port: "5432",
  database: process.env.DB_NAME || "keystone",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD,
  max: 5000
};

var db = pgp(process.env.DB_URL);

module.exports = {
  db
};
