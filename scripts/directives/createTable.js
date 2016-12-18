angular.module("productApp").directive("createTable", function () {
    return {
        restrict: "EAC",
        controller: "productCtrl",
        templateUrl: "/views/createTable.html"
    };
});