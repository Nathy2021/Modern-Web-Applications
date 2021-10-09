angular.module("jobSearch").controller("JobsController", JobsController)

function JobsController(JobsFactory, $routeParams,$window, $route) {
    const vm = this
    vm.title = "List of Jobs"
    console.log("Inside jobs controller");
    vm.offset = 0;
    const id = $routeParams.jobId

    JobsFactory.getAllJobs(vm.offset).then(function (jobs) {
        vm.jobs = jobs
        const jobObj = JSON.parse(JSON.stringify(jobs));
        if (jobObj.length < 3) vm.offset = 0;

    });

    vm.addJob = function () {
        const postJob = {
            title: vm.newJobTitle,
            salary: vm.newJobSalary,
            description: vm.newJobDescription,
            experience: vm.newJobExperience,
            postDate: vm.newJobDate,
            skill: vm.newJobSkill,
            address: vm.newAaddress,
            zipCode: vm.newZipCode,
            phoneNumber: vm.newPhoneNumber
        };
        console.log("Job 11 saved!");
        if (vm.jobForm.$dirty && vm.jobForm.$valid) {
            JobsFactory.addOneJob(postJob).then(function (response) {
                console.log("Job 11 saved!", response);
                $window.location.href = "#/jobs";
                // $route.reload();
                // $window.location.href = "#!/jobs";            
            });
        }
        else {
            //vm.isSubmitted=true;
            console.log("provided incorrect data");
        }
    }
    vm.searchJobs = function () {
        JobsFactory.searchjobs().then(function (response) {

        })
    }
    vm.previous = function () {
        vm.offset = vm.offset - 3;
        if (vm.offset <= 0) vm.offset = 0;
        JobsFactory.getAllJobs(vm.offset).then(function (jobs) {
            vm.jobs = jobs;
        });
    };
    vm.next = function () {
        vm.offset = vm.offset + 3;
        JobsFactory.getAllJobs(vm.offset).then(function (jobs) {
            vm.jobs = jobs;
            const jobObj = JSON.parse(JSON.stringify(jobs));
            if (jobObj.length < 3) vm.offset = 0;
        });
    };
    // vm.deleteJobFromJobs = function (id){

    //     JobsFactory.deleteOneJobFromJobs(id).then(function (response) {
    //         vm.message =""
    //        if (!response.status) {
               
    //             $window.location.href="#/jobs"
    //         }

    //         else {

    //             vm.message="unable to delete"
    //         }
    //     });
    // }

}