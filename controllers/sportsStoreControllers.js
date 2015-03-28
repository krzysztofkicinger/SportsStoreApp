/**
 * Created by Krzysztof Kicinger on 2015-03-17.
 */
angular.module("sportsStoreApp")
    .constant("dataURL", "http://localhost:5050/products")
    .constant("orderURL", "http://localhost:5050/orders")
    .controller("sportsStoreController", function($scope, $http, $location, dataURL, orderURL, cart) {

        $scope.data = { };

        $http.get(dataURL)
            .success(function(data) {
                $scope.data.products = data;
            })
            .error(function(error){
                console.log("ERROR: " + error);
                $scope.data.error = error;
            });

        $scope.sendOrder = function(shippingDetails) {
            var order = angular.copy(shippingDetails);
            order.products = cart.getProducts();
            $http.post(orderURL, order)
                .success(function(data) {
                    $scope.data.orderId = data.id;
                    cart.getProducts().length = 0;
                })
                .error(function(error) {
                    $scope.data.orderError = error;
                })
                .finally(function() {
                    $location.path("/complete");
                });
        }

/*        $scope.data.products = [
            {"name":"Kayak","description":"A boat for one person","category":"Watersports","price":"275","id":"0f35a3b461f798f9"},
            {"name":"Lifejacket","description":"Protective and fashionable","category":"Watersports","price":"48.95","id":"9c4a31862404a885"},
            {"name":"SoccerBall","description":"FIFA-approved size and weight","category":"Soccer","price":"19.5","id":"1067d4c3919df833"},
            {"name":"Corner Flags","description":"Give your playing filed a professional touch","category":"Soccer","price":"34.95","id":"d62ca9a47e11284e"},
            {"name":"Stadium","description":"Flat-packed 35,000-seat stadium","category":"Soccer","price":"79500.00","id":"7865f0e1e7499a82"},
            {"name":"Thinking Cap","description":"Improve your brain efficiency by 75%","category":"Chess","price":"16","id":"d56496ddd27bb80e"},
            {"name":"Unsteady Chair","description":"Secretly give your opponent a disadvantage","category":"Chess","price":"29.95","id":"0532c62e47f018eb"},
            {"name":"Human Chess Board","description":"A fu ngame for the family","category":"Chess","price":"75","id":"498cc09c804528de"},
            {"name":"Bling-Bling King","description":"Gold-plated, diamond-studded King","category":"Chess","price":"1200","id":"b1d2d3461924e8c2"}];*/
    });