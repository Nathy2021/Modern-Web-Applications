angular.module("badmintonFuns").directive("FunRating", FunRating)

function FunRating(){
    return {
        restrict : "E", //EACM
        templateUrl: "angularjs-app/fun-rating/rating.html",
        bindToController: true,
        controller: "FunController",
        controllerAs: "vm"
    }
}
