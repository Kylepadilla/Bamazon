# Bamazon APP

## Overview

Bamazon is an Amazon-like storefront with the MySQL skills I learned this unit. The app takes in orders from customers and deplete stock from the store's inventory. Bamazon tracks product sales across our store's departments and then provide a summary of the highest-grossing departments in the store.


### Customer Portal

 The Bamazon app prompts users with two messages. One that ask the customer the ID of the product they would like to buy. The second message asks how many units of the product they would like to buy.

Once the customer has placed the order, the Bamazon app should check if there is enough of the product to meet the customer's request. If not, the Bamazon will log the phrase 
>`oooops! It looks like we dont have enough inn stock to fill this order. Try reducing the number of items you are attempting to purchase.`

, and then prevent the order from going through.

However, if Bamazon _does_ have enough of the product, the app will fulfill the customer's order. the Bamazon SQL database will automatically update to reflect the remaining quantity.Once the update goes through,  the total cost of their purchase will be displayed.

* Click here to watch a quick video on how Bamazon customer portal works!

### Manager Portal
* The Bamazon Manager Portal requires user authentication using environmental variables and the dotenv node module. additionally, Bamazon will allow authorized users to chose from the following menu:

    * View Products for Sale: 
    
    * View Low Inventory
    
    * Add to Inventory
    
    * Add New Product

  * If a manager selects `View Products for Sale`, Bamazon will list every available item: the item IDs, names, prices, and quantities.

  * If a manager selects `View Low Inventory`, Bamazon will list all items with an inventory count lower than five.

  * If a manager selects `Add to Inventory`, Bamazon will display a prompt that will let the manager "add more" of any item currently in the store.

  * If a manager selects `Add New Product`, Bamazon will allow the manager to add a completely new product to the store.

* Bamzaon managers will also have the ability to log out and return to the user authentication prompt.

* Click Here to see how it Works!

###Supervisor Portal
