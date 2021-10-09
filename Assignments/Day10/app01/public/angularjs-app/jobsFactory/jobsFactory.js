angular.module("jobSearch").factory("JobsFactory", JobsFactory)

function JobsFactory($http){
    return {
        getAllJobs: getAll,
        getOneJob: getOne,
        addOneJob: addOne,
        deleteOneJob:deleteJob
        
    }
    function deleteJob(jobId){
        return $http.delete("/api/jobs/"+jobId)
        .then(complete).catch(failed);       
    }
    // function deleteJobfromJobs(jobId){
    //     return $http.delete("/api/jobs/"+jobId)
    //     .then(complete).catch(failed);       
    // }

    function addOne(job){
        console.log(" inside job factory add job");
        return $http.post("/api/jobs", job)
        .then(complete).catch(failed);
       
    }

    // function getAll(){
    //     return $http.get("/api/jobs")
    //     .then(complete).catch(failed)
       
    // }
    function getAll(offset){

        console.log("offset ", offset)
        
        
        
        return $http.get("/api/jobs/?offset=" + offset)
        
        .then(complete).catch(failed)
        
        }

    function getOne(jobId){
        console.log(" inside job factory one controller get one 2");
        return $http.get("/api/jobs/"+ jobId)
            .then(complete).catch(failed)
    }

    function complete(response){
        console.log("got response");
        console.log(" inside job factory one controller get one 2 success");
        return response.data;
    }
    function failed(error){
        console.log(error);
        console.log(" inside job factory one controller get one 2 fail");
        return error
    }
}