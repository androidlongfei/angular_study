var myAppModel = angular.module('MyApp', []);
myAppModel.controller('NgClassController', ['$scope',
    function($scope) {

        $scope.messageText = "this is init data";

        $scope.isError = false;
        $scope.isWarning = false;
        $scope.isPrompt = false;
        $scope.showError = function() {
            $scope.messageText = 'This is an error!';
            $scope.isError = true;
            $scope.isWarning = false;
            $scope.isPrompt = false;
        };
        $scope.showWarning = function() {
            $scope.messageText = 'Just a warning. Please carry on.';
            $scope.isWarning = true;
            $scope.isError = false;
            $scope.isPrompt = false;
        };
        $scope.showPrompt = function () {
            $scope.messageText = 'Just a prompt message.';
            $scope.isError = false;
            $scope.isWarning = false;
            $scope.isPrompt = true;
        }

        $scope.data = "red";
    }
])
