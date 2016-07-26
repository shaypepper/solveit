app.controller('indexController', 
  ['$scope','questionsFactory', 'usersFactory', '$location', '$cookies',
  function($scope, questionsFactory, usersFactory, $location, $cookies) {
    usersFactory.session($location, $scope);
    questionsFactory.index( polls => { $scope.polls = polls } )

    $scope.logout = () => { usersFactory.logout(()=>$location.url('/login')) }
    $scope.prettyDate = date => moment(date).format('LL')
    $scope.relativeDate = date => moment(date).fromNow()
    $scope.thisUser = id => (id === $scope.userId)
    $scope.deletePoll = id => { questionsFactory.delete(id) }
  }
]);