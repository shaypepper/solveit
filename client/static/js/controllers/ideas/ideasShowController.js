app.controller('ideasShowController', 
  ['$scope', 'ideasFactory', 'usersFactory', '$location', '$cookies', '$routeParams',
  function($scope, ideasFactory, usersFactory, $location, $cookies, $routeParams) {
    function getIdea(){
      ideasFactory.show($routeParams.id, (data) => {
        if (data && "errors" in data) {
          $scope.errors = data.errors
        } else {
          $scope.idea = data
        }
      })
    }
    getIdea()
  }
]);