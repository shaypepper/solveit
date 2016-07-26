app.controller('pollController', 
  ['$scope','questionsFactory', 'usersFactory', '$location', '$routeParams', '$cookies',
  function($scope, questionsFactory, usersFactory, $location, $routeParams, $cookies) {
    usersFactory.session($location, $scope);
    function showOne() {
      questionsFactory.show($routeParams.id, result => {
        if (!result.errors && result._id) {
          $scope.thisPoll = result;
          $scope.vote = (question_id, option_id) => {
            questionsFactory.vote(question_id, option_id);
            showOne();
          }
        } else if (result.errors){
          $scope.errors = result.errors;
        } else {
          $location.url('/')
        }
      })
    }
    showOne()
  }
]);