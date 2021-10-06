angular.module("myPropperApp").controller("PostController", PostController)

function PostController($routeParams, PostFactory) {
    const vm = this
    const postId = $routeParams.postId
    PostFactory.getOnePost(postId)
        .then(function (response) {
            vm.post = response
        })
}