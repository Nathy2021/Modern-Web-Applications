angular.module("badmintonFuns").controller("FunsController", FunsController)

function FunsController(FunsFactory){
    const vm = this;
    vm.title= "Badminton Funs"
    console.log("Hello");
    FunsFactory.getAllFuns().then(function(funs){
            vm.funs = funs
        })
}