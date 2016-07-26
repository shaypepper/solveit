app.controller('editController', ['$scope','friendsFactory','$routeParams', '$location', function($scope, friendsFactory, $routeParams, $location) {
  friendsFactory.show($routeParams.id, function(data){
    usersFactory.session( session => { $scope.session = session; console.log(session) });
    $scope.friend = data;
    console.log(typeof data.birthday)
    $scope.friendUpdated = {
      name: data.name, 
      birthday: moment(data.birthday).toDate()
    };
  });

  $scope.eighteenYearsAgo = moment().subtract(18,'years').format('YYYY-MM-DD')

  $scope.update = id => { 
    console.log($scope.updateForm.name.$error)
    console.log($scope.updateForm.birthday.$error)
    if (Object.keys($scope.updateForm.birthday.$error).length === 0 &&
        Object.keys($scope.updateForm.name.$error).length === 0) {
      friendsFactory.update(id, $scope.friendUpdated); 
      $location.url('/');
    }
  }
  $scope.delete = id => { 
    friendsFactory.delete(id); 
    $location.url('/');
  }
}]);