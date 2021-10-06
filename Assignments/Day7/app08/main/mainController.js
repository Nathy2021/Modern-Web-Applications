angular.module("myPropperApp").controller("MainController", MainController)

function MainController(breweryFactory){
    const vm = this

    breweryFactory.get("https://api.openbrewerydb.org/breweries")
        .then(function(response){
            vm.breweries = response.data
        })
}