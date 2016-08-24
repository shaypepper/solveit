app.controller('topicsNewController', 
  ['$scope', 'topicsFactory', 'usersFactory', '$location', '$cookies',
  function($scope, topicsFactory, usersFactory, $location, $cookies) {
    usersFactory.session($location, $scope);
    $scope.addTopic = () => {
    	topicsFactory.create($scope.newTopic, (topic) => {
	    	$scope.newTopic = {};
    		$scope.topic = topic;
    	});
	}
  	$scope.topic = {}
  }
]);