var app = angular.module('app', ['ngRoute', 'ngMessages', 'ngCookies']);
app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/partials/index.html',
      controller: 'indexController'
    })
    .when('/new', {
      templateUrl: '/partials/new.html',
      controller: 'newController'
    })
    .when('/poll/:id', {
      templateUrl: '/partials/poll.html',
      controller: 'pollController'
    })
    .when('/login', {
      templateUrl: '/partials/login.html',
      controller: 'loginController'
    })
    .otherwise({
      redirectTo: '/'
    });
});