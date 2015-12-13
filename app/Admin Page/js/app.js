(function(angular) {

var module = angular.module('webAdminGMRMerchant', []);

module.config(['$httpProvider', function($httpProvider) {  
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common["X-Requested-With"];
    $httpProvider.defaults.headers.common["Accept"] = "application/json";
    $httpProvider.defaults.headers.common["Content-Type"] = "application/json";
}]);

module.controller('mlidleverCntrl', function($scope,$http) {
  $http.defaults.headers.put = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With'
        };
  $http.defaults.useXDomain = true;
  $scope.name = "Administrator";
  $http.get('http://107.223.209.6:8080/GMRMerchantDetails/userfeedback').then(function(data) {
    $scope.mlids = data.data;
    console.log(data.data[0].userFeedbacks[0]);
    // For JSON responses, resp.data contains the result
  }, function(err) {
    console.error('ERR', err);
    $scope.mlids = [
  {"locnId": 1,
  "mrchName":"Home Depot Inc",
  "mrchAddress":"4903 GreatAmerica Mall Dr",
  "mrchCity":"Milpitas",
  "mrchState":"CA",
  "mrchZip":"95035",
  "mrchCtry":"US",
  "mrchLat":37.3669749,
  "mrchLong":121.903354,
"userFeedbacks":[
{"mrchName":"HomeDepot Corp",
  "mrchAddress":"4903 GreatAmerica Mall Dr",
  "mrchCity":"Milpitas",
  "mrchState":"CA",
  "mrchZip":"95035",
  "mrchCtry":"US",
  "mrchLat":37.3669749,
  "mrchLong":-121.903354,
  "totVotes":20
  },
{"mrchName":"HomeDepot Corp",
  "mrchAddress":"4902 GreatAmerica Mall Dr",
  "mrchCity":"Milpitas",
  "mrchState":"CA",
  "mrchZip":"95055",
  "mrchCtry":"US",
  "mrchLat":37.3669749,
  "mrchLong":-121.903354,
  "totVotes":10
  }
]
},
{"locnId": 2,
  "mrchName":"TargetInc",
  "mrchAddress":"800 Metro Center Blvd",
  "mrchCity":"Foster City",
  "mrchState":"CA",
  "mrchZip":"94404",
  "mrchCtry":"US",
  "mrchLat":37.3669749,
  "mrchLong":121.903354,
"userFeedbacks":[
{"mrchName":"Visa Inc",
  "mrchAddress":"800 Metro Center Blvd",
  "mrchCity":"Milpitas",
  "mrchState":"CA",
  "mrchZip":"95035",
  "mrchCtry":"US",
  "mrchLat":37.3669749,
  "mrchLong":-121.903354,
  "totVotes":20
  },
{"mrchName":"Visa Corp",
  "mrchAddress":"4903 GreatAmerica Mall Dr",
  "mrchCity":"Milpitas",
  "mrchState":"CA",
  "mrchZip":"95035",
  "mrchCtry":"US",
  "mrchLat":37.3669749,
  "mrchLong":-121.903354,
  "totVotes":10
  }
]
}
];
    // err.status will contain the status code
})


$scope.push_click = function(){
  alert('Thank You for helping GMR');
};

$scope.expand_this_location = function(){
  $scope.toggle = true;
};

});

})(window.angular);