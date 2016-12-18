angular.module("productApp").directive("createForm", function () {
    return {
        restric: "EAC",
        controller: "productCtrl",
        templateUrl: "/views/createForm.html"
    };
});