angular.module('starter.services', [])

.factory('CrossControllerData',function(){
	var data={};
	
	return {
		get: function(name){
			return data[name];
		},
		set: function(name,value){
			data[name]=value;
		},
		clear: function(name){
			delete data[name];
		}
	};
})

.factory('Locations', function($http,$q,Accounts,User,ApiEndpoint,Mode) {
	// Might use a resource here that returns a JSON array

	// Some fake testing data
	
	// Some fake testing data
	var locations_fake = [ 	 
	                  	 {"tranId":10001,"accountId":1,"locnId":0,"mrchName":"HomeDepot","tranDt":"2015-11-01","tranAmt":100.15,"mrchAddr":"4903 GreatAmerica Mall Dr","mrchCity":"Milpitas","mrchState":"CA","mrchZip":"95035","mrchCtry":"US","mrchLat":37.415534,"mrchLong":-121.903354},
		                 {"tranId":10002,"accountId":1,"locnId":0,"mrchName":"Kohls","tranDt":"2015-11-01","tranAmt":100.15,"mrchAddr":"4903 GreatAmerica Mall Dr","mrchCity":"Milpitas","mrchState":"CA","mrchZip":"95035","mrchCtry":"US","mrchLat":37.4168815,"mrchLong":-121.9013705},
		                 {"tranId":10003,"accountId":1,"locnId":0,"mrchName":"FOREVER21","tranDt":"2015-11-01","tranAmt":100.15,"mrchAddr":"4903 GreatAmerica Mall Dr","mrchCity":"Milpitas","mrchState":"CA","mrchZip":"95035","mrchCtry":"US","mrchLat":37.4169686,"mrchLong":-121.9000421},
		                 {"tranId":10004,"accountId":1,"locnId":0,"mrchName":"STARBUCKS","tranDt":"2015-11-01","tranAmt":100.15,"mrchAddr":"4903 GreatAmerica Mall Dr","mrchCity":"Milpitas","mrchState":"CA","mrchZip":"95035","mrchCtry":"US","mrchLat":37.4337416,"mrchLong":-121.9162546},
		                 {"tranId":10006,"accountId":1,"locnId":0,"mrchName":"SportsAuthority","tranDt":"2015-11-01","tranAmt":100.15,"mrchAddr":"125 E El Camino Real","mrchCity":"Sunnyvale","mrchState":"CA","mrchZip":"94086","mrchCtry":"US","mrchLat":37.3669749,"mrchLong":-122.0308847}
		            ];
	var locations = [];
	var doneTranIds = [];

	return {
		
		all : function() {
			if (Mode.is_local){
				var deferred = $q.defer();
				deferred.resolve(locations_fake);
				return deferred.promise;
				
			}
			else {
				return $http.get(ApiEndpoint.url+"/"+User.id()).then(function(response){
						locations = response.data;
						return locations;
					},function(err){
						console.error('ERR',JSON.stringify( err));
						return [];
					});
		}},
		get : function(id) {
			if (Mode.is_local){
				location_fake = null;
				for (var i = 0; i < locations_fake.length; i++) {
					if (locations_fake[i].tranId === parseInt(id)) {
						location_fake=locations_fake[i];
						break;
					}
				}
				var deferred = $q.defer();
				deferred.resolve(location_fake);
				return deferred.promise;
			}
			else {
			return $http.get(ApiEndpoint.url+"/"+User.id()+"/"+id).then(function(response){
				locations = response.data;
				console.log("service"+JSON.stringify(locations[0]));
				return locations[0];
			},function(err){
				console.error('ERR',JSON.stringify( err));
				return [];
			});
			}
		},
		post_update : function(location){
			// TODO - Post to server
			console.log("post_update"+JSON.stringify(location));
			location['type']='update';
			if (!Mode.is_local){
			$http.post(ApiEndpoint.url+"/"+User.id()+"/"+location.tranId).then(function (res){
	            console.log(JSON.stringify(res.data));
	            
	        });
		}
		},
		skip : function(location){
			// TODO - Post to server
			console.log("skip"+JSON.stringify(location));
		}
	};
})

.factory('LocationsFake', function($http,Accounts,User,ApiEndpoint) {
	// Might use a resource here that returns a JSON array

	// Some fake testing data
	var locations = [ 	 
	                  	 {"tranId":10001,"accountId":1,"locnId":0,"mrchName":"HomeDepot","tranDt":"2015-11-01","tranAmt":100.15,"mrchAddr":"4903 GreatAmerica Mall Dr","mrchCity":"Milpitas","mrchState":"CA","mrchZip":"95035","mrchCtry":"US","mrchLat":37.415534,"mrchLong":-121.903354},
		                 {"tranId":10002,"accountId":1,"locnId":0,"mrchName":"Kohls","tranDt":"2015-11-01","tranAmt":100.15,"mrchAddr":"4903 GreatAmerica Mall Dr","mrchCity":"Milpitas","mrchState":"CA","mrchZip":"95035","mrchCtry":"US","mrchLat":37.4168815,"mrchLong":-121.9013705},
		                 {"tranId":10003,"accountId":1,"locnId":0,"mrchName":"FOREVER21","tranDt":"2015-11-01","tranAmt":100.15,"mrchAddr":"4903 GreatAmerica Mall Dr","mrchCity":"Milpitas","mrchState":"CA","mrchZip":"95035","mrchCtry":"US","mrchLat":37.4169686,"mrchLong":-121.9000421},
		                 {"tranId":10004,"accountId":1,"locnId":0,"mrchName":"STARBUCKS","tranDt":"2015-11-01","tranAmt":100.15,"mrchAddr":"4903 GreatAmerica Mall Dr","mrchCity":"Milpitas","mrchState":"CA","mrchZip":"95035","mrchCtry":"US","mrchLat":37.4337416,"mrchLong":-121.9162546},
		                 {"tranId":10006,"accountId":1,"locnId":0,"mrchName":"SportsAuthority","tranDt":"2015-11-01","tranAmt":100.15,"mrchAddr":"125 E El Camino Real","mrchCity":"Sunnyvale","mrchState":"CA","mrchZip":"94086","mrchCtry":"US","mrchLat":37.3669749,"mrchLong":-122.0308847}
		            ];
	var doneTranIds = [];

	return {
		
		all : function() {
				return locations;
		},
		get : function(id) {
			for (var i = 0; i < locations.length; i++) {
				if (locations[i].tranId === parseInt(id)) {
					return locations[i];
				}
			}
			return null;
		},
		post_update : function(location){
			location['type']='update';
			console.log("post_update"+JSON.stringify(location));
		},
		skip : function(location){
			console.log("skip"+JSON.stringify(location));
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


