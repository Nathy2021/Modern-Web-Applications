angular.module("meanGames").controller("GamesController", GamesController)

function GamesController(GamesFactory){
    const vm= this
    vm.title= "MEAN Games App"
    console.log("Hello");
    GamesFactory.getAllGames().then(function(games){
            vm.games = games
        });

        vm.searchPublisher= function(){
            console.log("latitude ", vm.publishLat);
            console.log("longitude ", vm.publishLng);
            GamesFactory.getAllGames2(vm.publisherLat, vm.publisherLng, vm.maxDistance).then(function (games) {

                vm.games = games;
                
                });    
                
        }

        vm.addGame = function(){
            const postData ={
                title: vm.newGameTitle,
                price: vm.newGamePrice
            };
            if(vm.gameForm.$dirty && vm.gameForm.$valid){
              GamesFactory.addOneGame(postData).then(function(response){
                  console.log("Game saved!");
              }).catch(function(error){
                  console.log(error);                  
              });
            }
            else{
                //vm.isSubmitted=true;
                console.log("provided incorrect data");  
            }
        }
        
}