var myAppModel = angular.module('MyApp', []);
myAppModel.controller('MyTempCtrol', ['$scope',
    function ($scope) {
        $scope.data = 'hello.word';
    }
])
