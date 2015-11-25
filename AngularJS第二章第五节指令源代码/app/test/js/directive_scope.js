var myAppModel = angular.module('MyApp', []);
myAppModel.controller('MyTempCtrol', ['$scope',
    function ($scope) {
        $scope.data = 'hello.word';
    }
]);

myAppModel.directive('inputdata',function(){
    return {
        //scope独立作用域
        scope:{},
        restrict:'AEMC',
        replace:true,
        template:'<div><input type="text" ng-model="mydata"/>{{mydata}}</div>'
    }
});
