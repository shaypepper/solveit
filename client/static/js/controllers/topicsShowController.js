app.controller('topicsShowController', 
  ['$scope','topicsFactory','ideasFactory','usersFactory','responsesFactory','$location','$cookies','$routeParams',
  function($scope, topicsFactory, ideasFactory, usersFactory,responsesFactory, $location, $cookies, $routeParams) {
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
      $scope.showNewIdea = false;
    }

    getIdeas()
    getTopic()
    $scope.response = []

    $scope.createIdea = () => {
      var idea = { text: $scope.idea.text, _user: $scope.userId } 
      ideasFactory.create($routeParams.id, idea, data => {
        if (data && "errors" in data) {
          $scope.errors = data.errors
        } else {
          $scope.idea = {}
          getIdeas()
        }
      })
    }

    $scope.toggleResponses = (ideaIndex) => {
      if (!("showResponses" in $scope.ideas[ideaIndex])) {
        $scope.ideas[ideaIndex].showResponses = true;
      } else {
        delete $scope.ideas[ideaIndex].showResponses;
      }
    }
    $scope.toggleResponseForm = (ideaIndex) => {
      if (!("showResponseForm" in $scope.ideas[ideaIndex])) {
        $scope.ideas[ideaIndex].showResponseForm = true;
      } else {
        delete $scope.ideas[ideaIndex].showResponseForm;
      }
    }

    $scope.createResponse = (ideaIndex) => {
      responsesFactory.createByIdeaId($scope.ideas[ideaIndex]._id,
        {text: $scope.response[ideaIndex].text, agree: $scope.response[ideaIndex].agree},
        data => {
          if (data && "errors" in data) {
            console.log(data.errors)
            $scope.errors = data.errors
          } else {
            getIdeas()
          }
        }
      )
    }
  }
]);