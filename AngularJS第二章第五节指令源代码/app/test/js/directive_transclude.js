var myAppModel = angular.module('MyApp', []);
myAppModel.controller('MyTempCtrol', ['$scope',
    function ($scope) {
        $scope.data = 'hello.word';
    }
]);

myAppModel.directive('hello',function(){
    return {
        restrict:'AEMC',
        transclude:true,
        template:'<div>这是指令要替换的内容<div ng-transclude></div></div>'
    }
})
