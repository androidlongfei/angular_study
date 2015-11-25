app.controller('UploadController', function($scope, $rootScope, $http, $cookies, $location, $window, $routeParams) {
    var fileNavPaths;
    init();

    
    function init() {
        if (!$cookies.token) $location.url('/');
        $rootScope.bodyClass = 'admin';

        // $scope.title = $rootScope.currentNavPath.title;
        fileNavPaths = JSON.parse($window.sessionStorage.fileNavPaths);
        $scope.title = fileNavPaths[$routeParams.navKey].title;
    }


    $(function() {

        var drop = document.getElementById('uploadContainer');

        function setProgress(percent) {
            $('#progressBar').css('width', percent + '%').html(percent + '%');
            $('#progressBar').removeClass('active');
        }

        function handleDrop(e) {
            e.stopPropagation();
            e.preventDefault();
            //rABS = document.getElementsByName("userabs")[0].checked;
            //use_worker = document.getElementsByName("useworker")[0].checked;
            var files = e.dataTransfer.files;
            var file = files[0];

            var formData = new FormData();
            formData.append('uploadFile', file);
            formData.append('token', $cookies.token);
            var xhr = new XMLHttpRequest();
            xhr.overrideMimeType('application/json');
            xhr.open('post', serverUrl + 'api/file/upload', true);
            xhr.upload.onprogress = function(e) {
                if (e.lengthComputable)
                    setProgress(Math.round((e.loaded / e.total) * 100));
            };
            xhr.onerror = function(e) {
                console.log('error while trying to upload');
            };
            xhr.onload = function() {
                setProgress(100);
                var resJson = JSON.parse(xhr.responseText);
                $('#statusContainer').html(resJson.file + '上传完成！');

                //$rootScope.uploadedFile = resJson.file;
                $window.sessionStorage.uploadedFile = resJson.file;
            };
            xhr.send(formData);
        }

        function handleDragover(e) {
            e.stopPropagation();
            e.preventDefault();
            e.dataTransfer.dropEffect = 'copy';
        }

        if (drop.addEventListener) {
            drop.addEventListener('dragenter', handleDragover, false);
            drop.addEventListener('dragover', handleDragover, false);
            drop.addEventListener('drop', handleDrop, false);
        }

        $('#progressContainer').hide();
        $('#uploadContainer').hide();
        $('#targetRegionSelect').bind('change', function() {
            if (this.value == 'none') {
                $('#progressContainer').show();
                $('#uploadContainer').show();
            } else {
                $('#progressContainer').hide();
                $('#uploadContainer').hide();
            }
        });

    });

    $scope.nextPage = function() {
        var fileName = fileNavPaths[$routeParams.navKey].name;
        var inputFiles = JSON.parse($window.sessionStorage.inputFiles);
        if ($('#targetRegionSelect').value == 'none') {
            // $rootScope.inputFiles[$rootScope.currentNavPath.name] = $rootScope.uploadedFile;
            inputFiles[fileName] = $window.sessionStorage.uploadedFile;
        } else {
            // $rootScope.inputFiles[$rootScope.currentNavPath.name] = $('#targetRegionSelect').val();
            inputFiles[fileName] = $('#targetRegionSelect').val();
        }
        
        $window.sessionStorage.inputFiles = JSON.stringify(inputFiles);
        console.log($window.sessionStorage.inputFiles);

        // if ($rootScope.fileNavPaths.length > 0) {
        //     $rootScope.currentNavPath = $rootScope.fileNavPaths.shift();
        //     $location.url($rootScope.currentNavPath.url);
        // } else {
        //     $location.url('/contact');
        // }
        var navKey = 1 + parseInt($routeParams.navKey);
        if (fileNavPaths.length > navKey + 1) {
            $location.url(fileNavPaths[navKey].url + '/' + navKey);
        } else {
            $location.url('/contact');
        }
    }

    $scope.logout = function() {
        $cookies.token = undefined;
        $location.url('/');
    }
});