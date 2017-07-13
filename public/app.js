angular.module('sampleApp',['ngRoute'])
    .config(function($routeProvider,$locationProvider){
        $routeProvider
        .when('/',{
            templateUrl:'pages/login.html',
            controller:'loginController'
        })
        .when('/home',{
            templateUrl:'pages/home.html',
            controller:'homeController'
        })       
        .otherwise({
            redirectTo: '/'
        });
        $locationProvider.hashPrefix('');        
    });