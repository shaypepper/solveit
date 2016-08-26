console.log('votes Factory');

app.factory('votesFactory', ['$http', function($http, $cookies){
	function checkAndRun(callback){
		return function(data){ 
			if (typeof(callback) == 'function') {
				callback(data.data);
			}
		}
	}
	return {
		index: function(callback){
			$http.get('/votes')
				.then(checkAndRun(callback))
		},
		create: function(vote, callback){
			$http.post('/votes', vote)
				.then(checkAndRun(callback))
		},
		update: function(vote, callback){
			$http.put('/votes/'+vote._id, vote)
				.then(checkAndRun(callback))
		},
		show: function(voteID, callback){
			$http.get('/votes/'+voteID)
				.then(checkAndRun(callback))
		},
		delete: function(voteID, callback){
			$http.delete('/votes/'+voteID)
				.then(checkAndRun(callback))
		}
 	}
}])