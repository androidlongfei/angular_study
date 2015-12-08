var myAppModel = angular.module('MyApp', []);
myAppModel.controller('MyTempCtrol', ['$scope',
    function ($scope) {
        $scope.data = 'hello.word';
    }
]);

myAppModel.directive('superman', function () {
    return {
        //scope:{}创建独立作用域
        scope:{},
        restrict:'AE',
        //向外曝露方法，供外调用
        controller: function ($scope) {
            $scope.ability = [];
            this.addMyStrength = function(){
                $scope.ability.push("力量");
            }
            this.addMyAgile = function(){
                $scope.ability.push("敏捷");
            }
            this.addMyLight = function(){
                $scope.ability.push("圣光");
            }
        },
        link: function (scope,element,attrs) {
            element.addClass('btn btn-primary');
            element.bind('mouseenter',function(event){
                console.log(scope.ability);

            })
        }
    }
});

myAppModel.directive('mystrength',function(){
    return {
        //require：获取到superman指令的对象，并注入到link(就是第四个参数)中，
        require:'?superman',
        link:function(scope,element,attrs,supermanCtrl){
            supermanCtrl.addMyStrength();
        }
    }
});

myAppModel.directive('myaglie',function(){
    return {
        require:'^superman',
        link:function(scope,element,attrs,supermanCtrl){
            supermanCtrl.addMyAgile();
        }
    }
});

myAppModel.directive('mylight',function(){
    return {
        require:'^superman',
        link:function(scope,element,attrs,supermanCtrl){
            supermanCtrl.addMyLight();
        }
    }
})

