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

    //自定义指令的第一种方法
    //restrict:代表指令类型
    //template:指令模板
    //template:代表替换标签
    $compileProvider.directive('customerTag',function(){
        return {
            restrict:'ECAM',
            template:'<div>customer-tag123</div>',
            replace:true
        }
    });
});

//绑定控制器(隐式依赖注入)
myApp.controller("firstController", function ($scope, Data) {

    $scope.data = Data;

    $scope.statues = false;

    $scope.count=0;

    $scope.changeStatue = function(event){
        //事件源
        console.log(event.target);
        //通过element将angular对象转化为jQuery对象
        console.log(angular.element(event.target).html());
        $scope.statues = !$scope.statues
        $scope.count++;
        return !$scope.statues
    };

    $scope.deffaultStyle = {
        color:'red',
        'margin-top':'20px',
        'background-color':'green',
        height:'100px',
        width:'100px'
    };
});

//自定义指令的第二种方法
myApp.directive('myTag',function(){
    return {
        restrict:'ECAM',
        template:'<div>customer-tag123</div>',
        replace:true
    }
});



