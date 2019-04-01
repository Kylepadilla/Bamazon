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
	connection.query('SELECT * FROM departments', function(err, res) {
		for (var i = 0; i < res.length; i++) {
			var grossSales = res[i];
		}

		reprompt();
	});
}

function newDepo() {}

function logout() {
	console.log('\nLog Out successful\n');
	console.log('returning to supervisor log in......\n');
	authenticate();
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
				console.log('See you next time!');
				logout();
			}
		});
}
authenticate();
