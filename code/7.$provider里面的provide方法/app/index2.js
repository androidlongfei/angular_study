/**
 * Created by longfei on 15/10/26.
 */

 //获取指定(myApp)模块对象
 //[]代表第三方模块数组
var myApp = angular.module("myApp",[],function($provide){

    //自定义服务
    $provide.provider("custServer",function(){
        this.$get = function(){
            return {
                weight:124
            }
        }
    })

    //自定义服务
    $provide.provider("custServer1",function(){
        this.$get = function(){
            return {
                weight:145
            }
        }
    })
});

//绑定控制器
myApp.controller("secondController",function($scope,custServer,custServer1){
    $scope.name = "张三";
    $scope.age = 100;
    console.log(custServer.weight);
    console.log(custServer1.weight);
});
