angular.module("badmintonFuns").controller("FunController", FunController)


function FunController(FunsFactory, $routeParams, $route, $window){

    const vm = this
    const funId = $routeParams.funId
    FunsFactory.getOneFun(funId).then(function(response){
        vm.fun = response 
        console.log("fun:  ", vm.fun);    
    })
    vm.deleteFun = function (){

        FunsFactory.deleteOneFun(funId).then(function (response) {
            vm.message =""
           if (!response.status) {
               
                //$route.load ="/#/badmintonfuns";
                $window.location.href="/#/badmintonfuns"
                console.log("load the page");
            } 

            else {

                vm.message="unable to delete the fun"
            }
        });
    }
    vm.updateFun = function () {
        console.log("Fun controller  update inside");
        const newUpdate = {
          playerName: vm.uPlayerName,
          startYear: vm.uStartYear,
          country: vm.uCountry        
        };

        FunsFactory.updateOne(funId, newUpdate).then(function (response) {
            console.log("Fun updated");
            $route.reload();
          });
    }; 


}