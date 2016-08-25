console.log('Topics Factory')
app.factory('topicsFactory', ['$http','$cookies', function($http, $cookies) {
  function checkAndRun(callback) {
    return (data => { if (typeof(callback) == 'function') callback(data.data); })
  }
  return {
    index:  (callback) => {
      $http.get('/topics')
        .then(checkAndRun(callback))
    },
    create: (topic, callback) => {
      $http.post('/topics', topic)
        .then(checkAndRun(callback))
    },
    update: (topic, callback) => {
      $http.put('/topics/'+topic._id, topic)
        .then(checkAndRun(callback))
    },
    show:   (topicID, callback) => {
      $http.get('/topics/'+topicID)
        .then(checkAndRun(callback)) 
    },
    delete: (topicID, callback) => {
      $http.delete('/topics/'+topicID)
        .then(checkAndRun(callback)) 
    }
  }
}]) 
