app.controller('topicsShowController', 
  ['$scope','topicsFactory','usersFactory','$location','$cookies','$routeParams',
  function($scope, topicsFactory, usersFactory, $location, $cookies, $routeParams) {
    function getTopic(){
      topicsFactory.show($routeParams.id, (topic)=>{
        $scope.topic = topic;
      })
    }
    getTopic()
  }
]);