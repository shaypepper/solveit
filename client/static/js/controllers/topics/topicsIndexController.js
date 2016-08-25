app.controller('topicsIndexController', 
  ['$scope', 'topicsFactory','usersFactory', '$location', '$cookies',
  function($scope, topicsFactory, usersFactory, $location, $cookies) {
    usersFactory.session($location, $scope);
    $scope.pageTitle = "All Topics"

    function getTopics(){
      topicsFactory.index((topics)=>{
        $scope.topics = topics;
      })
    }
    getTopics()
     $scope.addTopic = () => {
      topicsFactory.create($scope.newTopic, (data) => {
        if ("errors" in data) {
          $scope.errors = data.errors
        } else {
          $scope.newTopic = {};
          getTopics()
        }
      });
  }
  }
]);