var app = angular.module('app', ['ngRoute', 'ngMessages', 'ngCookies']);
app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/partials/index.html',
      controller: 'indexController'
    })
    .when('/topics', {
      templateUrl: '/partials/topics/index.html',
      controller: 'topicsIndexController'
    })
    .when('/login', {
      templateUrl: '/partials/login.html',
      controller: 'loginController'
    })
    .otherwise({
      redirectTo: '/'
    });
});