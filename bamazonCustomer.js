var inquirer = require("inquirer");
var mysql = require("mysql");
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
console.log("\n---------------------Welcome to Bamazon-------------------")
for(var i = 0; i < res.length; i++){

console.log("id: "+ res[i].item_id + "       product: " + res[i].product_name + "       department: " + res[i].department_name + "          price : $" + res[i].price + "           left in stock : " +  res[i].stock_quantity)
console.log("----------------------------------------------------------------------------------------------------------------------------")
}
console.log("------------------------end of results-----------------------")
  

    inquirer.prompt(
        [{
        type: "input",
        name: "purchase",
        message: "Select the product id you would like to purchase",
        validate: function (value){
            if(isNaN(value) == false && parseInt(value) <= res.length && parseInt(value) > 0){
            return true;
          } else{
            console.log("choose an item! please enter the product ID to put it in your cart")
            return false;
          }}
            },
        {
            type: "input",
            name: "quantity",
            message: "Quantity: ",
            validate: function(value){
                if(isNaN(value)){
                    console.log("please enter the amount you would like to order") 
                return false;
                } else{
                return true;
            }}
                },
        {
            type: "list",
            name: "ship",
            message: "Select shipping method",
            choices: ["5-7 business days","3-5 businesss days","1-2 business days"]},
        {
            type: "confirm",
            name: "confirm",
            message: "confirm order"
        }
        
        ]
).then(function (response){

    var prodSel = response.purchase -1
    var qSel = parseInt(response.quantity)
    var subtotal = parseFloat(res[prodSel].price * qSel).toFixed(2)
    var shippingCost = ((res[prodSel].weightKg * qSel) / .25) + 3
    var tax = (subtotal + shippingCost) * 1.07
    var total = subtotal + shippingCost


    if(qSel <= res[prodSel].stock_quantity){

    let sql = 
    `UPDATE products
    SET ?
    WHERE ?`;

    let data = [
        {
            stock_quantity: (res[prodSel].stock_quantity - qSel)
        }
        ,{
            item_id: response.purchase
        }
    ];

    connection.query(sql, data, function(err, results){
        if (err) throw err ;
        
        console.log("------Congratulations! your order has been placed-------");
        console.log("item: " + res[prodSel].product_name + "     quantity:" + qSel);
        console.log("\nsubtotal: $" + subtotal)
        console.log("shipping: $" + shippingCost)
        console.log("tax: $" + tax)
        console.log("total: $" + total)
        console.log("\n"  + "your package should arrive in "+ response.ship)
        
        
        
        });
 }else{
            console.log("oooops! It looks like we dont have enough inn stock to fill this order. Try reducing the quantity.")
            console.log("dont worry I canceled this order for you...")

            newOrder()
 }
})        
})
}
            function newOrder() {
                inquirer.prompt([
                    {
                        type: "confirm",
                        name: "reprompt",
                        message: "would you like to make another transaction?"
                    }
                ]).then(function (x){
                    if (x.reprompt){
                    start()
                    }else{
                        console.log("Thanks for choosing Bamazon, see you next time!")
                    }
                })

            }
            

        start()

