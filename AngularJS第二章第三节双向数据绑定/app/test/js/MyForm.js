var bookStoreCtrls = angular.module('MyApp', []);

bookStoreCtrls.controller('formCtrls', ['$scope',
    function($scope) {

        //初始值
        $scope.myInfo = {
            user:"hlf",
            email:"496444154@qq.com",
            password:123456,
            auto_login:true
        };

        //获取值
        $scope.getFormData = function(){
            console.log($scope.myInfo);
        }

        //设置值
        $scope.setFormData = function(){
            $scope.myInfo = {
                user:'longfei',
                email:"326166762@qq.com",
                password:654321,
                auto_login:false
            }
        }

        $scope.resetFormData = function(){
            $scope.myInfo = {
                user:"hlf",
                email:"496444154@qq.com",
                password:123456,
                auto_login:true
            };
        }

    }
])
