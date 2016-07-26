app.controller('newController', 
  ['$scope','questionsFactory','usersFactory', '$location', '$cookies', 
  function($scope, questionsFactory, usersFactory, $location, $cookies) {
    usersFactory.session($location, $scope);
    
    $scope.newPoll = {text: '', options:[]}
    $scope.create = ()=>{ 
      questionsFactory.create($scope.newPoll, data=>{
        console.log('here')
        if (data.errors) { $scope.errors = data.errors; }
        else $location.url('/');
      });
    };
    $scope.logout = ()=>usersFactory.logout(()=> $location.url('/'))
  }
]);