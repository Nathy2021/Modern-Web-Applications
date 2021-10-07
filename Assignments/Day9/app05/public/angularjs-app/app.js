angular.module("meanGames", ["ngRoute"]).config(config)

function config($routeProvider){
    $routeProvider.when("/", {
        templateUrl: "angularjs-app/main/welcome.html",
        
    }).when("/games", {
        templateUrl : "angularjs-app/games-list/games.html",
        controller: "GamesController",
        controllerAs: "vm"
    }).when("/game/:gameId", {
        templateUrl : "angularjs-app/game-one/game.html",
        controller: "GameController",
        controllerAs: "vm"
    })
}