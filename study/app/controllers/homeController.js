app.controller('HomeController', function($scope, $rootScope, $http, $cookies, $location, $window) {

    init();

    function init() {
        if (!$cookies.token) $location.url('/');
        $rootScope.bodyClass = 'admin';

        clearInterval($rootScope.queryTimer);

        var data = {
            token: $cookies.token
        };

        var header = {
            'Content-Type': 'application/x-www-form-urlencoded'
        };

        
        $http({
            method: 'POST',
            url: serverUrl + 'api/app/browse',
            data: $.param(data),
            headers: header
        }).
        success(function(data, status, headers, config) {
            console.log('success!');
            var response = eval(data);
            if (response.apps) {
                $scope.apps = response.apps;
                //$rootScope.apps = response.apps;
                $window.sessionStorage.apps = JSON.stringify(response.apps);
            }

        }).
        error(function(data, status, headers, config) {
            console.log('Fetch app configuration failed!')
        });
        

        $http({
            method: 'POST',
            url: serverUrl + 'api/task/browse',
            data: $.param(data),
            headers: header
        }).
        success(function(data, status, headers, config) {
            console.log('success!');
            var response = eval(data);
            if (response.tasks) {
                $scope.tasks = response.tasks;

                for (var i = 0; i < $scope.tasks.length; i++) {
                    var inputFile = JSON.parse($scope.tasks[i].inputFileJson);
                    $scope.tasks[i].sequenceFile = inputFile.sequenceFile.join(',');
                    $scope.tasks[i].targetRegionFile = inputFile.targetRegionFile;

                    $scope.tasks[i].creationDate = (new Date($scope.tasks[i].creationDate)).toLocaleDateString() + ' ' + (new Date($scope.tasks[i].creationDate)).toLocaleTimeString();
                }
            }

        }).
        error(function(data, status, headers, config) {
            console.log('Fetch tasks failed!')
        });

    }

    $scope.nextPage = function(appName) {
        var apps = JSON.parse($window.sessionStorage.apps);
        var appConfig = apps[appName];

        // $rootScope.parameters = appConfig.parameters;
        // $rootScope.appName = appName;
        // $rootScope.fileNavPaths = [];
        $window.sessionStorage.parameters = JSON.stringify(appConfig.parameters);
        $window.sessionStorage.appName = appName;
        var fileNavPaths = [];

        
        for (var key in appConfig.files) {
           if (appConfig.files.hasOwnProperty(key)) {
                var appObj = appConfig.files[key];

                var fileNavPath = {};
                if (appObj.source == "select") {
                    fileNavPath.url = '/file';
                    fileUrl = fileNavPath.url;
                }
                if (appObj.source == "upload") {
                    fileNavPath.url = '/upload';
                }
                fileNavPath.title = appObj.title;
                fileNavPath.name = key;

                fileNavPaths.push(fileNavPath);
            }
        }

        $window.sessionStorage.fileNavPaths = JSON.stringify(fileNavPaths);
        console.log($window.sessionStorage.fileNavPaths);

        // $rootScope.currentNavPath = $rootScope.fileNavPaths.shift();
        // $rootScope.inputFiles = {};
        // $location.url($rootScope.currentNavPath.url);
        $window.sessionStorage.inputFiles = JSON.stringify({});
        $location.url(fileNavPaths[0].url + '/0');
    }


    $scope.logout = function() {
        $cookies.token = undefined;
        $location.url('/');
    }
});