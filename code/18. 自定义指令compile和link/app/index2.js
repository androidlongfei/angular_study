/**
 * Created by longfei on 15/10/26.
 */

//获取指定(myApp)模块对象
//[]代表第三方模块数组
var myApp = angular.module("myApp", [], function ($provide, $filterProvider, $compileProvider) {

    // 初始化数据
    $provide.factory("Data", function () {
        return [{
            name: "张三",
            age: 34,
            city: "上海"
        }, {
            name: "李四",
            age: 30,
            city: "北京"
        }, {
            name: "王五",
            age: 28,
            city: "武汉"
        }];
    });

});

//绑定控制器(隐式依赖注入)
myApp.controller("firstController", function ($scope, Data) {

    $scope.myData = [{
        name: "张三",
        age: 34,
        city: "上海"
    }, {
        name: "李四",
        age: 30,
        city: "北京"
    }, {
        name: "王五",
        age: 28,
        city: "武汉"
    }];
    ;

});

myApp.directive('myTag', function () {
    return {
        restrict: 'ECAM',
        template: '<div>12345:{{user.name}}</div>',
        replace: true,
        compile: function (tElement, tAttr, transclude) {
            console.log(tElement);
            console.log(tAttr);
            console.log('compile 阶段,将页面的结构显示出来');
            tElement.append(angular.element('<div>新的dom元素</div>'))
            return {
                pre: function preLink() {
                    //编译阶段之后，所有子元素连接之前，执行
                    console.log('编译阶段之后，所有子元素连接之前，执行');
                },
                post: function postLink(scope,iElement,iAttr) {
                    //所有子元素指令连接之后在执行
                    iElement.on('click',function(){
                        //alert(iElement.html());
                        scope.$apply(function(){
                            scope.user.name = "click after";
                        });
                    });
                    console.log('所有子元素指令连接之后在执行');
                }
            }
        }
    }
});

/*
compile:主要用来改变dom的结构
link:增加dom的事件

 */


