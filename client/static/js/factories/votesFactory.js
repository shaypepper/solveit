console.log('votes Factory');

app.factory('votesFactory', ['$http', function($http, $cookies){
	function checkAndRun(callback){
		return data => { if (typeof(callback) == 'function') callback(data.data);}
	}
	return {
		index: (callback) => {
			$http.get('/votes')
				.then(checkAndRun(callback))
		},
		create: (vote, callback) => {
			$http.post('/votes', vote)
				.then(checkAndRun(callback))
		},
		update: (vote, callback) => {
			$http.put('/votes/'+vote._id, vote)
				.then(checkAndRun(callback))
		},
		show: (voteID, callback) => {
			$http.get('/votes/'+voteID)
				.then(checkAndRun(callback))
		},
		delete: (voteID, callback) => {
			$http.delete('/votes/'+voteID)
				.then(checkAndRun(callback))
		}
 	}
}])