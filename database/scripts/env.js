require('dotenv').config();

/**
* Returns the database's data
*/

function config() {
    return {
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        host: process.env.DB_HOST,
        name: process.env.DB_NAME,
        test: 'test'
    }
}

module.exports = {
    config: config()
};