(function(angular) {

var module = angular.module('webAdminGMRMerchant', []);

module.controller('mlidleverCntrl', ['$scope',  function($scope) {
   $scope.name = "Administrator";
   $scope.mlids = [
  {"locnId": 1,
  "mrchNm":"VisaVisaVisaVisaVisaVisa",
  "mrchAddr":"4903 GreatAmerica Mall Dr GreatAmerica Mall Dr, Milpitas, Milpitas, CA. 95035, US GreatAmerica Mall Dr, Milpitas, Milpitas, CA. 95035, US",
  "mrchCity":"Milpitas",
  "mrchState":"CA",
  "mrchZip":"95035",
  "mrchCtry":"US",
  "mrchLat":37.3669749,
  "mrchLong":121.903354,
"userFeedbacks":[
{"mrchName":"HomeDepot Corp",
  "mrchAddr":"4903 GreatAmerica Mall Dr",
  "mrchCity":"Milpitas",
  "mrchState":"CA",
  "mrchZip":"95035",
  "mrchCtry":"US",
  "mrchLat":37.3669749,
  "mrchLong":-121.903354,
  "noOfVotes":20
  },
{"mrchName":"HomeDepot Corp",
  "mrchAddr":"4903 GreatAmerica Mall Dr",
  "mrchCity":"Milpitas",
  "mrchState":"CA",
  "mrchZip":"95035",
  "mrchCtry":"US",
  "mrchLat":37.3669749,
  "mrchLong":-121.903354,
  "noOfVotes":10
  }
]
},
{"locnId": 2,
  "mrchNm":"Visa Inc",
  "mrchAddr":"4903 GreatAmerica Mall Dr",
  "mrchCity":"Milpitas",
  "mrchState":"CA",
  "mrchZip":"95035",
  "mrchCtry":"US",
  "mrchLat":37.3669749,
  "mrchLong":121.903354,
"userFeedbacks":[
{"mrchName":"Visa Inc",
  "mrchAddr":"4903 GreatAmerica Mall Dr",
  "mrchCity":"Milpitas",
  "mrchState":"CA",
  "mrchZip":"95035",
  "mrchCtry":"US",
  "mrchLat":37.3669749,
  "mrchLong":-121.903354,
  "noOfVotes":20
  },
{"mrchName":"Visa Corp",
  "mrchAddr":"4903 GreatAmerica Mall Dr",
  "mrchCity":"Milpitas",
  "mrchState":"CA",
  "mrchZip":"95035",
  "mrchCtry":"US",
  "mrchLat":37.3669749,
  "mrchLong":-121.903354,
  "noOfVotes":10
  }
]
}
];

$scope.push_click = function(){
  alert('Thank You for helping GMR');
};

$scope.expand_this_location = function(){
  $scope.toggle = true;
};

}])
})(window.angular);