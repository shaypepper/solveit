app.controller('registerController', 
  ['$scope','usersFactory', '$location', '$cookies',
  function($scope, usersFactory, $location, $cookies) {
    $scope.register = () => {
      if (!$scope.user){
        $scope.errors = {'register': {message: 'Please fill out all of the fields'}};
        return;
      }
      usersFactory.register($scope.user, (data) =>{
        console.log(data)
        if (data.errors) {
          $scope.errors = data.errors;
        }
        else {
          $location.url('/topics')
        }
      })
    }
  }
]);