var myAppModel = angular.module('MyApp', []);
myAppModel.controller('MyTempCtrol', ['$scope',
    function ($scope) {
        $scope.expanders = [{
            title : 'Click me to expand',
            content : 'Hi there folks, I am the content that was hidden but is now shown.'
        }, {
            title : 'Click this',
            content : 'I am even better text than you have seen previously'
        }, {
            title : 'Test',
            content : 'test'
        }];
    }
]);

myAppModel.directive('myAccordion', function () {
    return {
        restrict:'AEMC',
        replace:true,
        transclude : true,
        template:'<div ng-transclude></div>',
        controller:function(){
            var allScope = [];
            this.addModel = function(myScope){
                allScope.push(myScope);
            }
            this.gotToggle = function (currentScope) {
                angular.forEach(allScope,function(itemScope){
                    if(currentScope != itemScope){
                        itemScope.showMe = false;
                    }
                })
            }
        },
        link:function(scope,element,attr){

        }
    }
});

myAppModel.directive('myExtend', function () {
    return {
        restrict:'AEMC',
        replace:true,
        scope:{
            mytitle:'@',
            mycontent:'@'
        },
        require:'^?myAccordion',
        templateUrl:'././accordion_item.html',
        link:function(scope,element,attr,accordionCtrl){
            console.log(accordionCtrl);
            scope.showMe = false;
            accordionCtrl.addModel(scope);
            scope.toggle = function(){
                console.log('click...');
                scope.showMe = !scope.showMe;
                accordionCtrl.gotToggle(scope);
            }
        }
    }
});



