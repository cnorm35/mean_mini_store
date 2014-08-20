var app = angular.module('store_app', ['ngRoute']);

//------------------Angular Routing-----------------
app.config(function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: 'partials/customers.html'
	})
	.when('/customers', {
		templateUrl: 'partials/customers.html'
	})
	.when('/orders', {
		templateUrl: 'partials/orders.html'
	})
	.otherwise({
		redirectTo: '/'
	});
})





////-----------------Factories--------------
//Customer Factory
app.factory('CustomerFactory', function($http){
	var factory = {}
	var customers;
	factory.getCustomers = function(callback){
		$http.get('/api/customers').success(function(data){
			customers = data;
			callback(customers);
		});
	}

	factory.createCustomer = function(object){
		$http.post('/api/customers', object).success(function(data){
			customers.push(data);
		}).error(function(data){
			alert('booooo this man!!!');
			console.log(data);
		})
	}

	// factory.deleteCustomer = function($index){
	// 	console.log($index, 'from factory');
	// 	$http.delete('/api/customers/' + $index)
	// }

	factory.deleteCustomer = function(id){
		$http.post('/api/customers/delete', id).success(function(data){
			console.log(id);
		}).error(function(data){
			console.log(data.error.message, data.error.stack);
		});
	}



	return factory;
});

//Order Factory
app.factory('OrderFactory', function($http){
	var factory = {};
	var orders;

	factory.getOrders = function(callback){
		$http.get('/api/orders').success(function(data){
			orders = data;
			callback(orders);
		})
	}

	factory.addOrder = function(object, callback){
		// console.log(object);
		$http.post('/api/orders', object).success(function(data){
			orders.push(data);
			callback(data);
		}).error(function(data){
			alert('boooo, you cant do anything right');
			console.log(data);
		})
	}



	

	return factory;
});


//----------------------Controllers-----------------

app.controller('CustomerController', function($scope, CustomerFactory){
	$scope.createCustomer = function(){
		CustomerFactory.createCustomer($scope.newCustomer)
	}

	CustomerFactory.getCustomers(function(data){
		$scope.customers = data;
		console.log($scope.customers);
	})

	$scope.deleteCustomer = function(id){
		CustomerFactory.deleteCustomer(id);
		console.log(id, 'delete cust controller');
	}	
});


app.controller('OrderController', function($scope, $interval, CustomerFactory, OrderFactory){
	$scope.orders = [];
	CustomerFactory.getCustomers(function(data){
		$scope.customers = data;
	});
	
	OrderFactory.getOrders(function(data){
		$scope.orders = data;
	})

	$scope.addOrder = function(){
		OrderFactory.addOrder($scope.newOrder, function(order){
			$scope.orders.push(order);
			console.log($scope.orders, 'first one')
			
			// console.log(order)
		})



		//added the block below
		// OrderFactory.getOrders(function(data){
		// 	$scope.orders = data;
		// 	console.log($scope.orders)
		// })

		//just moved.
		// 	OrderFactory.getOrders(function(data){
		// 	$scope.orders = data;
		// 	console.log($scope.orders, 'second one')
		// });
	}

})




app.controller('UpdateController', function($scope, CustomerFactory, OrderFactory){
		
});






