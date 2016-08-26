app.controller('resourcesController', 
  ['$scope','resourcesFactory', 'topicsFactory', 'usersFactory', '$location','$routeParams', '$cookies',
  function($scope, resourcesFactory, topicsFactory, usersFactory, $location,$routeParams, $cookies) {
  	usersFactory.session($location,$scope);
  	$scope.pageTitle = "Resources"
  	function getResources(){
  		resourcesFactory.findAllByTopic($routeParams.id, (resources)=>{
  			var urls = resources.map( obj => obj.url )
        resourcesFactory.embedly({
          urls: urls.slice(0,10).join(',')
        }, data => {
          $scope.resources = data;
          console.log(data)
        })        
  		})
  	}
    function getTopic(){
      topicsFactory.show($routeParams.id, (topic)=>{
        $scope.topic = topic
      })
    }
    getTopic()
  	getResources()
  	$scope.createResource = () => {
      var new_resource = { 
        title: $scope.newResource.title,
        url: $scope.newResource.url,
        type: "topic"
      }
  		resourcesFactory.create($routeParams.id, new_resource, (data) =>{
  			console.log(data)
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