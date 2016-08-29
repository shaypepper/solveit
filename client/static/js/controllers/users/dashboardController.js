app.controller('dashboardController', 
    ['$scope','topicsFactory','ideasFactory','usersFactory', 'votesFactory', 'responsesFactory','resourcesFactory','$location','$cookies','$routeParams',
  function($scope, topicsFactory, ideasFactory, usersFactory, votesFactory, responsesFactory,resourcesFactory, $location, $cookies, $routeParams) {
  	usersFactory.session($location, $scope);
  }
]);