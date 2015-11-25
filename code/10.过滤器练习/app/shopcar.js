/**
 * Created by longfei on 15/10/26.
 */

    var myApp = angular.module("myApp",[],function($provide){

        $provide.service("carService",function () {
            return [
                {
                    id:120,
                    name:"iphone",
                    price:2000
                },
                {
                    id:110,
                    name:"ipad",
                    price:1700
                },
                {
                    id:90,
                    name:"iphone4s",
                    price:3000
                },
                {
                    id:150,
                    name:"iphone5",
                    price:4000
                },
                {
                    id:80,
                    name:"iphone6",
                    price:2300
                }
            ]
        })
    });

    myApp.factory("test",function(){
        return ["1","2"];
    });

    myApp.controller("productController",function($scope,carService){
        $scope.data = carService;
        $scope.order = "-";
        $scope.orderType = "id";

        $scope.changeType = function(type){
            $scope.orderType = type;
            if($scope.order === "-"){
                $scope.order = "";
            }else{
                $scope.order = "-";
            }
        }
    });
