app.controller('loginController', 
  ['$scope','usersFactory', '$location', '$cookies',
  function($scope, usersFactory, $location, $cookies) {

    $scope.login = function(){
      if (!$scope.user) {
        $scope.errors = {'login': {message: 'Please provide a name'}};
        return;
      }
      usersFactory.login($scope.user, function(data){
        if (data.errors) $scope.errors = data.errors;
        else $location.url('/topics')
      })
    }
    $scope.navlogin = true
  }
]);