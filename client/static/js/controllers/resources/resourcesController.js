app.controller('resourcesController', 
  ['$scope','resourcesFactory', 'topicsFactory', 'usersFactory', '$location', '$cookies',
  function($scope, resourcesFactory, topicsFactory, usersFactory, $location, $cookies) {
  	usersFactory.session($location,$scope);
  	$scope.pageTitle = "Resources"
  	function getResources(){
  		resourcesFactory.index((topics)=>{
  			$scope.resources = resources;
  		})
  	}
  	getResources()
  	$scope.addResources = () => {
  		resourcesFactory.create($scope.newResource, (data) =>{
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