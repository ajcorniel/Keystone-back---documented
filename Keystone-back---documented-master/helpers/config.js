let dotenv = require("dotenv");

dotenv.config();

let config = {
  port: process.env.PORT || 4000,
  db_url: process.env.DB_URL,
  db: process.env.DB_NAME
};

module.exports = {
  config
}
