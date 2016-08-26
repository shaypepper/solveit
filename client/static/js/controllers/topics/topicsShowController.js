app.controller('topicsShowController', 
  ['$scope','topicsFactory','ideasFactory','usersFactory', 'votesFactory', 'responsesFactory','resourcesFactory','$location','$cookies','$routeParams',
  function($scope, topicsFactory, ideasFactory, usersFactory, votesFactory, responsesFactory,resourcesFactory, $location, $cookies, $routeParams) {
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
          $scope.ideas = data.ideas
          votes = {}
          data.votes.forEach((voteTally, index) => {
            votes[voteTally._id.idea] = {};
            if (voteTally._id.up) {
              votes[voteTally._id.idea].up = voteTally.count
            } else {
              votes[voteTally._id.idea].down = voteTally.count
            }
          })
          for (x in votes) {
            if (!('up' in votes[x])) votes[x].up = 0;
            if (!('down' in votes[x])) votes[x].down = 0;
          }       
          $scope.votes = votes;
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

    $scope.toggleResponses = (idea) => {
      if (!("showResponses" in idea)) {
        idea.showResponses = true;
        console.log(idea.responses)
        idea.agree_responses = idea.responses.filter(response => response.agree).splice(0,10)
        idea.disagree_responses = idea.responses.filter(response => !response.agree).splice(0,10)
      } else {
        delete idea.showResponses;
      }
    }    

    $scope.toggleResponseForm = (idea) => {
      if (!("showResponseForm" in idea)) {
        idea.showResponseForm = true;
      } else {
        delete idea.showResponseForm;
      }
    }

    $scope.createResponse = (idea, response) => {
      response.agree = "agree" in response && response.agree === true ? true : false
      responsesFactory.createByIdeaId(idea._id,
        {text: response.text, agree: response.agree},
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

    $scope.vote = (type, post_id, vote) => {
      votesFactory.create({type: type, post_id: post_id, up: vote},         data => {
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