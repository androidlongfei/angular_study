var myAppModel = angular.module('MyApp', []);
myAppModel.controller('MyTempCtrol', ['$scope',
    function ($scope) {
        $scope.food = '米饭';
    }
]);

myAppModel.directive('atbind', function () {
    return {
        //scope:{@}，双向数据绑定
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
