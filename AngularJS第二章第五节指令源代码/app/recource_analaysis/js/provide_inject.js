/*
注射器
 */
var injector = angular.injector();
console.log(injector);

/**
 * 模块
 */
var myAppModel = angular.module('MyApp', []);
myAppModel.factory('game',function () {
    return {
        name:'张三学习中...'
    }
});

myAppModel.controller('MyTempCtrol', ['$scope','$injector',
    function ($scope,$injector) {
        $scope.data = 'hello.word';
        $injector.invoke(function(game){
            console.log('输出...'+game.name);
        })

        //3259行
        console.log($injector.annotate(function (arg1,arg2) {
            
        }));
    }
])
