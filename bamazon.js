var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon_db"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    userPrompt();
  });

  function start(){
    connection.query("SELECT * FROM products", function(err, res){
            if(err) throw err;
console.log("\n---------------------Welcome to Bamazon-------------------")
for(var i = 0; i < res.length; i++){

console.log("id: "+ res[i].item_id + "       product: " + res[i].product_name + "       department: " + res[i].department_name + "          price : $" + res[i].price + "           left in stock : " +  res[i].stock_quantity)
console.log("----------------------------------------------------------------------------------------------------------------------------")
}
console.log("------------------------end of results-----------------------")
    })
  }
  
function userPrompt (){
    inquirer.prompt(
        [{
        type: "input",
        name: "purchase",
        message: "select the product id you would like to purchase",
        validate: function(value){
            if(isNaN(value) == false && parseInt(value) <=res.length && parseInt(value) > 0){
                return false}
                else{
                    return true}
            }},
        {
            type: "input",
            name: "quantity",
            message: "Quantity: ",
            validate: function(value){
                if(isNaN(value) == false && parseInt(value) <=res.length && parseInt(value) > 0){
                    return false}
                    else{
                        return true}
                }
        }
        
    ]
).then( function (response){
    console.log(response)

}
)
}