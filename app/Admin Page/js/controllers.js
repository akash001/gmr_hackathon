var module = angular.module('starter.controllers', []);

module.controller('AdminCntrl', function AdminCntrl(){
this.name = "";
this.contacts = [
  {type: 'phone', value: '408 555 1212'},
  {type: 'email', value: 'john.smith@example.org'} ];
})
module.controller('mlidleverCntrl', ['$scope', function($scope) {
   $scope.name = "";
   $scope.mlids = [
  {"locnId": 1,
  "mrchNm":"Visa",
  "mrchAddr":"4903 GreatAmerica Mall Dr",
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
  alert("Hello");
};

$scope.expand_this_location = function(){
  alert("Hello")
};

}])

.controller('locationExpandCntrl', ['$scope', function($scope) {
   $scope.name = "John Smith";
   }]);
