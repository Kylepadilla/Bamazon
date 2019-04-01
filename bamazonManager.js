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

function authenticate() {
	console.log('-----------------Bamazon Manager Portal---------------------');

	inquirer
		.prompt([
			{
				type: 'input',
				name: 'username',
				message: 'please enter your user name',
				validate: function(value) {
					if (!value) {
						console.log('Sorry! Please enter a valid username');
						return false;
					} else {
						return true;
					}
				}
			},
			{
				type: 'password',
				name: 'password',
				message: 'please enter your password: ',
				validate: function(value) {
					if (!value) {
						console.log('Sorry! try again');
						return false;
					} else {
						return true;
					}
				}
			}
		])
		.then(function(response) {
			var unRes = response.username;
			var passRes = response.password;

			if (unRes === auth.USERNAME && passRes === auth.PASSWORD) {
				console.log('\n\nSuccess! Access Granted\n\n');
				menu();
			} else {
				console.log('\nincorrect password, try again\n');
				authenticate();
			}
		});
}

// Menu that list availble options
function menu() {
	inquirer
		.prompt([
			{
				type: 'list',
				name: 'choices',
				message: 'Welcome to the Manager Protal (v1.0.01)\nWhat would you like to do?',
				choices: [
					'View products for sale',
					'View Low Inventory',
					'Add to Inventory',
					'Add new Product',
					'Log Out'
				]
			}
		])
		.then(function(menuRes) {
			switch (menuRes.choices) {
				// View products for sale
				case 'View products for sale':
					viewProd();
					break;
				// View Low Inventory
				case 'View Low Inventory':
					lowInv();
					break;
				// Add to Inventory
				case 'Add to Inventory':
					invAdd();
					break;
				// Add new Product
				case 'Add new Product':
					prodAdd();
					break;
				//logs user out
				case 'Log Out':
					logout();
					break;
			}
		});
}

function viewProd() {
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
		console.log('------------------------end of results-----------------------');
		reprompt();
	});
}

function lowInv() {
	connection.query('SELECT * FROM products', function(err, res) {
		console.log('Low inventory products: \n');
		let arr = [];
		for (i = 0; i < res.length; i++) {
			if (res[i].stock_quantity <= 5) {
				arr.push({
					item_ID: res[i].item_id,
					product_name: res[i].product_name,
					department_name: res[i].department_name,
					price: res[i].price,
					stock_quantity: res[i].stock_quantity
				})

			}
		}
		console.table(arr)

		console.log('------------------------end of results-----------------------');
		reprompt();
	});
}

function invAdd() {
	connection.query('SELECT * FROM products', function(err, res) {

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


		inquirer
			.prompt([
				{
					type: 'input',
					name: 'productSel',
					message: "Enter a product ID to update it's stock quantity",
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
					name: 'addQuant',
					message: 'Please enter the number of re-stock items',
					validate: function(value) {
						if (isNaN(value)) {
							console.log('please enter the amount you would like to order');
							return false;
						} else {
							return true;
						}
					}
				}
			])
			.then(function(y) {
				var prodSel = y.productSel - 1;
				var qSel = parseInt(y.addQuant);
				var stockInput = res[prodSel].stock_quantity;
				var pName = res[prodSel].product_name;

				let sql = ` UPDATE products
    						SET ?
    						WHERE ?`;

				let data = [
					{
						stock_quantity: stockInput + qSel
					},
					{
						item_id: y.productSel
					}
				];
				connection.query(sql, data, function(err, results) {
					if (err) throw err;
					console.log('Success! ' + qSel + ' units have been added to ' + pName);
					reprompt();
				});
			});
	});
}

function prodAdd() {
	console.log('-----Add a new product------');
	inquirer
		.prompt([
			{
				type: 'input',
				name: 'name',
				message: 'Enter the name of the product you want to add'
			},
			{
				type: 'input',
				name: 'department',
				message: 'Department: '
			},
			{
				type: 'input',
				name: 'price',
				message: 'Price: '
			},
			{
				type: 'input',
				name: 'weight',
				message: 'weight in Kg: '
			},
			{
				type: 'input',
				name: 'quantity',
				message: 'Quantity: '
			}
		])
		.then(function(z) {
			let sql = `INSERT INTO products
        SET ?`;

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
					weightKg: z.weight
				},
				{
					stock_quantity: z.quantity
				}
			];
			connection.query(sql, data, function(err, results) {
				if (err) throw err;
				console.log(
					'Success! added:  ' +
						z.name +
						' || ' +
						z.department +
						' || ' +
						z.price +
						' || ' +
						z.weight +
						' || ' +
						z.quantity
				);
				repromptAddProd();
			});
		});
}
function reprompt() {
	inquirer
		.prompt([
			{
				type: 'confirm',
				name: 'reprompt',
				message: 'would you like to return to main menu?'
			}
		])
		.then(function(x) {
			if (x.reprompt) {
				menu();
			} else {
				console.log('\nSee you next time!\n');
				logout();
			}
		});
}
function repromptAddProd() {
	inquirer
		.prompt([
			{
				type: 'confirm',
				name: 'repromptAdd',
				message: 'would you like to add another product?'
			}
		])
		.then(function(add) {
			if (add.repromptAdd) {
				prodAdd();
			} else {
				console.log('\nReturning to main menu...');
				menu();
			}
		});
}

function logout() {
	console.log('\nLog Out successful\n');
	console.log('returning to user log in......\n');
	authenticate();
}

authenticate();
