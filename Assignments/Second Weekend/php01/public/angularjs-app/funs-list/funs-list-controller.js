angular.module("badmintonFuns").controller("FunsController", FunsController)

function FunsController(FunsFactory, $routeParams, $window, $route){
    const vm = this;
    vm.offset = 0;
    vm.title= "List of Badminton Funs"
    console.log("Hello");
    const id = $routeParams.funId

    FunsFactory.getAllFuns(vm.offset).then(function(funs){
            vm.funs = funs
            const funObj=JSON.parse(JSON.stringify(funs));
            if(funObj.length < 3){
                vm.offset = 0;
            }
    });

    vm.addFun = function () {
        const postFun = {
            country: vm.newFunCountry,
            startYear: vm.newFunStartYear,
            playerName: vm.newFunPlayerName,
            name: vm.newName,
            teamCountry: vm.newCountry,
            playedYears: vm.newPlayedYears        
            // skill: vm.newJobSkill,
         
        };
         
        if (vm.funForm.$dirty && vm.funForm.$valid) {
            console.log("fun 11 inside  saved!")
            FunsFactory.addOneFun(postFun).then(function (response) {
                console.log("fun 11 inside  saved!", response);
                $window.location.href = "#/badmintonfuns";
                $route.reload();
                // $window.location.href = "#!/jobs";            
            });
        }
        else {
             
            console.log("provided incorrect data");
        }
    }
    


    vm.previous = function(){
        vm.offset = vm.offset -3;
        if(vm.offset <= 0) {
            vm.offset = 0;
        }
        FunsFactory.getAllFuns(vm.offset).then(function(funs){
            vm.funs=funs

        });
    };

    vm.next = function(){
        vm.offset = vm.offset + 3;
        FunsFactory.getAllFuns(vm.offset).then(function(funs){
            vm.funs = funs;
            const funObj = JSON.parse(JSON.stringify(funs));
            if(funObj.length < 3){
                vm.offset=0;
            }
        });
    };
    vm.searchFuns = function () {
        JobsFactory.searchFuns().then(function (response) {

        })
    }
}