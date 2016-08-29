app.controller('topicsIndexController', 
  ['$scope', 'topicsFactory','usersFactory', '$location', '$cookies',
  function($scope, topicsFactory, usersFactory, $location, $cookies) {
    usersFactory.session($location, $scope);
    $scope.pageTitle = "All Topics"
    $scope.showNewTopic = false;

    function getTopics(){
      topicsFactory.index(function(topics){
        $scope.topics = topics;
      })
    }
    getTopics()
    $scope.addTopic = function(){
      topicsFactory.create($scope.newTopic, $scope, function(data){
        $scope.newTopic = {};
        getTopics()
      });
    }
  }
]);