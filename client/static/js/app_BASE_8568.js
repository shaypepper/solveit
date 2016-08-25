var app = angular.module('app', ['ngRoute', 'ngMessages', 'ngCookies']);
app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/partials/index.html',
      controller: 'indexController'
    })
    .when('/login', {
      templateUrl: '/partials/login.html',
      controller: 'loginController'
    })
    .otherwise({
      redirectTo: '/'
    });
});