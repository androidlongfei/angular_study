
/**
 * angular第一种启动过程,在html中，寻找ng-app指令（html中没有ng-app指令，自动启动）
 */
var myAppModel = angular.module('MyApp', []);

/**
 * angular第二种种启动过程,必须要调用ready方法，等dom渲染完成。(html中没有ng-app指令，手动启动)
 */
angular.element(document).ready(function () {
    angular.bootstrap(document,['MyAPP']);
})


myAppModel.controller('MyTempCtrol', ['$scope',
    function ($scope) {
        $scope.data = 'hello.word';
    }
])

//如果一个应用中有多个ng-app指令，那么必须满足以下几个条件
//1.多个ng-app指令必须不能嵌套
//2.第一个ng-app自动启动，从第二个之后ng-app必须手动启动。
