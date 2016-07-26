app.factory('usersFactory', ['$http','$cookies', function($http, $cookies) {
  function checkAndRun(callback) {
    return data => { if (typeof(callback) == 'function') callback(data.data); }
  }
  return {
    login: (user, callback) => {
      $http.post('/login', user)
        .then(checkAndRun(callback))
    },
    logout: (callback) => {
      $http.get('/logout')
        .then(checkAndRun(callback))
    },
    session: ($location, $scope) => {
      $http.get('/session')
        .then(data => {
          var session = data.data;
          $scope.session = session;
          if (!('_id' in session)) {
            $location.url('/login');
          } else {
            $scope.userName = session.name;
            $scope.userId = session._id;
          }
        })
    }    
  };
}]);
