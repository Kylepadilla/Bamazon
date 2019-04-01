var dotenv = require('dotenv').config()

var USERNAME = dotenv.parsed.USERNAME
var PASSWORD = dotenv.parsed.PASSWORD
module.exports = {
    USERNAME, PASSWORD
}

