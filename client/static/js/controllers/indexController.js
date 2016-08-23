app.controller('indexController', 
  ['$scope', 'usersFactory', '$location', '$cookies',
  function($scope, questionsFactory, usersFactory, $location, $cookies) {
    usersFactory.session($location, $scope);


  }
]);