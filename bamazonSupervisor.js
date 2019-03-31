var inquirer = require("inquirer");
var mysql = require("mysql");
var Auth = require("./keys");
var auth = new Auth(keys.bamazon);

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon_db"
  });
  

  function start(){
    console.log("-----------------Bamazon Supervisor Portal---------------------")

    inquirer.prompt([
        {
            type: "input",
            name: "username",
            message: "please enter your user name",
            validate: function (value){
                if(!value){
                    console.log("Sorry! Please enter a valid username")
                return false;
                } else{
                return true;
                }}
                },
        {
            type: "password",
            name: "password",
            message: "please enter your password: ",
            validate: function(value){
                if(!value){
                    console.log("Sorry! try again") 
                return false;
                } else{
                return true;
            }}
            }])

.then(function (response){

    var unRes = response.username;
    var passRes = response.password;
        
if(unRes == auth.username && passRes == auth.username){
console.log("Success! Access Granted")
}
})}
start()