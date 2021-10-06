angular.module("myPropperApp").controller("breweryController", breweryController)

function breweryController($routeParams, breweryFactory) {
    const vm = this
    const breweryId = $routeParams.breweryId
    breweryFactory.getOnebrewery(breweryId)
        .then(function (response) {
            vm.brewery = response
        })
}