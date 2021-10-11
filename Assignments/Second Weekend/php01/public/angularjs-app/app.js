angular.module("badmintonFuns", ["ngRoute"]).config(config)

function config($routeProvider){
    $routeProvider.when("/", {
        templateUrl: "./angularjs-app/main/welcome.html",
        controller: "MainController",
        controllerAs: "vm"
        
    }).when("/login", {
        templateUrl : "angularjs-app/login/login.html",
        controller: "LoginCotroller",
        controllerAs: "vm"
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