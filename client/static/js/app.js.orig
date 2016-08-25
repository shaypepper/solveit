<<<<<<< HEAD
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
=======
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
    .when('/topics/:id', {
      templateUrl: '/partials/topics/show.html',
      controller: 'topicsShowController'
    })
    .when('/login', {
      templateUrl: '/partials/login.html',
      controller: 'loginController'
    })
    .otherwise({
      redirectTo: '/'
    });
>>>>>>> 97fa7563ab29e769ceb1c7f031479182c5e4f97c
});