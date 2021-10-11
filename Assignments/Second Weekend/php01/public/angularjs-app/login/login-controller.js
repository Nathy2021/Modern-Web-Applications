angular.module("badmintonFuns").controller("LoginCotroller", LoginCotroller);

function LoginCotroller(UserFactory, $routeParams, $window, $route) {
  const vm = this;

  vm.login = function () {
    const user = {
      username: vm.userName,
      password: vm.userPassword,
    };
    UserFactory.login(user).then(function (error, response) {
      console.log("User logged-in");
      if (!response) {
        $window.location.href = "#/badmintonfuns";
        
      }
      else console.log("authentication failed");
    });
  };

  vm.register = function () {
    $window.location.href = "#/";
  };
}
