angular.module("myPropperApp").controller("breweriesController", breweriesController)

function breweriesController(breweryFactory) {
    const vm = this
    
    breweryFactory.getAllbreweries().then(function (response) {
        vm.breweries = response;
    })


}