var myAppModel = angular.module('MyApp', []);
myAppModel.controller('MyTempCtrol', ['$scope',
    function ($scope) {
        $scope.myName = '米饭';

        $scope.sayHi = function (name) {
            alert(name+" call hello,world");
        }

        $scope.sayMe = function (name) {
            alert(name+" call me hello,world");
        }
    }
]);

myAppModel.directive('andBind', function () {
    return {
        //首先将外部作用域的sayHi方法赋给外部属性say,然后再把外部属性say与独立作用域mysay绑定(通过&),这样在独立作用域内就可以调用外部的sayHi了。
        //独立作用域与外部的属性名一样就可以只用'&',否则就要在后面就上外部属性的名字
        //scope:{&}，传递一个来自父scope内的函数,稍后调用
        scope:{
            mysay:'&say',
            mysayme:'&'
        },
        restrict:'AEMC',
        template:'<input type="text" ng-model="username"/> <br>'+'<button class="btn btn-default" ng-click="mysayme(123)" ng-dblclick="mysay({name:username})">click</button></br>'
    }
})
