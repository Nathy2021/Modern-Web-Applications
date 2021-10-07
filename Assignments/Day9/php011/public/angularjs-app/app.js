angular.module("badmintonFuns", ["ngRoute"]).config(config)

function config($routeProvider){
    $routeProvider.when("/", {
        templateUrl: "./angularjs-app/main/welcome.html"
        
    }).when("/badmintonfuns", {
        templateUrl : "angularjs-app/funs-list/funs.html",
        controller: "FunsController",
        controllerAs: "vm"
    }).when("/badmintonfun/:funId", {
        templateUrl : "angularjs-app/fun-one/fun.html",
        controller: "FunController",
        controllerAs: "vm"
    }).otherwise({
        redirectTo: "/"
    })       
    
}