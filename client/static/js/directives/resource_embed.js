app.directive('slvResource', function(){
  return { 
    scope: {
      resource: '=resource'
    },
    templateUrl: '/partials/resources/show.html' 
  }
})
