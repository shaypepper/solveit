app.controller('topicsIndexController', 
  ['$scope', 'topicsFactory','usersFactory', '$location', '$cookies',
  function($scope, topicsFactory, usersFactory, $location, $cookies) {
    function getTopics(){
      topicsFactory.index((topics)=>{
        $scope.topics = topics;
      })
    }
    getTopics()
  }
]);