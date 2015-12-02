var myAppModel = angular.module('MyApp', []);
myAppModel.controller('MyTempCtrol', ['$scope',
    function ($scope) {
        $scope.myName = '米饭';
    }
]);

myAppModel.directive('equalBind', function () {
    return {
        //scope:{=}，双向数据绑定(特点:与父scope中的属性进行双向绑定)
        scope:{
            tname:'='
        },
        restrict:'AEMC',
        template:'<input type="text" ng-model="tname"/>'
        //link:function(scope,element,attrs){
        //    scope.myfood = attrs.myfood;
        //}
    }
})
