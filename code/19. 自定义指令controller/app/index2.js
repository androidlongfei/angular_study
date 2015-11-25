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

    $scope.exportPdfFile = function () {
        var doc = new jsPDF();

        var specialElementHandlers = {
            '#editor': function (element, renderer) {
                return true;
            }
        };

        doc.fromHTML($("#divContent").get(0), 15, 15, {
            'width': 170,
            'elementHandlers': specialElementHandlers
        });
        doc.save("export.pdf");
        alert($("#divContent").html());
    }

    $scope.exportTextFile = function(){
        var doc = new jsPDF();
        doc.text(20, 20, ' Do you like that ,这是一个文本');
        doc.save("document.pdf");

    }


});

myApp.directive('myTag', function () {
    return {
        restrict: 'ECAM',
        controller: function ($scope) {
            //console.log($scope);
            $scope.myData = [{
                name: "张三",
                age: 34,
                city: "上海1"
            }, {
                name: "李四",
                age: 30,
                city: "北京1"
            }, {
                name: "王五",
                age: 28,
                city: "武汉1"
            }];
            this.addElement = function(){
                $scope.$apply(function () {
                    $scope.myData.push({
                        name: "何七",
                        age: 30,
                        city: "湖北"
                    });
                })

            }
        },
        controllerAs:'myController',
        template: '<div id="divContent"><ul><li ng-repeat="data in myData">{{data.city}}</li></ul><my-button></my-button></div>',
        replace: true
    }
});

myApp.directive('myButton',function(){
    return {
        restrict:'ECAM',
        require:'^myTag',
        template:'<button type="button">test</button>',
        replace:true,
        link:function(scope,iElement,iAttrs,myController){
            iElement.on('click',myController.addElement);
        }
    }
});

/*
 compile:主要用来改变dom的结构
 link:增加dom的事件

 */


