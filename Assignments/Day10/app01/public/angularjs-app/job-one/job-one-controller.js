angular.module("jobSearch").controller("JobController", JobController)


// function _getStarRating(stars) {
//     return new Array(stars)
// }

function JobController(JobsFactory, $routeParams, $window) {

    const vm = this
    console.log(" job controller");
    const id = $routeParams.jobId
    JobsFactory.getOneJob(id).then(function (response) {
        console.log(" inside job factory one controller get one");
        vm.job = response
        console.log("JoB1:  ", vm.job);
        // vm.rating = _getStarRating(response.rate)
    })

    vm.deleteJob = function (){

        JobsFactory.deleteOneJob(id).then(function (response) {
            vm.message =""
           if (!response.status) {
               
                $window.location.href="#/jobs"
            }

            else {

                vm.message="unable to delete"
            }
        });
    }
}

