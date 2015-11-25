var myAppModel = angular.module('MyApp', []);
myAppModel.controller('MyTempCtrol', ['$scope',
    function ($scope) {
        $scope.data = 'hello.word';
    }
]);

myAppModel.directive('hello',function(){
    return {
        restrict:'AEMC',
        template:'<div>hello,word</div>',
        replace:true
    }
})
