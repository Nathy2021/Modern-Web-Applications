angular.module("myPropperApp").factory("breweryFactory", breweryFactory)

function breweryFactory($http){
    return {
        getAllbreweries:getAll,
        getOnebrewery: getOne
    }
    function getAll(){
        
        return $http.get("https://api.openbrewerydb.org/breweries")
        .then(complete).catch(failed)
    }
    function getOne(breweryId){
        return $http.get("https://api.openbrewerydb.org/breweries/"+breweryId)
        .then(complete).catch(failed)
    }

    function complete(response){
        return response.data

    }
    function failed(error){
        return error
    }
}