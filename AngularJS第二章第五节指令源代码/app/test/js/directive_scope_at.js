var myAppModel = angular.module('MyApp', []);
myAppModel.controller('MyTempCtrol', ['$scope',
    function ($scope) {
        $scope.food = '米饭';
    }
]);

myAppModel.directive('atbind', function () {
    return {
        //scope:{@}，把当前属性作为字符串传递
        scope:{
            myfood:'@'
        },
        restrict:'AEMC',
        template:'<div>{{myfood}}</div>'
        //link:function(scope,element,attrs){
        //    scope.myfood = attrs.myfood;
        //}
    }
})
