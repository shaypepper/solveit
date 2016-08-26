console.log('Ideas Factory');

app.factory('ideasFactory', ['$http', function($http, $cookies){
  function checkAndRun(callback){
    return function(data){ 
      if (typeof(callback) == 'function') {
        callback(data.data);
      }
    }
  }
	return {
		index: function(callback){
			$http.get('/ideas')
				.then(checkAndRun(callback))
		},
		ideasByTopic: function(topicID, callback){
			$http.get('topics/'+topicID+'/ideas')
				.then(checkAndRun(callback))
		},
		create: function(topicID, idea, callback){
			$http.post('topics/'+topicID+'/ideas', idea)
				.then(checkAndRun(callback))
		},
		update: function(idea, callback){
			$http.put('/ideas/'+idea._id, idea)
				.then(checkAndRun(callback))
		},
		show: function(ideaID, callback){
			$http.get('/ideas/'+ideaID)
				.then(checkAndRun(callback))
		},
		delete: function(ideaID, callback){
			$http.delete('/ideas/'+ideaID)
				.then(checkAndRun(callback))
		}
 	}
}])