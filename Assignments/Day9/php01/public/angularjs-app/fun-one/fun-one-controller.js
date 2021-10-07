angular.module("badmintonFuns").controller("FunController", FunController)


function _getStarRating(stars){
    return new Array(stars)
}
function FunController(FunsFactory, $routeParams){

    const vm = this
    // console.log("game1");
    const id = $routeParams.funId
    FunsFactory.getOneFun(id).then(function(response){
        vm.fun = response
        vm.rating= _getStarRating(response.rate)
    })

}