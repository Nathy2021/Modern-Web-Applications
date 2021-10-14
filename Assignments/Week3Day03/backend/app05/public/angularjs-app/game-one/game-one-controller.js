angular.module("meanGames").controller("GameController", GameController)


function _getStarRating(stars) {
    return new Array(stars)
}

function GameController(GamesFactory, $routeParams, $window) {

    const vm = this
    console.log("game1");
    const id = $routeParams.gameId
    GamesFactory.getOneGame(id).then(function (response) {
        vm.game = response
        vm.rating = _getStarRating(response.rate)
    })
    vm.deleteGame = function (){

        GamesFactory.deleteOneGame("5fbed15c07a5894b456b434a").then(function (response) {
            vm.message =""
           if (!response.status) {
               
                $window.location.href="#!/games"
            }

            else {

                vm.message="unable to delete"
            }
        });
    }
}

