app.controller('ParameterController', function($scope, $rootScope, $http, $cookies, $location, $window) {

    init();

    function init() {
        if (!$cookies.token) $location.url('/');

        $rootScope.bodyClass = 'admin';

        // $scope.parameters = $rootScope.parameters;
        $scope.parameters = JSON.parse($window.sessionStorage.parameters);
    }

    $scope.clickCheckbox = function() {
        //$window.alert($scope.parameter.isRapidMode);
    }

    $scope.nextPage = function() {

        //prepare report date for server to store
        var currentDate = new Date();
        $scope.report = {};
        $scope.report.dateYear = currentDate.getFullYear();
        $scope.report.dateMonth = currentDate.getMonth();
        $scope.report.dateDay = currentDate.getDate();


        var contact = undefined;
        var contactWB = JSON.parse($window.sessionStorage.contactWB);
        var inputFiles = JSON.parse($window.sessionStorage.inputFiles);
        var sequenceFiles = inputFiles['sequenceFile'];
        for (var i = 0; i < contactWB.Sheet1.length; i++) {
            for (var j = 0; j < sequenceFiles.length; j++) {
                if (sequenceFiles[j].indexOf(contactWB.Sheet1[i]["测序文件"]) != -1) {
                    contact = contactWB.Sheet1[i];
                    var report = {};
                    report.sampleNum = contact["样品编号"];
                    report.username = contact["姓名"];
                    report.gender = contact["性别"];
                    report.birthday = contact["年龄"];
                    report.sampleType = contact["样品类型"];
                    report.hospital = contact["送检医院"];
                    report.doctor = contact["送检医生"];
                    report.sampleDate = contact["收样日期"];
                    report.diseaseCharacter = contact["临床表现"];
                    report.familyHistory = contact["家族史"];
                    report.productNum = contact["检测产品编号"];
                    report.checkType = contact["检测方法"];

                    $scope.report[contactWB.Sheet1[i]["测序文件"]] = report;
                }
            }
        }
        
        var data = {
            token: $cookies.token,
            inputFiles: inputFiles,
            params: $scope.parameter,
            taskName: 'cardio',
            reportInfo: $scope.report
        };

        var header = {
            'Content-Type': 'application/x-www-form-urlencoded'
        };
        $http({
            method: 'POST',
            url: serverUrl + 'api/task/execute',
            data: $.param(data),
            headers: header
        }).
        success(function(data, status, headers, config) {
            console.log('success!');
            var response = eval(data);
            if (response.taskId) {
                $cookies.taskId = response.taskId;
                $location.url('/analyze/' + response.taskId);
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

});
