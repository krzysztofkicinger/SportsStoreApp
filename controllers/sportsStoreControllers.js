/**
 * Created by Krzysztof Kicinger on 2015-03-17.
 */
angular.module("sportsStoreApp")
    .constant("dataURL", "http://localhost:5050/products")
    .controller("sportsStoreController", function($scope, $http, dataURL) {
        $scope.data = { };

        $http.get(dataURL)
            .success(function(data) {
                $scope.data.products = data;
            })
            .error(function(error){
                console.log("ERROR: " + error);
                $scope.data.error = error;
            });
    });