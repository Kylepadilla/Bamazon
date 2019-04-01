var dotenv = require('dotenv').config()

var USERNAME = dotenv.parsed.USERNAME
var PASSWORD = dotenv.parsed.PASSWORD
var S_USERNAME = dotenv.parsed.S_USERNAME
var S_PASSWORD = dotenv.parsed.S_PASSWORD
var HOST = dotenv.parsed.HOST
var PORT = dotenv.parsed.PORT
var USER = dotenv.parsed.USER
var PASSWORD_DB = dotenv.parsed.PASSWORD_DB
var DATABASE = dotenv.parsed.DATABASE

module.exports = {
    USERNAME, PASSWORD, S_USERNAME, S_PASSWORD, HOST, PORT, USER, PASSWORD_DB, DATABASE
}
