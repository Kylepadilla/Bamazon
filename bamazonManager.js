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
  
  

  function authenticate(){
    console.log("-----------------Bamazon Manager Portal---------------------")

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
console.log("Success! Access Granted");
    menu()
}else{
    Authenticate()
}
})
}

// Menu that list availble options
function menu(){
inquirer.prompt([
    {
        type: "checkbox",
        name: "choices",
        message: "Welcome to the Manager Protal (v1.0.01)\nWhat would you like to do?",
        choices: ["View products for sale", "View Low Inventory", "Add to Inventory", "Add new Product"]
    }
]).then(function(menueRes){
    var prodView = "View products for sale"
    var invView = "View Low Inventory"
    var addInv = "Add to Inventory"
    var addProd = "Add new Product"


    // View products for sale
    if (menueRes.choices == prodView){
        viewProd()}

    // View Low Inventory
    else if(menueRes.choices == invView){
        lowInv()}
    // Add to Inventory
    else if(menueRes.choices == addInv){
        invAdd()}
        
    // Add new Product
    else if(menueRes.choices == addProd){
        prodAdd();
        }
})
}


function viewProd(){
    for(var i = 0; i < res.length; i ++ ){
    console.log("id: "+ res[i].item_id + "       product: " + res[i].product_name + "       department: " + res[i].department_name + "          price : $" + res[i].price + "           left in stock : " +  res[i].stock_quantity)
    console.log("----------------------------------------------------------------------------------------------------------------------------")
    }
    console.log("------------------------end of results-----------------------")
    reprompt()
}


function lowInv(){
    for(i = 0; i < res.length; i++){
        if(res[i].stock_quantity <= 5){
            console.log("Low inventory products: \n")
            console.log("id: "+ res[i].item_id + "       product: " + res[i].product_name + "       department: " + res[i].department_name + "          price : $" + res[i].price + "           left in stock : " +  res[i].stock_quantity)
        }
    
    }
    console.log("------------------------end of results-----------------------")
    reprompt()
    }

function invAdd(){
    inquirer.prompt([{
        type: "input",
        name: "productSel",
        message: "Enter a product ID to update it's stock quantity",
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
        name: "addQuant",
        message: "Please enter the number of re-stock items",
        validate: function(value){
            if(isNaN(value)){
                console.log("please enter the amount you would like to order") 
            return false;
            } else{
            return true
    }
}}
]).then(function(y){
    var prodSel = y.prodSel -1
    var qSel = parseInt(y.quantity)
    

    let sql = 
    `UPDATE products
    SET ?
    WHERE ?`;

    let data = [
        {
            stock_quantity: (res[prodSel].stock_quantity + qSel)
        }
        ,{
            item_id: y.purchase
        }
    ];
    connection.query(sql, data, function(err, results){
        if (err) throw err ;
        console.log("Success! " + qSel + "units have been added to " + res[prodSel].product_name)
    })
})
}


function prodAdd (){
    console.log("-----Add a new product------")

    inquirer.prompt([
        {
        type: "input",
        name: "name",
        message: "Enter the name of the product you want to add",
        validate: function (value){
            if(isNaN(value) == false && parseInt(value) <= res.length && parseInt(value) > 0){
            return true;
          } else{
            return false;
          }}
    },
    {
        type: "input",
        name: "department",
        message: "Department: ",
        validate: function(value){
            if(isNaN(value)){
                console.log() 
            return false;
            } else{
            return true}}},
    {
        type: "input",
        name: "price",
        message: "Price: "},
    {
        type: "input",
        name: "weight",
        message: "weight in Kg: "},
    {
        type: "input",
        name: "quantity",
        message: "Quantity: "
    }

    ]).then(function(z){
    
        let sql = 
        `INSERT INTO products
        SET ?
        WHERE ?`;
    
        let data = [
            {
                product_name: z.name
            },
            {
                department_name: z.department
            },
            {
                price: z.price
            },
            {
                weightKg: z.weightKg
            },
            {
                stock_quantity: z.quantity
            }
        ];
        connection.query(sql, data, function(err, results){
            if (err) throw err ;
            console.log("Success! added:  " +  z.name + " || " + z.department + " || " + z.price + z.weightKg + " || " + z.stock_quantity)

        })
    });repromptAddProd()

}
function reprompt(){
    inquirer.prompt([
        {
            type: "confirm",
            name: "reprompt",
            message: "would you like to return to main menu?"
        }
    ]).then(function (x){
        if (x.reprompt){
        start()
        }else{
            console.log("See you next time!")
        }
    })
}
function repromptAddProd(){
    inquirer.prompt([
        {
            type: "confirm",
            name: "repromptAdd",
            message: "would you like to add another product?"
        }
    ]).then(function (add){
        if (add.repromptAdd){
        prodAdd()
        }else{
            console.log("Returning to main menu...");
            menu()
        }
    })
}

  authenticate()
