console.log('categories Factory')
app.factory('categoriesFactory', ['$http','$cookies', function($http, $cookies) {
  function checkAndRun(callback){
    return function(data){ 
      if (typeof(callback) == 'function') {
        callback(data.data);
      }
    }
  }
  return {
    index:  function(callback){
      $http.get('/categories')
        .then(checkAndRun(callback))
    },
    create: function(category, callback){
      $http.post('/categories', category)
        .then(checkAndRun(callback))
    },
    update: function(category, callback){
      $http.put('/categories/'+category._id, category)
        .then(checkAndRun(callback))
    },
    show:   function(categoryID, callback){
      $http.get('/categories/'+categoryID)
        .then(checkAndRun(callback)) 
    },
    delete: function(categoryID, callback){
      $http.delete('/categories/'+categoryID)
        .then(checkAndRun(callback)) 
    }
  }
} 