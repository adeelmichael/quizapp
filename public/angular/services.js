var gameAppServices = angular.module('gameAppServices', [
    'LocalStorageModule',
    'restangular'
]);

gameAppServices.factory('userService', ['$http','localStorageService', function($http, localStorageService){

    function checkIfLoggedIn()
    {
        if(localStorageService.get('token'))
            return true;
        else
            return false;
    }

    //register function
    function signup(name, email, password, onSuccess, onError)
    {
        $http.post('/api/register', {
            name: name,
            email: email,
            password: password
        }).
            then(function(response) {
            localStorageService.set('token', response.data.token);
            onSuccess(response);
        },
            function(response){
             onError(response);

        });
    }

    //login function
    function login(email, password, onSuccess, onError)
    {
        $http.post('/api/login', {
            email: email,
            password: password
        }).then(function(response) {
            localStorageService.set('token', response.data.token);
            onSuccess(response);
        },
            function(response){
            onError(response);
        });
    }

    //get authenticated user
    function getUsers()
    {
        $http({
            method: 'GET',
            url: '/api/user',
            headers: {
                'Authorization': 'Bearer ' + localStorageService.get('token')
            }
        }).then(function successCallback(response) {
           localStorageService.set('firstname', response);
        }, function errorCallback(response) {
            if(response.status = 401){ // If you have set 401
                console.log(response);
            }
        });
    }

    //logout function
    function logout()
    {
        localStorageService.remove('token');
        localStorageService.remove('firstname');
    }

    function getCurrentToken()
    {
        localStorageService.get('token');
    }

    //get curretn user
    function getCurrentUser()
    {
        localStorageService.get('firstname');
    }

    return {
        checkIfLoggedIn: checkIfLoggedIn,
        signup: signup,
        login: login,
        logout: logout,
        getCurrentToken: getCurrentToken,
        getUsers: getUsers,
        getCurrentUser: getCurrentUser
    }
}]);

gameAppServices.factory('questionService',  ['$http','userService', 'Restangular', function($http, userService, Restangular){
    //save question
    function saveQuestion(question, optionA, optionB, optionC, optionD, correctOption, onSuccess, onError) {
        $http.post('/api/questions', {
            question: question,
            optionA: optionA,
            optionB: optionB,
            optionC: optionC,
            optionD: optionD,
            correctOption: correctOption
        })
            .then(function (response) {
                    onSuccess(response);
                },
                function (response) {
                    onError(response);
                });
    }

    function getQuestions(onSuccess, onError)
    {
        Restangular.all('api/').getList().then(function(response) {
            onSuccess(response);
           // console.log(response);
        }, function(response){
            onError(response);
        });
    }

    function getById(Id, onSuccess, onError){
        Restangular.one('api/edit', Id).get().then(function (response) {
            onSuccess(response);
        }, function(response){
            onError(response);
        });
    }

    //update question
    function updateQues(Id, data, onSuccess, onError){
        Restangular.all('api/updateQuestion').customPOST({Id, data}).then(function(response) {
            onSuccess(response);
            //console.log(response);
        }, function(response){
            onError(response);
        });
    }

    //delete question
    function destroy(Id, onSuccess, onError)
    {
        Restangular.one('api/destroy', Id).get().then(function(response) {
            onSuccess(response);
        },
            function(response){
            onError(response);
        });
    }

    //Restangular.setDefaultHeaders({ 'Authorization' : 'Bearer ' + userService.getCurrentToken() });

    return {
        saveQuestion: saveQuestion,
        getQuestions: getQuestions,
        getById: getById,
        destroy: destroy,
        updateQues: updateQues
    }

}]);

gameAppServices.factory('storyService', ['$http', 'Restangular', function($http, Restangular){

    function createStory(title, description, moral, onSuccess, onError)
    {
        $http.post('/api/story/create', {
            title : title,
            description: description,
            moral: moral
        }).then(function(response) {
                onSuccess(response);
            },
            function(response){
                onError(response);
            });
    }

    function getStories(onSuccess, onError)
    {
        Restangular.all('api/story/show').getList().then(function(response) {
            onSuccess(response);
            //console.log(response);
        },
            function(response){
                onError(response);
        });
    }

    function storyById(Id, onSuccess, onError){
        Restangular.one('api/story/edit', Id).get().then(function (response) {
            onSuccess(response);
        }, function(response){
            onError(response);
        });
    }

    //update story
    function updateStory(Id, data, onSuccess, onError){
        Restangular.all('api/story/update').customPOST({Id, data}).then(function(response) {
            onSuccess(response);
            //console.log(response);
        }, function(response){
            onError(response);
        });
    }

    //delete story
    function destroystory(Id, onSuccess, onError)
    {
        Restangular.one('api/story/destroy', Id).get().then(function(response) {
                onSuccess(response);
            },
            function(response){
                onError(response);
            });
    }

    return {
        createStory: createStory,
        getStories: getStories,
        storyById: storyById,
        updateStory: updateStory,
        destroystory: destroystory
    }

}]);
