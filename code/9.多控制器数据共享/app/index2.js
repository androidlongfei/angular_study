/**
 * Created by longfei on 15/10/26.
 */

 //获取指定(myApp)模块对象
 //[]代表第三方模块数组
var myApp = angular.module("myApp",[],function($provide){

    $provide.factory("Data",function(){
        return {
            message:145
        }
    });
});

//绑定控制器
myApp.controller("secondController",function($scope,Data){

    $scope.data = {
        name:"张三",
        age:100
    }
    Data.message = $scope.data.name;
    $scope.Data = Data;
    console.log(Data.message);
    console.log($scope);
});

myApp.controller("threeController",function($scope,Data){
    //$scope.$$prevSibling上一个兄弟对象
    $scope.data = $scope.$$prevSibling.data;
    $scope.Data = Data;
    console.log(Data.message);
    console.log($scope);
});
