angular.module("meanGames").factory("GamesFactory", GamesFactory)

function GamesFactory($http){
    return {
        getAllGames: getAll,
        getOneGame: getOne,
        addOneGame: addOne,
        deleteOneGame:deleteGame,
        getAllGames2:getAll2
    }

    function getAll2(lat, lng, dist){

        return $http.get("/api/games?lng="+lng+"&lat="+lat+"&dist="+dist)
        
        .then(complete).catch(failed)         

    }

    function getAll(){
        return $http.get("/api/games")
        .then(complete).catch(failed)
       
    }
    
    function deleteGame(gameId){
        return $http.delete("/api/games/"+gameId)
        .then(complete).catch(failed);       
    }

    function addOne(game){
        return $http.post("/api/games", game)
        .then(complete).catch(failed);
       
    }

  

    function getOne(gameId){
        return $http.get("/api/games/"+ gameId)
            .then(complete).catch(failed)
    }

    function complete(response){
        console.log("got response");
        return response.data;
    }
    function failed(error){
        console.log(error);
        return error
    }
}