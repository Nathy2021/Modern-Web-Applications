angular.module("myPropperApp", ["ngRoute"]).config(config)

function config($routeProvider){
    $routeProvider.when("/", {
        templateUrl : "main/main.html",
        controller: "MainController",
        controllerAs: "mainCtrl"

    }).when('/about', {
        templateUrl:"./about/about.html",
        controller: "AboutController",
        controllerAs: "aboutCtrl"
    }).when('/breweries', {
        templateUrl:"./breweries/breweries.html",
        controller: "breweriesController",
        controllerAs: "breweriesCtrl"
    }).when('/breweries/:breweryId', {
        templateUrl:"./brewery/brewery.html",
        controller: "breweryController",
        controllerAs: "breweryCtrl"
    }).otherwise({
        redirectTo:"/"
    })
}