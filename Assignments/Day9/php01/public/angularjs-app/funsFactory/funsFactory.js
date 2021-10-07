angular.module("badmintonFuns").factory("FunsFactory", FunsFactory)

function FunsFactory($http){
    return {
        getAllFuns: getAll,
        getOneFun: getOne
    }

    function getAll(){
        return $http.get("/api/badmintonfuns")
        .then(complete).catch(failed)
       
    }

    function getOne(funId){
        return $http.get("/api/badmintonfuns/"+ funId)
            .then(complete).catch(failed)
    }

    function complete(response){
        console.log("got response");
        return response.data;
    }
    function failed(error){
        console.log(error);
        return error
    }
}