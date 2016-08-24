app.controller('topicsShowController', 
  ['$scope','topicsFactory','ideasFactory','usersFactory','$location','$cookies','$routeParams',
  function($scope, topicsFactory, ideasFactory, usersFactory, $location, $cookies, $routeParams) {
    usersFactory.session($location, $scope);
    function getTopic(){
      topicsFactory.show($routeParams.id, (topic)=>{
        $scope.topic = topic;
        $scope.pageTitle = $scope.topic.title
      })
    }
    
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
    getTopic()
    $scope.showNewIdea = false;

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
        $scope.ideas[ideaIndex].show = true;
      } else {
        delete $scope.ideas[ideaIndex].show;
      }
    }
  }
]);