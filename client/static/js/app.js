var app = angular.module('app', ['ngRoute', 'ngMessages', 'ngCookies']);
app.config(function ($routeProvider) {
  $routeProvider
    .when('/topics', {
      templateUrl: '/partials/topics/index.html',
      controller: 'topicsIndexController'
    })
    .when('/topics/new', {
      templateUrl: '/partials/topics/new.html',
      controller: 'topicsNewController'
    })
    .when('/topics/:id', {
      templateUrl: '/partials/topics/show.html',
      controller: 'topicsShowController'
    })
    .when('/login', {
      templateUrl: '/partials/users/login.html',
      controller: 'loginController'
    })
    .when('/register',{
      templateUrl: '/partials/users/register.html',
      controller: 'registerController'
    })
    .when('/resources',{
      templateUrl: '/partials/resources/index.html',
      controller: 'resourcesController'
    })
    .otherwise({
      redirectTo: '/topics'
    });
});