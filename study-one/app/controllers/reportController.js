app.controller('ReportController', function($scope, $rootScope, $http, $cookies, $location, $routeParams) {

    init();

    function init() {

        if (!$cookies.token) $location.url('/');

        $rootScope.bodyClass = 'admin';
        $scope.serverUrl = serverUrl;

        var data = {
            token: $cookies.token,
            taskId: $cookies.taskId,
            //reportInfo: $scope.report
        };
        if ($routeParams.taskId) {
            data.taskId = $routeParams.taskId;
        }

        $scope.taskId = data.taskId;

        var prefixColumns = [];
        $scope.samplePrefixes = [];

        var header = {
            'Content-Type': 'application/x-www-form-urlencoded'
        };
        $http({
            method: 'POST',
            url: serverUrl + 'api/task/detailedReport',
            data: $.param(data),
            headers: header
        }).
        success(function(data, status, headers, config) {
            console.log('success!');


            if (data.inputFiles != undefined) {
                //window.reportData = response.report;
                //console.log(data.report.replace(/\\"/g, '"'));
                $scope.inputFiles = $.parseJSON(data.inputFiles);
                var prefixHash = {};
                for (var i in $scope.inputFiles['sequenceFile']) {
                    var fileStr = $scope.inputFiles['sequenceFile'][i];
                    var prefixStr = fileStr.substr(1, fileStr.lastIndexOf('_') - 1);
                    prefixHash[prefixStr] = 1;
                }
                for (var prefix in prefixHash) {
                    $scope.samplePrefixes.push(prefix);
                    var prefixColumn = {
                        field: prefix,
                        title: prefix
                    };
                    prefixColumns.push(prefixColumn);
                }
            }

        }).
        error(function(data, status, headers, config) {
            console.log('login error!')
        });

        

        var header = {
            'Content-Type': 'application/x-www-form-urlencoded'
        };
        $http({
            method: 'POST',
            url: serverUrl + 'api/task/report',
            data: $.param(data),
            headers: header
        }).
        success(function(data, status, headers, config) {
            console.log('success!');

            var response = eval(eval(data));
            if (response.report != undefined) {
                //window.reportData = response.report;
                console.log(data.report.replace(/\\"/g, '"'));
                $scope.report = $.parseJSON(data.report);

                

            }

        }).
        error(function(data, status, headers, config) {
            console.log('login error!')
        });

    }

    $scope.logout = function() {
        $cookies.token = undefined;
        $location.url('/');
    }

    $scope.printMedicalReport = function() {
        window.print();
    }

    $scope.displayDetailedReport = function(taskId) {
        window.open('#/detailedReport/' + taskId, '_blank');
    }

});
