angular.module("meanGames").controller("GamesController", GamesController);

function GamesController(GamesFactory, $route) {
  const vm = this;
  vm.offset = 0;
  vm.title = "Games List";
  GamesFactory.getAllGames(vm.offset).then(function (games) {
    vm.games = games;
    // console.log("vm.games ", vm.games)
  });

  vm.previous = function () {
    vm.offset = vm.offset - 3;
    if (vm.offset <= 0) vm.offset = 0;
    GamesFactory.getAllGames(vm.offset).then(function (games) {
      vm.games = games;
    });
  };

  vm.next = function () {
    vm.offset = vm.offset + 3;
    GamesFactory.getAllGames(vm.offset).then(function (games) {
      vm.games = games;
      const jobObj = JSON.parse(JSON.stringify(games));
      if (jobObj.length < 3) vm.offset = 0;
    });
  };

  vm.addGame = function () {
    console.log("Jobs controller inside - addJOb");
    const newGame = {
      title: vm.gameTitle,
      price: vm.gamePrice,
      minPlayers: vm.minPlayers,
      maxPlayers: vm.maxPlayers,
    };

    GamesFactory.addOne(newGame).then(function (response) {
      console.log("Game Saved");
      $route.reload();
    });
  };

  vm.register = function () {
    const newUser = {
      username: vm.userName,
      name: vm.name,
      password: vm.userPassword,
    };

    GamesFactory.addUser(newUser).then(function (response) {
      console.log("User Saved");
      $route.reload();
    });
  };
}
