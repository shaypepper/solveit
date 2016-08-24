app.controller('topicsShowController', 
  ['$scope','topicsFactory','usersFactory','$location','$cookies','$routeParams',
  function($scope, topicsFactory, usersFactory, $location, $cookies, $routeParams) {
    usersFactory.session($location, $scope);
    function getTopic(){
      topicsFactory.show($routeParams.id, (topic)=>{
        $scope.topic = topic;
        $scope.pageTitle = $scope.topic.title
      })
    }
    getTopic()
  }
]);