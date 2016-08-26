console.log('Resources Factory');

app.factory('resourcesFactory', ['$http','$httpParamSerializer', function($http, $httpParamSerializer, $cookies){
	function checkAndRun(callback){
		return data => { if (typeof(callback) == 'function') callback(data.data);}
	}

	return {
		index: (callback) => {
			$http.get('/resources')
				.then(checkAndRun(callback))
		},
		findAllByTopic: (topicID, callback) => {
			$http.get('/topics/'+topicID+'/resources')
				.then(checkAndRun(callback))
		},
		create: (topicID, resource, callback) => {
			$http.post('/topics/'+topicID+'/resources', resource)
				.then(checkAndRun(callback))
		},
		update: (resource, callback) => {
			$http.put('/resources/'+resource._id, resource)
				.then(checkAndRun(callback))
		},
		show: (resourceID, callback) => {
			$http.get('/resources/'+resourceID)
				.then(checkAndRun(callback))
		},
		delete: (resourceID, callback) => {
			$http.delete('/resources/'+resourceID)
				.then(checkAndRun(callback))
		},
		embedly: (options, callback) => {
			options.key = '017034fbb0324f67b350af426be2d8ad';
			var query = $httpParamSerializer(options)
			$http.get('https://api.embedly.com/1/oembed?'+query)
				.then(checkAndRun(callback))
		}
 	}
}])