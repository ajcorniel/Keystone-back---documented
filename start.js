require('babel-register')({
    presets: ['env', 'es2015']
})

// Import the rest of our application.
module.exports = require('./app.js')