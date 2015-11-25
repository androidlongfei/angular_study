/**
 * Created by longfei on 15/10/26.
 */

//获取指定(myApp)模块对象
//[]代表第三方模块数组
var myApp = angular.module("myApp", [], function ($provide, $filterProvider,$compileProvider) {

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

    $scope.data = Data;

});

//自定义指令的第一种方法
//restrict:代表指令类型
//templateUrl:加载模板(就是另一个html)指令
//replace:代表替换标签（templateUrl必须包含标签）
myApp.directive('myTag',function(){
    return {
        restrict:'ECAM',
        templateUrl:'temp/other.html',
        //template:'<div>12345</div>',
        replace:true
    }
});



