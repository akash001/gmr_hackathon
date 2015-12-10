angular.module('starter.services', [])


.factory('Locations', function($http,Accounts,User,ApiEndpoint) {
	// Might use a resource here that returns a JSON array

	// Some fake testing data
	var locations = [];

	return {
		
		all : function() {
			return $http.get(ApiEndpoint.url+"/"+User.id()).then(function(response){
				locations = response.data;
				return locations;
			},function(err){
				console.error('ERR',JSON.stringify( err));
				return [];
			});
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

.factory('UserAuth', function($window) {
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
					$window.localStorage['userId'] = ""+u.id;
					return u;
				}
			}
			return null;
		},
		get : function(){
			var uid = parseInt($window.localStorage['userId'] || "-1");
			if (uid > 0){
				for (var i=0;i<users.length;i++){
					u = users[i];
					if (u['id'] == uid){
						return u;
					}
				}
			}
			return null;
		}
	};
	
})
.factory('User', function(UserAuth) {

	return {
		
		
		id: function(){
			var u = UserAuth.get();
			if (u == null){
				return -1;
			}
			return u.id;
		},
		
		settings : function(){
			var u = UserAuth.get();
			if (u != null){
				return u.settings;
			}
			return {
				notifications : false,
				wow_points : -1
			}
		},
		
		increment_wow(num){
			var u = UserAuth.get();
			if (u != null){
				u.settings.wow_points += num;
			}
		},
		
		logoff : function(){
			console.log('Logging off');
		}
	};

});


