var myAppModel = angular.module('MyApp', []);
myAppModel.controller('MyTempCtrol', ['$scope',
    function ($scope) {
        $scope.title = '点击展开';
        $scope.content = 'this is show content,this is show content,this is show content';
    }
]);

myAppModel.directive('myExtend', function () {
    return {
        restrict:'AEMC',
        replace:true,
        templateUrl:'././extend_item.html',
        link:function(scope,element,attr){
            scope.showMe = false;
            scope.toggle = function(){
                scope.showMe = !scope.showMe;
            }
        }
    }
})
