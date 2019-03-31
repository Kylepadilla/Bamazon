var inquirer = require("inquirer");
var mysql = require("mysql");
var Spotify = require("keys.js");
var spotify = new Spotify(keys.spotify);
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon_db"
  });
  

  function start(){
    connection.query("SELECT * FROM products", function(err, res){
            if(err) throw err;