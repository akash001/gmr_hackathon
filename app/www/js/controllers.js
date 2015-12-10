angular.module('starter.controllers',
		[ 'ionic', 'starter.services', 'starter.filters' ])

/**
 * {"tranId":10001,"accountId":1,"locnId":1001,"mrchName":"HomeDepot",
 * "tranDt":"2015-11-10","tranAmt":100.15,"mrchAddr":"4903 GreatAmerica Mall
 * Dr",
 * "mrchCity":"Milpitas","mrchState":"CA","mrchZip":"95035","mrchCtry":"US",
 * "mrchLat":37.3669749,"mrchLong":-121.903354}
 */

.controller(
		'LoginCtrl',
		function($scope, $ionicPopup, $state, UserAuth) {
			$scope.data = {};

			// $http.get('https://cors-test.appspot.com/test').then(function(resp)
			// {
			// console.log('Success 123', resp);
			// // For JSON responses, resp.data contains the result
			// }, function(err) {
			// console.error('ERR', err);
			// // err.status will contain the status code
			// })

			$scope.login = function() {
				var u = UserAuth.authenticate($scope.data.username,
						$scope.data.password);
				if (u != null) {
					$state.go('tab.locations');
				} else {
					var alertPopup = $ionicPopup.alert({
						title : 'Login failed!',
						template : 'Please check your credentials!'
					});
				}
			};
		})

.controller('StartCtrl', function($scope, $state) {
	$scope.signin = function() {
		$state.go('login');
	}

	$scope.register = function() {
		$state.go('login');
	}
	
	$scope.slideHasChanged = function(index) {
		
	}
})

.controller(
		'LocationDetailCtrl',
		function($scope,$state, $stateParams, $ionicLoading, $compile, Locations) {
			Locations.get($stateParams.id).then(function(loc){
				$scope.location =loc;
				var geocoder = new google.maps.Geocoder;
				var infowindow = new google.maps.InfoWindow;

				var myLatlng = new google.maps.LatLng($scope.location.mrchLat,
						$scope.location.mrchLong);

				var mapOptions = {
					center : myLatlng,
					zoom : 16,
					mapTypeId : google.maps.MapTypeId.ROADMAP,
					disableDoubleClickZoom : true
				};

				var map = new google.maps.Map(document.getElementById("map"),
						mapOptions);
				var myLocation = new google.maps.Marker({
					position : myLatlng,
					map : map,
					title : "My Location"
				});

				map.addListener('click', function(event) {
					myLocation.setPosition(event.latLng);
					geocodeLatLng(geocoder, map, event.latLng,$scope);
				});
				$scope.map = map;
			});

			$scope.update_location = function(){
				Locations.post_update($scope.location);
				$state.go('tab.locations');
			}
			
			$scope.skip_location = function(){
				Locations.skip($scope.location);
				$state.go('tab.locations');
			}

			function geocodeLatLng(geocoder, map, latlng,$scope) {
				
				 geocoder.geocode({
					'location' : latlng
				}, function(results, status) {
					if (status === google.maps.GeocoderStatus.OK) {
						if (results[0]) {
							var street_number='';
							var street = '';
							var city = '';
							var state = '';
							var zip = '';
							var lat = -1000;
							var lng = -1000;
							for (var i=0;i<results[0].address_components.length; i++){
								var ac = results[0].address_components[i];
//								console.log(JSON.stringify(ac));
								if ( ac.types.indexOf('route')>=0){
									street =ac.short_name;
								}
								else if (ac.types.indexOf('street_number')>=0){
									street_number = ac.short_name;
								}
								else if (ac.types.indexOf('postal_code')>=0){
									zip = ac.short_name;
								}
								else if (ac.types.indexOf('administrative_area_level_1')>=0){
									state = ac.short_name;
								}
								else if (ac.types.indexOf('locality')>=0) {
									city = ac.short_name;
								}
							}
							if (results[0].geometry && results[0].geometry.location){
								lat = results[0].geometry.location.lat;
								lng = results[0].geometry.location.lng;
							}
							
							$scope.$apply(function(){
								if (street != ''){
										$scope.location.mrchAddr=street_number +' '+street;
								}
								if (city != ''){
									$scope.location.mrchCity=city;
								}
								if (state != ''){
									$scope.location.mrchState=state;
								}
								if (zip != ''){
									$scope.location.mrchZip=zip;
								}
								if (lat > -1000){
									$scope.location.mrchLat = lat;
								}
								if (lng > -1000){
									$scope.location.mrchLong = lng;
								}
							});

						} else {
							console.log('No results found');
						}
					} else {
						console.log('Geocoder failed due to: ' + status);
					}
				});
			}
			;

			
		})

.controller('LocationsCtrl', function($scope, Locations, $state) {
	// With the new view caching in Ionic, Controllers are only called
	// when they are recreated or on app start, instead of every page change.
	// To listen for when this page is active (for example, to refresh data),
	// listen for the $ionicView.enter event:
	//
	// $scope.$on('$ionicView.enter', function(e) {
	// });

	Locations.all().then(function(locations) {
		$scope.locations = locations;
	});
	$scope.listCanSwipe = true;

	$scope.edit_loc = function(id) {
		$state.go('tab.location-detail');

	}

	// $scope.remove = function(chat) {
	// Chats.remove(chat);
	// };
})

.controller('AccountsCtrl', function($scope, $stateParams, Accounts) {
	$scope.accounts = Accounts.all();

	$scope.delete_acc = function(id) {

	};

	$scope.edit_acc = function(id) {

	};

	$scope.add_account = function() {

	};

})

.controller('MyCtrl', function($scope) {
	$scope.shouldShowDelete = false;
	$scope.shouldShowReorder = false;
	$scope.listCanSwipe = true;
})

.controller('SettingsCtrl', function($scope, $stateParams, User) {
	$scope.settings = User.settings();

	$scope.logoff = function() {
		User.logoff();
	};

});
