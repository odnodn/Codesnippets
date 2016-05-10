myApp.controller("productController",
    function($scope, northwind, $location) {

        var dataSource =
            northwind
                .Products
                .asKendoDataSource({ pageSize: 10 });

        $scope.options = {
            dataSource: dataSource,
            filterable: true,
            sortable: true,
            pageable: true,
            selectable: true,
            columns: [
                { field: "ProductID" },
                { field: 'ProductName' },
                { field: "EnglishName" },
                { field: "QuantityPerUnit" },
                { field: "UnitPrice" },
                { field: 'UnitsInStock' },
                {
                    command: [
                        "edit",
                        "destroy",
                        {
                            text: "View Detail",
                            template: $("#viewDetail").html()

                        },
                    ],
                    width: "260px"

                }
            ],
            toolbar: [
                "create",
                "save",
                "cancel",
                {
                    text: "View Detail",
                    name: "detail",
                    //template: $("#viewDetail").html()
                }
            ],
            editable: "inline"
        };

    $scope.viewDetail = function (e) {
            var selectedRow = $scope.grid.select();

            if (selectedRow.length == 0)
                alert("Please select a row");

            var dataItem = $scope.grid.dataItem(selectedRow);;

            $location.url("/edit/" + dataItem.ProductID);
        };
    });
