myApp.controller("editController",
    function($scope, northwind, $routeParams, $location) {

        var productId = $routeParams.id;

        $scope.categoryDataSource = northwind.Categories.asKendoDataSource();

        northwind
            .Products
            .include("Category")
            .find(productId).then(
                function(product) {
                    $scope.product = product;
                    console.log("product: " + product);
                    $scope.$apply();
                });

        $scope.save = function() {
            var selectedCategory = $scope
                .categoryDataSource
                .get($scope.dropDown.value());

            northwind.attach($scope.product);
            $scope.product.Category = selectedCategory.innerInstance();
            northwind.saveChanges();
        };

        $scope.cancel = function() {
            $location.url("/product");
        };

         $scope.$on("kendoWidgetCreated", function(event, widget) {
            if (widget === $scope.dropDown) {
                $scope.dropDown.value($scope.product.Category.CategoryID);
            }
        });

    });
