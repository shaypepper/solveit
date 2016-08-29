console.log('Topics Factory')
app.factory('topicsFactory', ['$http','$cookies','factoryUtilities', function($http, $cookies, factoryUtilities) {
  var util = factoryUtilities;
  function checkAndRun(callback){
    return function(data){ 
      if (typeof(callback) == 'function') {
        callback(data.data);
      }
    }
  }
  return {
    index:  function(callback){
      $http.get('/topics')
        .then(util.cbGetWrapper(callback))
    },
    create: function(topic, $scope, callback){
      $http.post('/topics', topic)
        .then(util.cbPostWrapper(callback, $scope))
    },
    update: function(topic, $scope, callback){
      $http.put('/topics/'+topic._id, topic)
        .then(util.cbPostWrapper(callback, $scope))
    },
    show:   function(topicID, callback){
      $http.get('/topics/'+topicID)
        .then(util.cbGetWrapper(callback)) 
    },
    delete: function(topicID, $scope, callback){
      $http.delete('/topics/'+topicID)
        .then(util.cbPostWrapper(callback, $scope)) 
    }
  }
}]) 
