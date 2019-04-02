var inquirer = require('inquirer');
var mysql = require('mysql');
var auth = require('./keys');
var connection = mysql.createConnection({
	host: auth.HOST,
	port: auth.PORT,
	user: auth.USER,
	password: auth.PASSWORD_DB,
	database: auth.DATABASE
});

function start() {
	connection.query('SELECT * FROM products', function(err, res) {
		if (err) throw err;
		console.log('\n        ---------------------Welcome to Bamazon-------------------');
		
		let arr = [];
		
		for (var i = 0; i < res.length; i++) {

			arr.push({
				item_ID: res[i].item_id,
				product_name: res[i].product_name,
				department_name: res[i].department_name,
				price: res[i].price,
				stock_quantity: res[i].stock_quantity
			})
		}

		console.table(arr)
		
		console.log('------------------------end of results-----------------------');

		inquirer
			.prompt([
				{
					type: 'input',
					name: 'purchase',
					message: 'Select the product id you would like to purchase',
					validate: function(value) {
						if (isNaN(value) == false && parseInt(value) <= res.length && parseInt(value) > 0) {
							return true;
						} else {
							console.log('choose an item! please enter the product ID to put it in your cart');
							return false;
						}
					}
				},
				{
					type: 'input',
					name: 'quantity',
					message: 'Quantity: ',
					validate: function(value) {
						if (isNaN(value)) {
							console.log('please enter the amount you would like to order');
							return false;
						} else {
							return true;
						}
					}
				},
				{
					type: 'list',
					name: 'ship',
					message: 'Select shipping method',
					choices: [ '5-7 business days', '3-5 businesss days', '1-2 business days' ]
				},
				{
					type: 'confirm',
					name: 'confirm',
					message: 'confirm order'
				}
			])
			.then(function(response) {
				var prodSel = response.purchase - 1;
				var qSel = parseInt(response.quantity);
				var subtotal = parseFloat(res[prodSel].price * qSel).toFixed(2);
				var shippingCost = parseFloat(res[prodSel].weightKg * qSel * 0.25 + 3).toFixed(2);
				var tax = parseFloat(res[prodSel].price * qSel * 0.07).toFixed(2);
				var total = parseFloat(
					res[prodSel].price * qSel +
						(res[prodSel].weightKg * qSel * 0.25 + 3) +
						res[prodSel].price * qSel * 0.07
				).toFixed(2);

				if (qSel <= res[prodSel].stock_quantity) {
					let sql = `UPDATE products
   								SET ?
    							WHERE ?`;

					let data = [
						{
							stock_quantity: res[prodSel].stock_quantity - qSel
						},
						{
							item_id: response.purchase
						},
						{
							product_sales: res[prodSel].product_sales + subtotal
						}
					];

					connection.query(sql, data, function(err, results) {
						if (err) throw err;
					




						console.log('\n\n------Congratulations! your order has been placed-------\n');
						console.log('     Item: ' + res[prodSel].product_name + "      Price: " + res[prodSel].price  + '     Quantity:' + qSel);
						console.log('\nsubtotal: $' + subtotal);
						console.log('shipping: $' + shippingCost);
						console.log('tax: $' + tax);
						console.log('total: $' + total);
						console.log('\n' + 'Your order has been processed. Your item should arrive in ' + response.ship + '\n\n');
						
						newOrder();
					});
				} else {
					console.log(
						'oooops! It looks like we dont have enough inn stock to fill this order. Try reducing the number of items you are attempting to purchase.'
					);
					console.log('dont worry I canceled this order for you...');

					newOrder();
				}
			});
	});
}
function newOrder() {
	inquirer
		.prompt([
			{
				type: 'confirm',
				name: 'reprompt',
				message: 'would you like to make another transaction?'
			}
		])
		.then(function(x) {
			if (x.reprompt) {
				start();
			} else {
				console.log('\nThanks for choosing Bamazon, see you next time!');
				connection.destroy();
			}
		});
}
start();
