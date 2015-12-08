var myAppModel = angular.module('MyApp', []);
myAppModel.controller('MyTempCtrol', ['$scope',
    function ($scope) {
        $scope.food = '米饭';
        $scope.data = {
            url:'www.baidu.com',
            text:'this is baidu dns'
        }
    }
]);

myAppModel.directive('atbind', function () {
    return {
        //scope:{@}，把指令的属性与指令独立作用域的属性进行绑定，进而在独立作用域中可以获取到指令属性的值。
        scope:{
            thisfood:'@myfood',
            myUrl:'@url',
            myText:'@'
        },
        restrict:'AEMC',
        template:'<div>{{thisfood}}</div>' + '<br>'+'<div>url:{{myUrl}}===={{myText}}</div>'
        //link:function(scope,element,attrs){
        //    scope.myfood = attrs.myfood;
        //}
    }
})
