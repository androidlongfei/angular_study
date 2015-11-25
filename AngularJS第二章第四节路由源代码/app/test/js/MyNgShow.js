var myAppModel = angular.module('MyApp', []);
myAppModel.controller('NgShowController', ['$scope',
    function($scope) {
        $scope.toggle = true;
        
        $scope.changeToggle = function () {
            $scope.toggle = !$scope.toggle;
            console.log($scope.toggle);
        }
    }
])
