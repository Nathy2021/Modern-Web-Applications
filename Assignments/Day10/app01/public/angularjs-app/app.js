angular.module("jobSearch", ["ngRoute"]).config(config)

function config($routeProvider){
    $routeProvider.when("/", {
        templateUrl: "angularjs-app/main/welcome.html",
        
    }).when("/jobs", {
        templateUrl : "angularjs-app/jobs-list/jobs.html",
        controller: "JobsController",
        controllerAs: "vm"
    }).when("/job/:jobId", {
        templateUrl : "angularjs-app/job-one/job.html",
        controller: "JobController",
        controllerAs: "vm"
    })
}