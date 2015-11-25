app.controller('LoginController', function($scope, $rootScope, $http, $cookies, $location) {

    init();

    function init() {

        $rootScope.bodyClass = 'login';
    }

    $scope.verifyUser = function() {
        var username = $scope.username;
        var password = $scope.password;

        var data = {
            username: username,
            password: password,
            deviceId: 'web'
        };

        var header = {
            'Content-Type': 'application/x-www-form-urlencoded'
        };
        $http({
            method: 'POST',
            url: serverUrl + 'api/login',
            data: $.param(data),
            headers: header
        }).
        success(function(data, status, headers, config) {
            console.log('success!');
            var response = eval(data);
            if (response.token) {
                $cookies.token = response.token;
                $location.path('/home');
            }

        }).
        error(function(data, status, headers, config) {
            console.log('login error!')
        });

    };



});
