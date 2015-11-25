var routerApp = angular.module('myRouteApp', ['ui.router', 'myCtrls']);
routerApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/first');
    $stateProvider
        .state('first', {
            url: '/first',
            views: {
                '': {
                    templateUrl: 'my_tpls/first.html'
                },
                'topbar@first': {
                    templateUrl: 'my_tpls/topbar.html'
                },
                'main@first': {
                    templateUrl: 'my_tpls/home.html'
                }
            }
        })
        .state('first.usermng', {
            url: '/usermng',
            views: {
                'main@first': {
                    templateUrl: 'my_tpls/usermng.html',
                    controller: function ($scope, $state) {
                        $scope.addUserType = function () {
                            $state.go("first.usermng.addusertype");
                        }
                    }
                }
            }
        })
        .state('first.usermng.highendusers', {
            url: '/highendusers',
            templateUrl: 'my_tpls/highendusers.html'
        })
        .state('first.usermng.normalusers', {
            url: '/normalusers',
            templateUrl: 'my_tpls/normalusers.html'
        })
        .state('first.usermng.lowusers', {
            url: '/lowusers',
            templateUrl: 'my_tpls/lowusers.html'
        })
        .state('first.usermng.addusertype', {
            url: '/addusertype',
            templateUrl: 'my_tpls/addusertypeform.html',
            controller: function ($scope, $state) {
                $scope.backToPrevious = function () {
                    window.history.back();
                }
            }
        })
        .state('first.permission', {
            url: '/permission',
            views: {
                'bottom@first': {
                    template: '这里是权限管理'
                }
            }
        })
        .state('first.report', {
            url: '/report',
            views: {
                'main@first': {
                    template: '这里是报表管理'
                }
            }
        })
        .state('first.settings', {
            url: '/settings',
            views: {
                'main@first': {
                    template: '这里是系统设置'
                }
            }
        })
});

