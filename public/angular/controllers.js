var gameAppControllers = angular.module('gameAppControllers', [
    'gameAppServices',
    'restangular',
    'LocalStorageModule'
]);

gameAppControllers.controller('LoginController', ['$scope', '$location', 'userService', function($scope, $location, userService){
    $scope.login = function(){
        userService.login(
            $scope.email, $scope.password,
            function (response) {
                $location.path('/');
                userService.getUsers();
            }, function (response) {
                alert('something went wrong');
            }


        )
    }

    $scope.email = '';
    $scope.password = '';

    if(userService.checkIfLoggedIn())
        $location.path('/');

}]);

gameAppControllers.controller('SignupController', ['$scope', '$location', 'userService', function($scope, $location, userService)
{
    $scope.signup = function () {
        userService.signup(
            $scope.name, $scope.email, $scope.password,
            function(response){
                alert('You are successfully signedup as' + $scope.name);
                $location.path('/');
            },function(response){
                alert('something went wrong');
            }
        )
    }

    $scope.name = '';
    $scope.email = '';
    $scope.password = '';

    if(userService.checkIfLoggedIn())
    {
        $location.path('/');
    }
}]);

gameAppControllers.controller('MainController', ['$scope', '$location', 'userService', 'questionService', function($scope, $location, userService, questionService){

    if(userService.checkIfLoggedIn())
    {
        $location.path('/');
    }else{
        $location.path('/login');
    }

    $scope.logout = function()
    {
        userService.logout();
        $location.path('/login');
    }

    //console.log(localStorageService.get('firstname'));

    //get questions
    var init = function(){

        questionService.getQuestions(function(response) {
                $scope.question = response;
            },
            function(){
                alert('something went wrong');
            });

    }

    init();

    //save questions
    $scope.saveQuestion = function(){
        questionService.saveQuestion(
            $scope.addQuestion, $scope.optionA, $scope.optionB, $scope.optionC, $scope.optionD, $scope.correctOption,
            function(response){
               // console.log($scope);
                $scope.addQuestion = '';
                $scope.optionA = '';
                $scope.optionB = '';
                $scope.optionC = '';
                $scope.optionD = '';
                $scope.correctOption = '';

            },function(response)
            {
                alert('something went wrong');
            }

        )
    }
    
    //edit view
    $scope.load = function(Id)
    {
        questionService.getById(Id, function (response) {
            $scope.updatedId = response.id;
            $scope.updateQuestion = response.question;
            $scope.updateoptionA = response.optionA;
            $scope.updateoptionB = response.optionB;
            $scope.updateoptionC = response.optionC;
            $scope.updateoptionD = response.optionD;
            $scope.updateCorrectOption = response.correctOption;

            $('#updateBookModal').modal('toggle');
        },
            function(){
            alert('something went wrong');
        });
    }

    //update function
    $scope.updateques = function()
    {
        questionService.updateQues(
            $scope.updatedId,{
                question: $scope.updateQuestion,
                optionA: $scope.updateoptionA,
                optionB: $scope.updateoptionB,
                optionC: $scope.updateoptionC,
                optionD: $scope.updateoptionD,
                correctOption: $scope.updateCorrectOption
            },
            function(response)
            {
                $('#updateBookModal').modal('toggle');

            },
            function(response)
            {
                //console.log(response);
                alert("Something went wrong");
            }
        );
    }

    //delete function
    $scope.destroy = function(Id)
    {
        questionService.destroy(Id, function(response){
            $scope.message = response;

        });
    }

}]);

gameAppControllers.controller('StoryController', ['$scope', '$location', 'userService', 'storyService', function($scope, $location, userService, storyService){

    $scope.createStory = function(){
        storyService.createStory(
            $scope.title, $scope.description, $scope.moral,
            function (response) {
                $scope.title = '';
                $scope.description = '';
                $scope.moral = '';

                $('#updateBookModal').modal('toggle');
            },
            function (response) {
                alert('something went wrong');
            }
        )
    }

    //get stories
    var init = function(){
        storyService.getStories(function(response) {
                $scope.stories = response;

            },
            function(){
                alert('something went wrong');
            });

    }

    init();

    //edit view
    $scope.editStory = function(Id)
    {
        storyService.storyById(Id, function (response) {
                $scope.updatedId = response.id;
                $scope.updateTitle = response.title;
                $scope.updateDescription = response.description;
                $scope.updateMoral = response.moral;

                $('#edmyModal').modal('toggle');
            },
            function(){
                alert('something went wrong');
            });
    }

    //update function
    $scope.updatestory = function()
    {
        storyService.updateStory(
            $scope.updatedId,{
                title: $scope.updateTitle,
                description: $scope.updateDescription,
                moral: $scope.updateMoral,
            },
            function(response)
            {
                $('#edmyModal').modal('toggle');

            },
            function(response)
            {
                //console.log(response);
                alert("Something went wrong");
            }
        );
    }

    //delete function
    $scope.storydel = function(Id)
    {
        storyService.destroystory(Id, function(response){
            $scope.message = response;

        });
    }

    if(userService.checkIfLoggedIn())
    {
        $location.path('/story');
    }else{
        $location.path('/login');
    }

}]);
