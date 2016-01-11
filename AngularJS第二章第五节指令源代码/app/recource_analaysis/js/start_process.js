console.log(angular);
var count = 0;
for( var p in angular){
    if(angular.isFunction(angular[p])){
        count++;
        console.log('function ->'+p);
    }else{
        console.log('attr ->'+p+'-->'+angular[p]);
    }
    console.log('count ->'+count);
}

/*
注射器
 */
var injector = angular.injector();
console.log(injector);

/**
 * 模块
 */
var myAppModel = angular.module('MyApp', []);
console.log(myAppModel);

myAppModel.controller('MyTempCtrol', ['$scope',
    function ($scope) {
        $scope.data = 'hello.word';
    }
])
