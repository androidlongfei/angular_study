var myAppModel = angular.module('MyApp', []);
myAppModel.controller('MyTempCtrol', ['$scope',
    function ($scope) {
        $scope.myName = '米饭';

        $scope.sayHi = function (name) {
            alert(name+" call hello,world");
        }
    }
]);

myAppModel.directive('andBind', function () {
    return {
        //scope:{&}，传递一个来自父scope内的函数,稍后调用
        scope:{
            say:'&'
        },
        restrict:'AEMC',
        template:'<input type="text" ng-model="username"/> <br>'+'<button class="btn btn-default" ng-click="say({name:username})">click</button></br>'
    }
})
