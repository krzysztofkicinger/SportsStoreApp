/**
 * Created by Krzysztof Kicinger on 2015-03-28.
 */
angular.module("sportsStoreAdmin")
    .constant("authUrl", "http://localhost:5050/users/login")
    .constant("ordersUrl", "http://localhost:5050/orders")
    .controller("authCtrl", function($scope, $http, $location, authUrl) {
        $scope.authenticate = function(username, password) {
            $http.post(authUrl, {
                username : username,
                password: password
            }, {
                withCredentials : true
            }).success(function(data) {
                $location.path("/main");
            }).error(function(error) {
                $scope.authenticationError = error;
            })
        }
    })
    .controller("mainCtrl", function($scope) {
        $scope.screens = ["Products", "Orders"];
        $scope.current = $scope.screens[0];

        $scope.setScreen = function(index) {
            $scope.current = $scope.screens[index];
        }

        $scope.getScreen = function() {
            return $scope.current == "Products"
                        ? "./views/admin/adminProducts.html"
                        : "./views/admin/adminOrders.html";
        }

    })
    .controller("ordersCtrl", function($scope, $http, ordersUrl) {

        $http.get(ordersUrl, {
            withCredentials: true
        })
            .success(function(data) {
                $scope.orders = data;
            })
            .error(function(error) {
                $scope.ordersError = error;
            })

        $scope.selectedOrder;

        $scope.selectOrder = function(order) {
            $scope.selectedOrder = order;
        }

        $scope.calcTotal = function(order) {
            var total = 0;
            for(var i = 0; i < order.products.length; ++i) {
                total += order.products[i].count * order.products[i].price;
            }
            return total;
        }

    });