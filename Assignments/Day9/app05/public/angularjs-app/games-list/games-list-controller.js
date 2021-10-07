angular.module("meanGames").controller("GamesController", GamesController)

function GamesController(GamesFactory){
    const vm= this
    vm.title= "MEAN Games App"
    console.log("Hello");
    GamesFactory.getAllGames().then(function(games){
            vm.games = games
        })
}