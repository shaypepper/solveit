app.factory('factoryUtilities', function() {
  return {
    cbPostWrapper: function(callback, $scope){
      return function(data){
        if (typeof(callback) == 'function') {
          if (data && "errors" in data.data) {
            $scope.errors = data.data.errors
          } else {
            $scope.errors = null
            callback(data.data);
          }
        }
      }
    },
    cbGetWrapper: function(callback){
      return function(data){
        if (typeof(callback) == 'function') {
          callback(data.data);
        }
      }
    }
  }
})