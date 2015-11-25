//Global configuration
var serverUrl = "http://192.168.5.18:3030/";
var serverPath = "";

var app = angular.module('anzhenApp', ['ngRoute', 'ngCookies']);

app.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);

app.run(function($rootScope, $location, $anchorScroll, $routeParams) {
  $rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {
    $location.hash($routeParams.scrollTo);
    $anchorScroll();  
  });
});

app.config(function($routeProvider) {
            $routeProvider
                .when('/', {
                    controller: 'LoginController',
                    templateUrl: serverPath + '/app/partials/login.html'
                })
                .when('/home', {
                    controller: 'HomeController',
                    templateUrl: serverPath + '/app/partials/home.html'
                })
                .when('/disk', {
                    controller: 'DiskController',
                    templateUrl: serverPath + '/app/partials/disk.html'
                })
                .when('/analyze/:taskId', {
                    controller: 'AnalyzeController',
                    templateUrl: serverPath + '/app/partials/analyze.html'
                })
                .when('/file/:navKey', {
                    controller: 'FileController',
                    templateUrl: serverPath + '/app/partials/file.html'
                })
                .when('/report', {
                    controller: 'ReportController',
                    templateUrl: serverPath + '/app/partials/report.html'
                })
                .when('/report/:taskId', {
                    controller: 'ReportController',
                    templateUrl: serverPath + '/app/partials/report.html'
                })
                .when('/contact', {
                    controller: 'ContactController',
                    templateUrl: serverPath + '/app/partials/contact.html'
                })
                .when('/upload/:navKey', {
                    controller: 'UploadController',
                    templateUrl: serverPath + '/app/partials/upload.html'
                })
                .when('/parameter', {
                    controller: 'ParameterController',
                    templateUrl: serverPath + '/app/partials/parameter.html'
                })
                .when('/detailedReport/:taskId', {
                    controller: 'DetailedReportController',
                    templateUrl: serverPath + '/app/partials/detailedReport.html'
                })
                .otherwise({
                    redirectTo: '/'
                });
        });
