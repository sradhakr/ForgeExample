'use strict';

angular.module('forgeExample',['ngRoute','ngResource'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/',{templateUrl:'views/landing.html',controller:'LandingPageController'})
      .when('/Orders',{templateUrl:'views/Order/search.html',controller:'SearchOrderController'})
      .when('/Orders/new',{templateUrl:'views/Order/detail.html',controller:'NewOrderController'})
      .when('/Orders/edit/:OrderId',{templateUrl:'views/Order/detail.html',controller:'EditOrderController'})
      .when('/Products',{templateUrl:'views/Product/search.html',controller:'SearchProductController'})
      .when('/Products/new',{templateUrl:'views/Product/detail.html',controller:'NewProductController'})
      .when('/Products/edit/:ProductId',{templateUrl:'views/Product/detail.html',controller:'EditProductController'})
      .otherwise({
        redirectTo: '/'
      });
  }])
  .controller('LandingPageController', function LandingPageController() {
  })
  .controller('NavController', function NavController($scope, $location) {
    $scope.matchesRoute = function(route) {
        var path = $location.path();
        return (path === ("/" + route) || path.indexOf("/" + route + "/") == 0);
    };
  });
