app.factory('questionsFactory', ['$http', '$cookies', function($http, $cookies) {
  function checkAndRun(callback) {
    return data => { if (typeof(callback) == 'function') callback(data.data); }
  }
  var factory = {
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
    vote: (question_id, option_id, callback)=>{
      $http.post('/questions/'+question_id+'/'+option_id)
        .then(checkAndRun(callback))
    }
  };
  return factory;
}]);
