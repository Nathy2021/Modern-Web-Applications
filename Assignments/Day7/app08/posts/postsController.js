angular.module("myPropperApp").controller("PostsController", PostsController)

function PostsController(PostFactory) {
    const vm = this
    console.log("hhhhhhhhhhh");
    PostFactory.getAllPosts().then(function (response) {
        vm.posts = response;
    })


}