console.log('Resources Factory');

app.factory('resourcesFactory', ['$http','$httpParamSerializer', function($http, $httpParamSerializer, $cookies){
  function checkAndRun(callback){
    return function(data){ 
      if (typeof(callback) == 'function') {
        callback(data.data);
      }
    }
  }

	return {
		index: function(callback){
			$http.get('/resources')
				.then(checkAndRun(callback))
		},
		findAllByTopic: function(topicID, callback){
			$http.get('/topics/'+topicID+'/resources')
				.then(checkAndRun(callback))
		},
		create: function(topicID, resource, callback){
			$http.post('/topics/'+topicID+'/resources', resource)
				.then(checkAndRun(callback))
		},
		update: function(resource, callback){
			$http.put('/resources/'+resource._id, resource)
				.then(checkAndRun(callback))
		},
		show: function(resourceID, callback){
			$http.get('/resources/'+resourceID)
				.then(checkAndRun(callback))
		},
		delete: function(resourceID, callback){
			$http.delete('/resources/'+resourceID)
				.then(checkAndRun(callback))
		},
		embedly: function(options, callback){
			options.key = '017034fbb0324f67b350af426be2d8ad';
			var query = $httpParamSerializer(options)
			$http.get('https://api.embedly.com/1/oembed?'+query)
				.then(checkAndRun(callback))
		}
 	}
}])