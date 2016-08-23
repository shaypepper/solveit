console.log('Resources Factory');

app.factory('resourcesFactory', ['$http', function($http, $cookies){
	function checkAndRun(callback){
		return data => { if (typeof(callback) == 'function') callback(data.data);}
	}
	return {
		index: (callback) => {
			$http.get('/resources')
				.then(checkAndRun(callback))
		},
		create: (resource, callback) => {
			$http.post('/resources', resource)
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
		}
 	}
}])