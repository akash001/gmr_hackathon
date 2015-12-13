angular
		.module('starter.services', [])

		.factory('Categories', function() {
//			var ctgs = ['1a','2a','3a','4a','5a','6a']
			var categories = [ {
				id : 1,
				name : 'Airlines'
			}, {
				id : 4,
				name : 'Apparel'
			}, {
				id : 2,
				name : 'Grocery Store'
			}, {
				id : 3,
				name : 'Department Store'
			}, {
				id : 5,
				name : 'Gas Stations'
			} ]

			return {
				all : function() {
					return categories;
				},
				get : function(x){
					var c = null;
					for (var i=0;i<categories.length;i++){
						if (categories[i].id == x){
							c = categories[i];
							break;
						}
					}
					return c;
				}
				
			};
		})

		.factory('CrossControllerData', function() {
			var data = {};

			return {
				get : function(name) {
					return data[name];
				},
				set : function(name, value) {
					data[name] = value;
				},
				clear : function(name) {
					delete data[name];
				}
			};
		})

		.factory(
				'Locations',
				function($http, $q, Accounts, User, ApiEndpoint, Mode) {

					// Some fake testing data
					var locations_fake = [ {
						"mcc" : 1,
						"tranId" : 10001,
						"accountId" : 1,
						"locnId" : 0,
						"mrchName" : "HomeDepot",
						"tranDt" : "2015-11-01",
						"tranAmt" : 100.15,
						"mrchAddr" : "4903 GreatAmerica Mall Dr",
						"mrchCity" : "Milpitas",
						"mrchState" : "CA",
						"mrchZip" : "95035",
						"mrchCtry" : "US",
						"mrchLat" : 37.415534,
						"mrchLong" : -121.903354,
						"feedbackFlag" : "Y"
					}, {
						"mcc" : 2,
						"tranId" : 10002,
						"accountId" : 1,
						"locnId" : 0,
						"mrchName" : "Kohls",
						"tranDt" : "2015-11-01",
						"tranAmt" : 100.15,
						"mrchAddr" : "4903 GreatAmerica Mall Dr",
						"mrchCity" : "Milpitas",
						"mrchState" : "CA",
						"mrchZip" : "95035",
						"mrchCtry" : "US",
						"mrchLat" : 37.4168815,
						"mrchLong" : -121.9013705
					}, {
						"mcc" : 3,
						"tranId" : 10003,
						"accountId" : 1,
						"locnId" : 0,
						"mrchName" : "FOREVER21",
						"tranDt" : "2015-11-01",
						"tranAmt" : 100.15,
						"mrchAddr" : "4903 GreatAmerica Mall Dr",
						"mrchCity" : "Milpitas",
						"mrchState" : "CA",
						"mrchZip" : "95035",
						"mrchCtry" : "US",
						"mrchLat" : 37.4169686,
						"mrchLong" : -121.9000421
					}, {
						"mcc" : 4,
						"tranId" : 10004,
						"accountId" : 1,
						"locnId" : 0,
						"mrchName" : "STARBUCKS",
						"tranDt" : "2015-11-01",
						"tranAmt" : 100.15,
						"mrchAddr" : "4903 GreatAmerica Mall Dr",
						"mrchCity" : "Milpitas",
						"mrchState" : "CA",
						"mrchZip" : "95035",
						"mrchCtry" : "US",
						"mrchLat" : 37.4337416,
						"mrchLong" : -121.9162546
					}, {
						"mcc" : 3,
						"tranId" : 10006,
						"accountId" : 1,
						"locnId" : 0,
						"mrchName" : "SportsAuthority",
						"tranDt" : "2015-11-01",
						"tranAmt" : 100.15,
						"mrchAddr" : "125 E El Camino Real",
						"mrchCity" : "Sunnyvale",
						"mrchState" : "CA",
						"mrchZip" : "94086",
						"mrchCtry" : "US",
						"mrchLat" : 37.3669749,
						"mrchLong" : -122.0308847
					} ];
					var locations = [];
					var doneTranIds = [];

					return {

						all : function() {
							if (Mode.is_local) {
								var deferred = $q.defer();
								deferred.resolve(locations_fake);
								return deferred.promise;
							} else {
								return $http
										.get(ApiEndpoint.url + "/" + User.id())
										.then(
												function(response) {
													locations = response.data;
													console
															.log(JSON
																	.stringify(locations));
													return locations_fake;
												},
												function(err) {
													console.error('ERR', JSON
															.stringify(err));
													return [];
												});
							}
						},
						get : function(id) {
							if (Mode.is_local) {
								location_fake = null;
								for (var i = 0; i < locations_fake.length; i++) {
									if (locations_fake[i].tranId === parseInt(id)) {
										location_fake = locations_fake[i];
										break;
									}
								}
								var deferred = $q.defer();
								deferred.resolve(location_fake);
								return deferred.promise;
							} else {
								return $http
										.get(
												ApiEndpoint.url + "/"
														+ User.id() + "/" + id)
										.then(
												function(response) {
													locations = response.data;
													console
															.log("service"
																	+ JSON
																			.stringify(locations[0]));
													return locations[0];
												},
												function(err) {
													console.error('ERR', JSON
															.stringify(err));
													return [];
												});
							}
						},
						update_local : function(location) {
							location_fake = null;
							for (var i = 0; i < locations_fake.length; i++) {
								if (locations_fake[i].tranId === location.tranId) {
									location_fake = locations_fake[i];
									break;
								}
							}
							location_fake.feedbackFlag = location.feedbackFlag;
							location_fake.mrchName = location.mrchName;
							console.log(JSON.stringify(locations_fake));
						},
						post_update : function(location) {
							// TODO - Post to server
							User.increment_wow(10);
							location['feedbackFlag'] = 'Y';
							console.log("post_update"
									+ JSON.stringify(location));
							if (Mode.is_local) {
								this.update_local(location);
								var deferred = $q.defer();
								deferred.resolve('{}');
								return deferred.promise;
							} else {
								return $http.post(
										ApiEndpoint.url + "/" + User.id() + "/"
												+ location.tranId).then(
										function(res) {
											console.log(JSON
													.stringify(res.data));
										});
							}
						},
						skip : function(location) {
							location['feedbackFlag'] = 'S';
							console.log("skip" + JSON.stringify(location));
							if (Mode.is_local) {
								this.update_local(location);
								var deferred = $q.defer();
								deferred.resolve('{}');
								return deferred.promise;
							} else {
								return $http.post(
										ApiEndpoint.url + "/" + User.id() + "/"
												+ location.tranId).then(
										function(res) {
											console.log(JSON
													.stringify(res.data));
										});
							}
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
				all : function() {
					return accounts;
				}
			};

		})

		.factory('UserAuth', function($window) {
			var users = [ {
				id : 1,
				first_name : 'Abhijith',
				email : 'abkashya@visa.com',
				last_name : 'Kashyap',
				password : 'test',
				settings : {
					notifications : true,
					wow_points : 538,
					num_locations : 10,
				}
			}, {
				id : 2,
				first_name : 'Ankur',
				last_name : 'Raina',
				email : 'araina@visa.com',
				password : 'test',
				settings : {
					notifications : true,
					wow_points : 538,
					num_locations : 10,
				}
			} ];

			return {
				authenticate : function(e, p) {
					for (var i = 0; i < users.length; i++) {
						u = users[i];
						if (u['email'] == e) {
							$window.localStorage['userId'] = "" + u.id;
							return u;
						}
					}
					return null;
				},
				get : function() {
					var uid = parseInt($window.localStorage['userId'] || "-1");
					if (uid > 0) {
						for (var i = 0; i < users.length; i++) {
							u = users[i];
							if (u['id'] == uid) {
								return u;
							}
						}
					}
					return null;
				}
			};

		}).factory('User', function(UserAuth) {

			return {

				id : function() {
					var u = UserAuth.get();
					if (u == null) {
						return -1;
					}
					return u.id;
				},

				settings : function() {
					var u = UserAuth.get();
					if (u != null) {
						return u.settings;
					}
					return {
						notifications : false,
						wow_points : -1
					}
				},

				increment_wow : function(num) {
					var u = UserAuth.get();
					if (u != null) {
						var p = u.settings.wow_points;
						u.settings.wow_points = p + num;
					}
				},

				logoff : function() {
					console.log('Logging off');
				}
			};

		});
