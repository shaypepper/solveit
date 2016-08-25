app.controller('ideasIndexController', 
  ['$scope', 'ideasFactory', 'usersFactory', '$routeParams',
  function($scope, ideasFactory, usersFactory, $routeParams) {
    function getIdeas(){
      ideasFactory.ideasByTopic($routeParams.id, (data) => {
        if (data && "errors" in data) {
          $scope.errors = data.errors
        } else {
          $scope.ideas = data
        }
      })
    }
    getIdeas()

    $scope.createIdea = () => {
      var idea = { text: $scope.idea.text, _user: $scope.userId } 
      ideasFactory.create($routeParams.id, idea, data => {
        if (data && "errors" in data) {
          $scope.errors = data.errors
        } else {
          getIdeas()
        }
      })
    }

    $scope.toggleShow = (ideaIndex) => {

      if (!("show" in $scope.ideas[ideaIndex])) {
        console.log('**')
        $scope.ideas[ideaIndex].show = true;
      } else {
        delete $scope.ideas[ideaIndex].show;
      }
    }

  }
]);