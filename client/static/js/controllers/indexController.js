app.controller('indexController', 
  ['$scope', 'usersFactory', '$location', '$cookies',
  function($scope, usersFactory, $location, $cookies) {
    usersFactory.session($location, $scope);


  }
]);