angular.module('starter.services', [])

//.service('LoginService', function($q) {
//    return {
//        loginUser: function(name, pw) {
//            var deferred = $q.defer();
//            var promise = deferred.promise;
// 
//            if (name == 'user' && pw == 'secret') {
//                deferred.resolve('Welcome ' + name + '!');
//            } else {
//                deferred.reject('Wrong credentials.');
//            }
//            promise.success = function(fn) {
//                promise.then(fn);
//                return promise;
//            }
//            promise.error = function(fn) {
//                promise.then(null, fn);
//                return promise;
//            }
//            return promise;
//        }
//    }
//})

.factory('Locations', function($http,Accounts) {
	// Might use a resource here that returns a JSON array

	// Some fake testing data
	var locations = [ {
		id : 1,
		location : {
			mlid : 1,
			merchant_name : 'Target',
			street : '172 Foster City Blvd',
			city : 'Foster City',
			state : 'CA',
			zip : '94070',
			lat : 403,
			long : 300
		},
		name : 'Target FC Blvd',
		amount : '30.38',
		txn_date : '11/10/2015',
		account_id : 1
	},
	{
		id : 1,
		location : {
			mlid : 1,
			merchant_name : 'The Office',
			street : '',
			city : 'San Carlos',
			state : 'CA',
			zip : '94070',
			lat : 403,
			long : 300
		},
		name : 'Office Bar',
		amount : '30.38',
		txn_date : '11/10/2015',
		account_id : 1
	},

	];

	return {
		all : function() {
			var accounts = Accounts.all();
			var accounts_map = {}
			for (var a in accounts){
				accounts_map[a.id] = a;
			}
			for (l in locations){
				l['account'] = accounts_map[l.account_id];
			}
			return locations;
		},
		get : function(id) {
			for (var i = 0; i < locations.length; i++) {
				if (locations[i].id === parseInt(id)) {
					return locations[i];
				}
			}
			return null;
		}
	};
})

.factory('Accounts', function() {
	var accounts = [ {
		id : 1,
		card_number : '4340-1234-5637-1626',
		card_brand : 'Visa',
		card_expiry : '12/17',
		account_holder_name : 'Abhijith Kashyap',
		enabled : true,
	}, {
		id : 2,
		card_number : '4340-1574-8838-3433',
		card_brand : 'Visa',
		card_expiry : '12/22',
		account_holder_name : 'Abhijith R Kashyap',
		enabled : true,
	}, {
		id : 2,
		card_number : '7863-4535-5253-3626',
		card_brand : 'Discover',
		card_expiry : '10/18',
		account_holder_name : 'Abhijith Kashyap',
		enabled : false,
	}, ];
	
	return {
		all : function(){
			return accounts;
		}
	};

})

.factory('UserAuth', function(User) {
	var users = [
	     {
			id : 1,
			first_name : 'Abhijith',
			email:'abkashya@visa.com',
			last_name : 'Kashyap',
			password: 'test',
			settings : {
				notifications : true,
				wow_points : 538,
				num_locations:10,
			}
	     },
	     {
				id : 2,
				first_name : 'Ankur',
				last_name : 'Raina',
				email:'araina@visa.com',
				password: 'test',
				settings : {
					notifications : true,
					wow_points : 538,
					num_locations:10,
				}
			}
	];
	
	return {
		authenticate : function(e,p){
			for (var i=0;i<users.length;i++){
				u = users[i];
				if (u['email'] == e){
					User.set_user(u);
					return u;
				}
			}
			return null;
		}
	};
	
})
.factory('User', function() {
	var user = null;

	return {
		set_user: function(u){
			user = u;
		},
		
		is_authenticated : function(){
			return user != null;
		},
		settings : function(){
			if (this.is_authenticated()){
				return user.settings;
			}
			return {
				notifications : false,
				wow_points : -1
			}
		},
		display_name : function(){
			if (this.is_authenticated()){
				return user.first_name;
			}
			return 'anonymous';
		},
		increment_wow(num){
			user.settings.wow_points += num;
		},
		
		logoff : function(){
			console.log('Logging off');
		}
	};

});


