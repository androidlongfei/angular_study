/**
 * Created by longfei on 15/10/26.
 */

 //获取指定(myApp)模块对象
 //[]代表第三方模块数组
var myApp = angular.module("myApp",[],function($provide){

    $provide.factory("custFactory",function(){
        return {
            weight:145
        }
    });

    $provide.service("custService",function(){
        //返回值必须是一个对象
        return [123];
    });
});

//绑定控制器
myApp.controller("secondController",function($scope,custService,custFactory){
    $scope.name = "张三";
    $scope.age = 100;
    console.log(custFactory.weight);
    console.log(custService);
});
