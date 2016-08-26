app.controller('ideasShowController', 
  ['$scope', 'ideasFactory', 'usersFactory','$routeParams',
  function($scope, ideasFactory, usersFactory, $routeParams) {
    function getIdea(){
      ideasFactory.show($routeParams.id, function(data){
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