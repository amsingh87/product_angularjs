'use strict';
//syntax for angular always with third part dependencies
var appName = angular.module("productApp", ['ng-Route', 'ui.bootstrap']);
appName.config(['$locationProvider', '$routeProvider', function
    ($locationProvider, $routeProvider) {
        $routeProvider.when('/', {
                controller: "productCtrl",
                templateUrl: "/views/mainPage.html"
            })
            .when("/add", {
                //controller: "travelCtrl",
                templateUrl: "/views/createForm.html"
            })
            .when("/all", {
                templateUrl: "/views/createTablehtml"
            });
        $locationProvider
            .html5Mode(false)
            .hashPrefix('!');
}]);