app.factory('questionsFactory', ['$http', '$cookies', function($http, $cookies) {
  function checkAndRun(callback) {
    return data => { if (typeof(callback) == 'function') callback(data.data); }
  }
  return {
    create: (newquestion,callback) => {
      $http.post('/questions', newquestion)
        .then(checkAndRun(callback));
    },
    index: (callback) => {
      $http.get('/questions')
        .then(checkAndRun(callback));
    },
    delete: (id, callback) => { 
      $http.delete('/questions/'+id)
        .then(checkAndRun(callback));
    },
    show: (id, callback) => {
      $http.get('/questions/'+id)
        .then(checkAndRun(callback)); 
    },
    vote: (questionId, optionId, callback)=>{
      $http.get('/questions/'+questionId+'/'+optionId)
        .then(checkAndRun(callback))
    }
  };
}]);
