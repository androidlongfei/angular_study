var myAppModel = angular.module('MyApp', []);
myAppModel.controller('MyTempCtrol', ['$scope','$http',
    function ($scope,$http) {

        var head = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }

        $http({
            method:'get',
            url:'http://192.168.5.199:8888/myfile/json/test.txt',
            header:head
        }).success(function(data,status,headers,config){
            console.log('获取数据成功');
            $scope.data = data;

        }).error(function(data,status,headers,config){
            console.log('获取数据失败');
            $scope.data = {name:'error',age:12};
        });

        alert(123);
    }
]);



