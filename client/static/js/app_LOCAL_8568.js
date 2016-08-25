var app = angular.module('app', ['ngRoute', 'ngMessages', 'ngCookies']);
app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/partials/index.html',
      controller: 'indexController'
    })
    .when('/login', {
      templateUrl: '/partials/users/login.html',
      controller: 'loginController'
    })
    .when('/topics/new', {
      templateUrl: '/partials/topics/new.html',
      controller: 'topicsNewController'
    })
    .otherwise({
      redirectTo: '/'
    });
});