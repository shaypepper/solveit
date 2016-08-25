console.log('Responses Factory');

app.factory('responsesFactory', ['$http', function($http, $cookies){
  function checkAndRun(callback){
    return data => { if (typeof(callback) == 'function') callback(data.data);}
  }
  return {
    index: (callback) => {
      $http.get('/responses')
        .then(checkAndRun(callback))
    },
    create: (response, callback) => {
      $http.post('/responses', response)
        .then(checkAndRun(callback))
    },
    createByIdeaId: (ideaID, response, callback) => {
      $http.post('/ideas/'+ideaID+'/responses', response)
        .then(checkAndRun(callback))
    },
    update: (response, callback) => {
      $http.put('/responses/'+responses._id, response)
        .then(checkAndRun(callback))
    },
    show: (responseID, callback) => {
      $http.get('/responses/'+responseID)
        .then(checkAndRun(callback))
    },
    delete: (responseID, callback) => {
      $http.delete('/responses/'+responseID)
        .then(checkAndRun(callback))
    }
  }
}])