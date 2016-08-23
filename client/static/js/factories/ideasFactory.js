console.log('Ideas Factory');

app.factory('ideasFactory', ['$http', function($http, $cookies){
	function checkAndRun(callback){
		return data => { if (typeof(callback) == 'function') callback(data.data);}
	}
	return {
		index: (callback) => {
			$http.get('/ideas')
				.then(checkAndRun(callback))
		},
		create: (idea, callback) => {
			$http.post('/ideas', idea)
				.then(checkAndRun(callback))
		},
		update: (idea, callback) => {
			$http.put('/ideas/'+idea._id, idea)
				.then(checkAndRun(callback))
		},
		show: (ideaID, callback) => {
			$http.get('/ideas/'+ideaID)
				.then(checkAndRun(callback))
		},
		delete: (ideaID, callback) => {
			$http.delete('/ideas/'+ideaID)
				.then(checkAndRun(callback))
		}
 	}
}])