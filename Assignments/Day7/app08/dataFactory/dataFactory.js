angular.module("myPropperApp").factory("PostFactory", PostFactory)

function PostFactory($http){
    return {
        getAllPosts:getAll,
        getOnePost: getOne
    }
    function getAll(){
        //return $http.get("https://jsonplaceholder.typicode.com/posts")
        return $http.get("https://api.openbrewerydb.org/breweries")
        .then(complete).catch(failed)
    }
    function getOne(postId){
        //return $http.get("https://jsonplaceholder.typicode.com/posts/" + postId)
        return $http.get("https://api.openbrewerydb.org/breweries"+postId)
        .then(complete).catch(failed)
    }

    function complete(response){
        return response.data

    }
    function failed(error){
        return error
    }
}