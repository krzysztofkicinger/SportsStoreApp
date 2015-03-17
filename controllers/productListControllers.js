/**
 * Created by Krzysztof Kicinger on 2015-03-17.
 */
angular.module("sportsStoreApp")
    .constant("productListActiveClass", "btn-primary")
    .constant("productListPageCount", 3)
    .controller("productListController", function($scope, $filter, productListActiveClass, productListPageCount) {

        var selectedCategory = null;

        $scope.selectedPage = 1;
        $scope.pageSize = productListPageCount;

        $scope.selectCategory = function(newlySelectedCategory) {
            selectedCategory = newlySelectedCategory;
            $scope.selectedPage = 1;
        }

        $scope.categoryFilter = function(product) {
            return selectedCategory == null || product.category == selectedCategory;
        }

        $scope.getCategoryClass = function(category) {
            return selectedCategory == category ? productListActiveClass : "";
        }

        $scope.selectPage = function(newPage) {
            $scope.selectedPage = newPage;
        }

        $scope.getPageClass = function(page) {
            return $scope.selectedPage == page ? productListActiveClass : "";
        }
    });