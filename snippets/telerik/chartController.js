myApp.controller("chartController",

    function($scope, northwind) {

        var dataSource = northwind.Products.asKendoDataSource();

        $scope.options = {
            theme: "metro",
            dataSource: dataSource,
            chartArea: {
                width: 1000,
                height: 550
            },
            title: {
                text: "Northwind Products in Stock"
            },
            legend: {
                position: "top"
            },

            series: [
                {
                    labels: {
                        font: "bold italic 12px Arial,Helvetica,sans-serif;",
                        template: '#= value #'
                    },
                    field: "UnitsInStock",
                    name: "Units In Stock"
                }
            ],
            valueAxis: {
                labels: {
                    format: "N0"
                },
                majorUnit: 100,
                plotBands: [
                    {
                        from: 0,
                        to: 50,
                        color: "#c00",
                        opacity: 0.8
                    }, {
                        from: 50,
                        to: 200,
                        color: "#c00",
                        opacity: 0.3
                    }
                ],
                max: 1000
            },
            categoryAxis: {
                field: "ProductName",
                labels: {
                    rotation: -90
                },
                majorGridLines: {
                    visible: false
                }
            },
            tooltip: {
                visible: true
            }
        };

    });
