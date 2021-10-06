angular.module("myPropperApp").controller("MainController", MainController)

function MainController(PostFactory){
    const vm = this

    PostFactory.get("https://api.openbrewerydb.org/breweries")
        .then(function(response){
            vm.jokes = response.data
        })
}