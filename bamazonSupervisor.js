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
	console.log('-----------------Bamazon Supervisor Portal---------------------');

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

			if (unRes === auth.S_USERNAME && passRes === auth.S_PASSWORD) {
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
				message: 'Welcome to the Supervisor Protal (v1.0.01)\nWhat would you like to do?\n',
				choices: [ 'View Product Sales by Department', 'Create New Department', 'Log Out' ]
			}
		])
		.then(function(menuRes) {
			switch (menuRes.choices) {
				case 'View Product Sales by Department':
					viewSales();
					break;
				case 'Create New Department':
					newDepo();
					break;
				case 'Log Out':
					logout();
					break;
			}
		});
}

function viewSales() {

	connection.query('SELECT * FROM department', function(err, res) {
		if (err) throw err;
		console.log("\n-------sales by department:  ")

		let arr = [];
		
		for (var i = 0; i < res.length; i++) {

			arr.push({
				department_ID: res[i].department_ID,
				department_name: res[i].department_name,
				over_head_costs: res[i].over_head_costs,
				product_sales: res[i].product_sales,
				total_profit: res[i].total_profit
			})
		}
		console.table(arr);
		reprompt();
		})
	}


function newDepo() {
	console.log('-----Add a new department------');
	inquirer
		.prompt([
			{
				type: 'input',
				name: 'depoName',
				message: 'Enter the name of the department you want to add'
			},
			{
				type: 'input',
				name: 'overhead',
				message: 'Input any overhead associated to the new department: '
			}
			
		])
		.then(function(z) {
			let sql = `INSERT INTO department SET ?`;

			let data = [
				{
					department_name: z.name
				},
				{
					over_head_costs: z.overhead
				}
				
			];
			connection.query(sql, data, function(err, results) {
				if (err) throw err;
				
		let arrDepo = [];
		
		for (var i = 0; i < z.length; i++) {

			arrDepo.push({
				department_name:  z.name,
				over_head_costs:  z.overhead
			})
		}
				console.table(arrDepo)
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
				message: 'would you like to add another department?'
			}
		])
		.then(function(add) {
			if (add.repromptAdd) {
				newDepo();
			} else {
				console.log('\nReturning to main menu...');
				menu();
			}
		});
}

function logout() {
	inquirer
	.prompt([
		{
			type: 'confirm',
			name: 'repromptAdd',
			message: 'Are you sure you want to log out?'
		}
	])
	.then(function(add) {
		if (!add.logout) {
			console.log('\nLog Out successful\n');
			console.log('returning to user log in......\n');
			authenticate();
		} else {
			console.log('\nReturning to main menu...');
			menu();
		}
	});

}
authenticate();
