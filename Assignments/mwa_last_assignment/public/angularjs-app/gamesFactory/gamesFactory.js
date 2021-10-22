// const { getAllGame } = require("../../../controller/game.controller");

angular.module("meanGames").factory("GamesFactory", GamesFactory);

function GamesFactory($http) {
  return {
    getAllGames: getAll,
    getOneGame: getOne,
    deleteOne: deleteOne,
    addOne: addOne,
    updateOne: updateOne,
    addUser: addUser,
  };

  function getAll(offset) {
    return $http.get("/api/games?offset=" + offset).then(complete).catch(fail);
  }

  function getOne(gameId) {
    return $http
      .get("/api/games/" + gameId)
      .then(complete)
      .catch(fail);
  }

  function addOne(game) {
    return $http.post("/api/games", game).then(complete).catch(fail);
  }

  function deleteOne(gameId) {
    return $http
      .delete("/api/games/" + gameId)
      .then(complete)
      .catch(fail);
  }

  function updateOne(gameId, newGame) {
    console.log("update datafactory")
    return $http
      .put("/api/games/" + gameId, newGame)
      .then(complete)
      .catch(fail);
  }

  function addUser(newUser) {
    console.log("inside add user");
    return $http
      .post("/api/users/register", newUser)
      .then(complete)
      .catch(fail);
  }

  function complete(response) {
    console.log("got response");
    return response.data;
  }
  function fail(error) {
    console.log(error);
    return error;
  }
}
