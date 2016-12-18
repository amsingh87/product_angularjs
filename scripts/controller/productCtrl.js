'user strict';
angular.module("productApp").controller("productCtrl", ["$scope", "$location", function ($scope, $location) {
    $scope.search = function () {
        $location.url("#!add");
    }
            }]);