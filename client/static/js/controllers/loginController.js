app.controller('loginController', 
  ['$scope','usersFactory', '$location', '$cookies',
  function($scope, usersFactory, $location, $cookies) {
    // usersFactory.session($location, $scope);
    $scope.login = () => {
      if (!$scope.user) {
        $scope.errors = {'login': {message: 'Please provide a name'}};
        return;
      }
      usersFactory.login($scope.user, (data)=>{
        if (data.errors) $scope.errors = data.errors;
        else $location.url('/topics')
      })
    }
  }
]);