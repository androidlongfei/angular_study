/**
 * Created by longfei on 15/10/26.
 */

 //获取指定(myApp)模块对象
 //[]代表第三方模块数组
var myApp = angular.module("myApp",[]);

//绑定控制器
myApp.controller("secondController",function($scope){
    $scope.name = "张三";
    $scope.age = 100;
});
