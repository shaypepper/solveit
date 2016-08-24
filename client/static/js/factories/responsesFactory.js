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
    create: (responses, callback) => {
      $http.post('/responses', responses)
        .then(checkAndRun(callback))
    },
    update: (responses, callback) => {
      $http.put('/responses/'+responses._id, responses)
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