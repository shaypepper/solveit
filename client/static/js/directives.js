app.directive('moiNavbar', function(){
  return { templateUrl: '/partials/templates/navbar.html' }
})

app.directive('moiResourceShow', function(){
  return { 
    scope: { resource: '=resource' },
    templateUrl: '/partials/resources/show.html' 
  }
})

app.directive('moiFooter', function(){
	return {templateUrl:'/partials/templates/footer.html'}
})