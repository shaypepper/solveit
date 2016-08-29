app.directive('moiNavbar', function(){
  return { templateUrl: '/partials/navbar.html' }
})

app.directive('moiResourceShow', function(){
  return { 
    scope: { resource: '=resource' },
    templateUrl: '/partials/resources/show.html' 
  }
})

