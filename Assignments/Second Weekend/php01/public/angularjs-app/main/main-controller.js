angular.module("badmintonFuns").controller("MainController", MainController);

function MainController(UserFactory, $routeParams, $window, $route) {
  const vm = this;

  vm.register = function () {
    const newUser = {
      username: vm.userName,
      name: vm.name,
      password: vm.userPassword,
    };
    UserFactory.addUser(newUser).then(function (err, response) {

      if(!response){
        //console.log("New User registred", response.status);
        $window.location.href="#/login"  
    }
    else{
      console.log(" unable to create New User");
    }
      
    });
  };

  vm.login = function(){
    $window.location.href="#/login"  
  }
}
