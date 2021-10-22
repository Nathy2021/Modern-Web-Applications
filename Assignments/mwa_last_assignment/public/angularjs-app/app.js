angular.module("meanGames", ["ngRoute"]).config(config);

function config($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "angularjs-app/main/main.html",
      controller: "MainController",
      controllerAs: "vm",
    })
    .when("/login", {
      templateUrl: "angularjs-app/login/login.html",
      controller: "LoginCotroller",
      controllerAs: "vm",
    })
    .when("/games", {
      templateUrl: "angularjs-app/game-list/games.html",
      controller: "GamesController",
      controllerAs: "vm",
    })
    .when("/games/:gameId", {
      templateUrl: "angularjs-app/game-one/game.html",
      controller: "GameController",
      controllerAs: "vm",
    })
    .otherwise({
      redirectTo: "/",
    });
}
