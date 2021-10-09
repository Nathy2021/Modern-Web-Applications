angular.module("jobSearch").directive("JobRating", JobRating)

function JobRating(){
    return {
        restrict : "E", //EACM
        templateUrl: "angularjs-app/jobs-rating/rating.html",
        bindToController: true,
        controller: "JobController",
        controllerAs: "vm"
    }
}
