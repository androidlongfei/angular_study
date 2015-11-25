/**
 * Created by longfei on 15/10/26.
 */

var myApp = angular.module('myApp', []);

myApp.controller('secondController', function($scope) {
    $scope.name = "John";
    $scope.age = 100;
});

myApp.controller('threeController', function($scope) {
    $scope.myName = "张三";
});