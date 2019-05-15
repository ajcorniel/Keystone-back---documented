const path = require("path");
const QueryFile = require("pg-promise").QueryFile;
const db = require("./connect").db;
const faker = require("faker");

const createMockData = sql("../dumps/seed.sql");

/**
* Creates a new file in the database.
* @returns Query File
*/

function sql(file) {
  const fullPath = path.join(__dirname, file);
  return new QueryFile(fullPath, { minify: true });
}

/**
 * Returns the actual date
 * @constructor DateConstructor
 * @param {object} items
 * @returns Date
 */
const insert = async () => {
  let done;
  for (var i = 0; i < 4; i++) {
    const { date, finance, lorem } = faker;
    const start = date.future();
    const end_hour = new Date(start).getTime() + 8.64e7;
    const items = [
      Math.floor(Math.random() * 8 + 1),
      Math.floor(Math.random() * 2 + 1),
      start,
      Math.floor(Math.random() * 12 + 1),
      finance.amount(),
      end_hour,
      lorem.word(),
      date.recent(),
      finance.amount(),
      finance.amount(),
      Math.floor(Math.random() * 13 + 1),
      Math.floor(Math.random() * 14 + 5),
      Math.floor(Math.random() * 18 + 10),
      lorem.word(),
      date.recent(),
      lorem.word()
    ];
    try {
      await db.none(createMockData, [...items]);
      done = true;
    } catch (err) {
      done = false;
      console.log(err);
    }
  }

  done
    ? console.log("Mock data successfully added")
    : console.log("There was an error adding mock data");
};

module.exports = insert;
