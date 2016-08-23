console.log('categories Factory')
app.factory('categoriesFactory', ['$http','$cookies', function($http, $cookies) {
  function checkAndRun(callback) {
    return data => { if (typeof(callback) == 'function') callback(data.data); }
  }
  return {
    index:  (callback) => {
      $http.get('/categories')
        .then(checkAndRun(callback))
    },
    create: (category, callback) => {
      $http.post('/categories', category)
        .then(checkAndRun(callback))
    },
    update: (category, callback) => {
      $http.put('/categories/'+category._id, category)
        .then(checkAndRun(callback))
    },
    show:   (categoryID, callback) => {
      $http.get('/categories/'+categoryID)
        .then(checkAndRun(callback)) 
    },
    delete: (categoryID, callback) => {
      $http.delete('/categories/'+categoryID)
        .then(checkAndRun(callback)) 
    }
  }
} 