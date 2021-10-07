angular.module("badmintonFuns").controller("FunController", FunController)


function FunController(FunsFactory, $routeParams){

    const vm = this
    const id = $routeParams.funId
    FunsFactory.getOneFun(id).then(function(response){
        vm.fun = response     
    })

}