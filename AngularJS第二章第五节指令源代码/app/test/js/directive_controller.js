var myAppModel = angular.module('MyApp', []);
myAppModel.controller('MyTempCtrol', ['$scope',
    function ($scope) {
        $scope.loadMyData = function () {
            console.log('load 加载数据');
        }
    }
]);

myAppModel.controller('MyTempCtrol2', ['$scope',
    function ($scope) {
        $scope.loadMyData2 = function () {
            console.log('load2加载数据');
        }
    }
]);

myAppModel.controller('MyTempCtrol3', ['$scope',
    function ($scope) {
        $scope.loadMyData3 = function () {
            console.log('load3加载数据');
        }
    }
]);

myAppModel.directive('load', function () {
    return {
        restrict: 'AEMC',
        replace: true,
        template: '<div>鼠标移入后开始加载数据</div>',
        link: function (scope, element, attrs) {
            element.bind('mouseenter', function () {
                //scope.loadMyData();
                scope.$apply(attrs.howload);
            })
        }
    }
})
