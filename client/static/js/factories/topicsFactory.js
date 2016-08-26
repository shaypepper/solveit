console.log('Topics Factory')
app.factory('topicsFactory', ['$http','$cookies', function($http, $cookies) {
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
        .then(checkAndRun(callback))
    },
    create: function(topic, callback){
      $http.post('/topics', topic)
        .then(checkAndRun(callback))
    },
    update: function(topic, callback){
      $http.put('/topics/'+topic._id, topic)
        .then(checkAndRun(callback))
    },
    show:   function(topicID, callback){
      $http.get('/topics/'+topicID)
        .then(checkAndRun(callback)) 
    },
    delete: function(topicID, callback){
      $http.delete('/topics/'+topicID)
        .then(checkAndRun(callback)) 
    }
  }
}]) 
