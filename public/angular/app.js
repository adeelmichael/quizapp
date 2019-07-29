var gameApp = angular.module('gameApp', [
    'ngRoute',
    'gameAppControllers'
]);

gameApp.config(['$routeProvider', function($routeProvider){
    $routeProvider

    .when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'LoginController'
    })
    .when('/signup', {
        templateUrl: 'partials/register.html',
        controller: 'SignupController'
    })
    .when('/story', {
        templateUrl: 'partials/story.html',
        controller: 'StoryController'
    })
    .when('/', {
        templateUrl: 'partials/index.html',
        controller: 'MainController'
    })
    .otherwise({
            redirectTo: '/'
    });
}]);
