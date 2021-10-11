angular.module("badmintonFuns").factory("UserFactory", UserFactory);

function UserFactory($http){
    return {
        
        addUser:addUser,
        login :login
        
    };    
    function addUser(newUser){
        console.log("inside add user")
        return $http.post("/api/users/register", newUser)
            .then(complete).catch(failed)
    }

    function login(user){
        console.log("inside add user")
        return $http.post("/api/users/login", user)
            .then(complete).catch(fail)
    }
    function complete(response){
        console.log("got response");
        return response.data;
    }
    function fail(error){
        console.log(error);
        return error
    }

}