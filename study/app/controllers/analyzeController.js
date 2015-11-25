app.controller('AnalyzeController', function($scope, $http, $cookies, $rootScope, $location, $routeParams) {

    //I like to have an init() for controllers that need to perform some initialization. Keeps things in
    //one place...not required though especially in the simple example below
    init();

    function init() {
        if (!$cookies.token) $location.url('/');

        $rootScope.bodyClass = 'admin';
        $scope.logs = '';
        $scope.taskId = $routeParams.taskId || $cookies.taskId;

        $scope.enableNextPage = true;
        
        var data = {
            token: $cookies.token,
            taskId: $scope.taskId
        };

        clearInterval($rootScope.queryTimer);

        var header = {
            'Content-Type': 'application/x-www-form-urlencoded'
        };
        var queryFunc = function() {
            $http({
                method: 'POST',
                url: serverUrl + 'api/task/query',
                data: $.param(data),
                headers: header
            }).
            success(function(data, status, headers, config) {
                console.log('success!');
                var response = eval(data);
                if (response.progress !== undefined) {
                    $scope.progress = response.progress;
                    //response.log.join('<br>');
                    $scope.logs += response.log.join("\n");
                    

                    if (response.progress == '100') {
                        clearInterval($rootScope.queryTimer);
                        $scope.enableNextPage = false;
                        $('#progressBar').html($scope.progress + '%').removeClass('active');
                    }
                }

            }).
            error(function(data, status, headers, config) {
                console.log('login error!')
            });
        }

        $rootScope.queryTimer = setInterval(queryFunc, 5000);

    }

    $scope.logout = function() {
        $cookies.token = undefined;
        clearInterval($rootScope.queryTimer);
        $location.url('/');
    }
});