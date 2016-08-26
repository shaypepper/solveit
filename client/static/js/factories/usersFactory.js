app.factory('usersFactory', ['$http','$cookies', function($http, $cookies) {
  function checkAndRun(callback){
    return function(data){ 
      if (typeof(callback) == 'function') {
        callback(data.data);
      }
    }
  }
  return {
    login: function(user, callback){
      $http.post('/login', user)
        .then(checkAndRun(callback))
    },
    logout: function(callback){
      $http.get('/logout')
        .then(checkAndRun(callback))
    },
    register: function(user, callback){
      $http.post('/register', user)
        .then(checkAndRun(callback))
    },
    session: function($location, $scope){
      $http.get('/session')
        .then(function(data){
          var session = data.data;
          $scope.session = session;
          $scope.logout = function(){
            $http.get('/logout')
          }
          if (!('_id' in session)) {
            $location.url('/login');
          } else {
            $scope.userName = session.first_name;
            $scope.userId = session._id;
          }
        })
    }    
  };
}]);
