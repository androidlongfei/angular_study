app.controller('DiskController', function($scope, $rootScope, $http, $cookies, $location) {

    init();

    function init() {
        if (!$cookies.token) $location.url('/');
        $rootScope.bodyClass = 'admin';
    }

    $scope.nextPage = function() {
        $location.url('/contact');
    }

    $scope.logout = function() {
        $cookies.token = undefined;
        $location.url('/');
    }
});