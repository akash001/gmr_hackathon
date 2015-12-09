angular.module('starter.controllers', ['ionic','starter.services','starter.filters'])

.controller('LoginCtrl', function($scope, $ionicPopup, $state,UserAuth) {
    $scope.data = {};

//    $http.get('https://cors-test.appspot.com/test').then(function(resp) {
//    console.log('Success 123', resp);
//    // For JSON responses, resp.data contains the result
//    }, function(err) {
//      console.error('ERR', err);
//      // err.status will contain the status code
//    })
 
    $scope.login = function() {
    	var u = UserAuth.authenticate($scope.data.username, $scope.data.password);
       if (u != null) {
            $state.go('tab.locations');
        }
       else {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
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
})

.controller('LocationDetailCtrl',function($scope,$stateParams,$ionicLoading,$compile,Locations){
	$scope.location  = Locations.get($stateParams.id);
	
	var geocoder = new google.maps.Geocoder;
	  var infowindow = new google.maps.InfoWindow;
			 
	var myLatlng = new google.maps.LatLng(37.3000, -120.4833);
	 
	var mapOptions = {
	     center: myLatlng,
	     zoom: 16,
	     mapTypeId: google.maps.MapTypeId.ROADMAP,
	     disableDoubleClickZoom:true
	   };
	 
	 var map = new google.maps.Map(document.getElementById("map"), mapOptions);
	 map.setCenter(new google.maps.LatLng(37.3000, -120.4833));
	 var myLocation = new google.maps.Marker({
                position: new google.maps.LatLng(37.3000, -120.4833),
                map: map,
                title: "My Location"
            });
	     
	 map.addListener('click', function(event) {
		 		console.log('here');
	    	    myLocation.setPosition(event.latLng);
	    	    geocodeLatLng(geocoder,map,event.latLng);
	    	  });

	 
//	        navigator.geolocation.getCurrentPosition(function(pos) {
//	            map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
//	            var myLocation = new google.maps.Marker({
//	                position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
//	                map: map,
//	                title: "My Location"
//	            });
//	        });
	 
	 
	 function geocodeLatLng(geocoder, map,latlng) {
		  geocoder.geocode({'location': latlng}, function(results, status) {
		    if (status === google.maps.GeocoderStatus.OK) {
		      if (results[1]) {
		       
		        console.log(results[0].formatted_address);
		      } else {
		        console.log('No results found');
		      }
		    } else {
		      console.log('Geocoder failed due to: ' + status);
		    }
		  });
		};
	 
	        $scope.map = map;
})

.controller('LocationsCtrl', function($scope, Locations, $state) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  $scope.locations = Locations.all();
  $scope.listCanSwipe = true;
  
  $scope.edit_loc=function(id){
	  $state.go('tab.location-detail');
	  
  }
  
  
//  $scope.remove = function(chat) {
//    Chats.remove(chat);
//  };
})

.controller('AccountsCtrl', function($scope, $stateParams, Accounts) {
  $scope.accounts = Accounts.all();
  
  $scope.delete_acc = function(id){
	  
  };
  
  $scope.edit_acc = function(id){
	  
  };
  
  $scope.add_account = function(){
	  
  };
  
  
})

.controller('MyCtrl', function($scope) {
 $scope.shouldShowDelete = false;
 $scope.shouldShowReorder = false;
 $scope.listCanSwipe = true;
})

.controller('SettingsCtrl', function($scope,$stateParams,User) {
  $scope.settings = User.settings();
  
  $scope.logoff = function(){
	User.logoff();  
  }; 
  
});
