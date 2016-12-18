angular.module("productApp").directive("mainPage", function () {
    return {
        restric: "EAC",
        controller: "productCtrl",
        templateUrl: "/views/mainPage.html"
    };
});