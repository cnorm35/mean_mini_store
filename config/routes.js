var mongoose = require('mongoose');  //require the actual mongoose model
require('./mongoose.js');  //require the mongoose.js file from the same directory.

var Customer = mongoose.model('Customer');
var Order = mongoose.model('Order');

module.exports = function Routes(app){

	app.get('/', function(req, res){
		res.render('index');
	});



	app.get('/customers', function(req, res){
		//use the Customer model to get all the users
		res.render('customers');
	});

	app.get('/api/customers', function(req, res){
		Customer.find({}, function(errors, results){
			res.json(results);
		})
	});

	app.get('/orders', function(req, res){
		res.render('orders');
	})

	app.get('/api/orders', function(req, res){
		Order.find({}, function(errors, results){
			res.json(results);
		})
	})



	app.post('/addCustomer', function(req, res){
		new_customer = new Customer(req.body);
		new_customer.save(function(errors){
			if(errors){
				res.redirect('/')
			}
			else{
				res.redirect('/customers');
			}
		})
	});

	// app.post('/addOrder', function(req, res){
	// 	new_order = new Order(req.body);
	// 	new_order.save(function(errors){
	// 		if(errors){
	// 			res.redirect('/')
	// 		}
	// 		else{
	// 			res.redirect('/orders');
	// 			console.log('hit the post addOrder')
	// 		}
	// 	})
	// })

	//adding new customer into db
	app.post('/api/customers', function(req, res){
		var new_customer = new Customer(req.body);
		new_customer.save(function(errors){
			if(errors){
				res.status(400).json({status: 'errors', errors: errors})
			}
			else{
				res.json(new_customer);
			}
		})
	});

	//adding new order into db
	app.post('/api/orders', function(req, res){
		var new_order = new Order(req.body);
		new_order.save(function(errors){
			if(errors){
				res.status(400).json({status: 'error', errors: errors})
			}
			else {
				res.json(new_order);
			}
		})
	});


};