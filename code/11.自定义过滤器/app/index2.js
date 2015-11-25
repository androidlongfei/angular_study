/**
 * Created by longfei on 15/10/26.
 */

//获取指定(myApp)模块对象
//[]代表第三方模块数组
var myApp = angular.module("myApp", [], function ($provide, $filterProvider) {

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

    // 自定义过滤器第一种方法
    $filterProvider.register('filterAge', function () {
        return function (obj) {
            var newObj = [];
            angular.forEach(obj, function (item) {
                if (item.age > 28) {
                    newObj.push(item);
                }
            });
            return newObj;
        };
    })
});

//绑定控制器
myApp.controller("secondController", function ($scope, Data) {

    $scope.data = Data;
    console.log(Data.message);
});

// 自定义过滤器第二种方法
myApp.filter("filterCity",function(){
    return function(obj){
        var newObj = [];
        angular.forEach(obj,function(item){
            if (item.city === "北京") {
                newObj.push(item);
            }
        });
        return newObj;
    };
});



