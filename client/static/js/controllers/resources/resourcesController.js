app.controller('resourcesController', 
  ['$scope','resourcesFactory', 'topicsFactory', 'usersFactory', '$location','$routeParams', 
  function($scope, resourcesFactory, topicsFactory, usersFactory, $location, $routeParams) {
  	usersFactory.session($location, $scope);
  	$scope.pageTitle = "Resources"
  	function getResources(){
  		resourcesFactory.findAllByTopic($routeParams.id, function(resources){
  			var urls = resources.map( function(obj){ return obj.url } )
        resourcesFactory.embedly({
          urls: urls.slice(0,10).join(',')
        }, function(data){
          $scope.resources = data;
        })        
  		})
  	}
    function getTopic(){
      topicsFactory.show($routeParams.id, function(topic){
        $scope.topic = topic;
      })
    }
    getTopic()
  	getResources()
  	$scope.createResource = function(){
      var new_resource = { 
        title: $scope.newResource.title,
        url: $scope.newResource.url,
        type: "topic"
      }
  		resourcesFactory.create($routeParams.id, new_resource, function(data){
        if ("errors" in data){
  				$scope.errors = data.errors
  			} else {
  				$scope.newResource = {};
  				getResources()
  			}
  		})
  	}
  }
])