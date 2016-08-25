app.controller('topicsNewController', 
  ['$scope', 'topicsFactory', 'usersFactory', '$location', '$cookies',
  function($scope, topicsFactory, usersFactory, $location, $cookies) {
    usersFactory.session($location, $scope);
    $scope.addTopic = () => {
    	topicsFactory.create($scope.newTopic, (data) => {
        if ("errors" in data) {
          $scope.errors = data.errors
          console.log($scope.errors)
        } else {
  	    	$scope.newTopic = {};
      		$scope.topic = data;
          $location.url('/topics')
        }
    	});
	}
  	$scope.topic = {}
  }
]);