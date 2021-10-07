angular.module("meanGames").controller("GameController", GameController)


function _getStarRating(stars){
    return new Array(stars)
}
function GameController(GamesFactory, $routeParams){

    const vm = this
    console.log("game1");
    const id = $routeParams.gameId
    GamesFactory.getOneGame(id).then(function(response){
        vm.game = response
        vm.rating= _getStarRating(response.rate)
    })

}