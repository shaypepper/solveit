console.log('Responses Factory');

app.factory('responsesFactory', ['$http', function($http, $cookies){
  function checkAndRun(callback){
    return function(data){ 
      if (typeof(callback) == 'function') {
        callback(data.data);
      }
    }
  }
  return {
    index: function(callback){
      $http.get('/responses')
        .then(checkAndRun(callback))
    },
    create: function(response, callback){
      $http.post('/responses', response)
        .then(checkAndRun(callback))
    },
    createByIdeaId: function(ideaID, response, callback){
      $http.post('/ideas/'+ideaID+'/responses', response)
        .then(checkAndRun(callback))
    },
    update: function(response, callback){
      $http.put('/responses/'+responses._id, response)
        .then(checkAndRun(callback))
    },
    show: function(responseID, callback){
      $http.get('/responses/'+responseID)
        .then(checkAndRun(callback))
    },
    delete: function(responseID, callback){
      $http.delete('/responses/'+responseID)
        .then(checkAndRun(callback))
    }
  }
}])