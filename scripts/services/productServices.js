angular.module("productApp").service("groceryServices", ['$http', function ($http) {
    this.grocObj = {
        date: "",
        grocceryitem: "",
        quantity: "",
        price: ""
    }

    var that = this;

    this.addList = addList;

    //get function to get the contents of the database
    this.getList = function () {
        return $http({
            method: "GET",
            url: "/list/grocery"
        }).then(function (result) {
            return result.data
        });
    }

    this.postList = function (dataParam) {
        return $http({
            method: "POST",
            url: "/list/grocery",
            data: dataParam
        }).then(function (result) {
            return result.status
        });
    }

    this.putList = function (dataParam) {
        return $http({
            method: "PUT",
            url: "/list/grocery/" + dataParam.grocceryid,
            data: dataParam
        }).then(function (result) {
            return result.status
        });
    }

    this.editList = function (id) {
        return $http({
            method: "GET",
            url: "/list/grocery/" + id
        }).then(function (result) {
            return result.data
        });
    }

    this.deleteList = function (id) {
        return $http({
            method: "DELETE",
            url: "/list/grocery/" + id
        }).then(function (result) {
            return result.data
        });
    }


    function addList() {
        var tempObj = {
            date: that.grocObj.date.toLocaleDateString(),
            grocceryitem: that.grocObj.grocceryitem,
            quantity: that.grocObj.quantity,
            price: that.grocObj.price
        }
        alert(tempObj.date);
        return that.postList(tempObj);
    }

}]);