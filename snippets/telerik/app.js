'use strict';

var myApp = angular.module('myApp',
    [
        'ngRoute',
        'ngAnimate',
        'kendo.directives',
        'jaydata'
    ])
    .factory("northwindFactory",
    [
        '$data',
        '$q',
        function($data, $q) {
            //here we wrap a jquery promise into and angular promise. 
            //simply returning jquery promise causes bogus things
            var defer = $q.defer();
            $data.initService("/northwind.svc").then(function(ctx) {
                defer.resolve(ctx);
            });
            return defer.promise;
        }
    ])
    .config(function($routeProvider) {
        $routeProvider
            .when('/home',
            {
                templateUrl: 'app/views/home.html'
            })
            .when('/product',
            {
                templateUrl: 'app/views/product.html',
                controller: 'productController',
                resolve: {
                    //we tell routing to inject the promised result of northwindFactory
                    // as northind to the controller productController
                    northwind: 'northwindFactory'
                }
            })
            .when('/edit/:id',
            {
                templateUrl: 'app/views/edit.html',
                controller: 'editController',
                resolve: {
                    //we tell routing to inject the promised result of northwindFactory
                    // as northind to the controller productController
                    northwind: 'northwindFactory'
                }
            })
            .when('/chart',
            {
                templateUrl: 'app/views/chart.html',
                controller: 'chartController',
                resolve: {
                    northwind: 'northwindFactory'
                }
            })
            .otherwise(
            {
                redirectTo: '/home'
            });
    });
