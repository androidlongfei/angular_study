var myAppModel = angular.module('MyApp', []);
myAppModel.controller('MyTempCtrol', ['$scope','$http',
    function ($scope,$http) {

        $http({
            method:get,
            url:'data.json'
        }).success(function(data,status,headers,config){
            console.log('获取数据成功');
            $scope.data = data;

        }).error(function(data,status,headers,config){
            console.log('获取数据失败');
        });
    }
]);



