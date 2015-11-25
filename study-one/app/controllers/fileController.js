app.controller('FileController', function($scope, $rootScope, $http, $cookies, $location, $window, $routeParams) {
    var fileNavPaths;

    init();

    
    function init() {
        if (!$cookies.token) $location.url('/');

        // $scope.title = $rootScope.currentNavPath.title;
        fileNavPaths = JSON.parse($window.sessionStorage.fileNavPaths);
        $scope.title = fileNavPaths[$routeParams.navKey].title;
        $rootScope.bodyClass = 'admin';

        var data = {
            token: $cookies.token
        };

        var header = {
            'Content-Type': 'application/x-www-form-urlencoded'
        };
        $http({
            method: 'POST',
            url: serverUrl + 'api/file/browse',
            data: $.param(data),
            headers: header
        }).
        success(function(data, status, headers, config) {
            console.log('success!');
            var response = eval(data);
            if (response.files) {
                $cookies.files = response.files;
                $scope.files = response.files;
                //$rootScope.selectedFiles = [];
            }

        }).
        error(function(data, status, headers, config) {
            console.log('login error!');
        });


    }

    $scope.clickFile = function(index) {
        var currentImageName = $('#imgContainer_' + index).attr('name');
        if (currentImageName.indexOf('.fq.gz') == -1) {
            window.alert('选择的测序文件格式错误，应该以.fq.gz结尾！');
        }

        var samplePrefix = '';
        if (currentImageName.indexOf('1.fq.gz') != -1) {
            samplePrefix = currentImageName.substr(0, currentImageName.indexOf('1.fq.gz')) + "2.fq.gz";
        } else if ($('#imgContainer_' + index).attr('name').indexOf('2.fq.gz') != -1) {
            samplePrefix = currentImageName.substr(0, currentImageName.indexOf('2.fq.gz')) + "1.fq.gz";
        } else {
            window.alert('测序文件命名错误，应该以1.fq.gz结尾和2.fq.gz！');
            return;
        }

        if ($('#imgContainer_' + index).hasClass('selectedImgContainer')) {
            $('#imgContainer_' + index).removeClass('selectedImgContainer');
            $("div.imgContainer[name='" + samplePrefix + "']").removeClass('selectedImgContainer');
        } else {
            $('#imgContainer_' + index).addClass('selectedImgContainer');
            $("div.imgContainer[name='" + samplePrefix + "']").addClass('selectedImgContainer');
        }
    }

    $scope.nextPage = function() {
        var selectedFiles = [];
        $('.selectedImgContainer > input').each(function() {
            selectedFiles.push($(this).val());
        })

        // $rootScope.inputFiles[$rootScope.currentNavPath.name] = selectedFiles;
        // console.log($rootScope.inputFiles);

        // if ($rootScope.fileNavPaths.length > 0) {
        //     $rootScope.currentNavPath = $rootScope.fileNavPaths.shift();
        //     $location.url($rootScope.currentNavPath.url + '?burst=' + (new Date()).getTime());
        // } else {
        //     $location.url('/contact');
        // }

        var fileName = fileNavPaths[$routeParams.navKey].name;

        var inputFiles = JSON.parse($window.sessionStorage.inputFiles);
        inputFiles[fileName] = selectedFiles;

        $window.sessionStorage.inputFiles = JSON.stringify(inputFiles);
        console.log($window.sessionStorage.inputFiles);

        var navKey = 1 + parseInt($routeParams.navKey);
        $location.url(fileNavPaths[navKey].url + '/' + navKey);
    }

    $scope.logout = function() {
        $cookies.token = undefined;
        $location.url('/');
    }

});