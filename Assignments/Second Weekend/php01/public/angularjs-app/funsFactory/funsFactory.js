angular.module("badmintonFuns").factory("FunsFactory", FunsFactory)

function FunsFactory($http){
    return {
        getAllFuns: getAll,
        getOneFun: getOne,
        deleteOneFun:deleteFun,
        addOneFun: addOne,
        updateOne:updateOne
    }
    function updateOne(funId, newUpdate){
        return $http.put("/api/badmintonfuns/"+ funId, newUpdate)
            .then(complete).catch(failed)
    }

    function getAll(){
        console.log("offset1");
        return $http.get("/api/badmintonfuns")
        .then(complete).catch(failed)
       
    }
    function getAll(offset){
        console.log("offset1");
        return $http.get("/api/badmintonfuns/?offset="+offset)
        .then(complete).catch(failed)
       
    }
    function deleteFun(funId){
        return $http.delete("/api/badmintonfuns/"+funId)
        .then(complete).catch(failed);       
    }

    function addOne(fun){
        console.log(" inside fun factory add fun");
        return $http.post("/api/badmintonfuns", fun)
        .then(complete).catch(failed);
       
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