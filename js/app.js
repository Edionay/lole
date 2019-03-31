var app = angular.module('loginLegalApp', ["ngRoute", "profileCtrlModule", "homeCtrlModule", "loginCtrlModule"]);

app.config($routeProvider => {
    $routeProvider
        .when("/", {
            templateUrl: "views/home.html",
            controller: "HomeCtrl"
        })
        .when("/profile", {
            templateUrl: "views/profile.html",
            controller: "ProfileCtrl"
        })
        .when("/home", {
            templateUrl: "views/home.html",
            controller: "ProfileCtrl"
        })
        .when("/login", {
            templateUrl: "views/login.html",
            controller: "LoginCtrl"
        })
        .otherwise({
            redirectTo: "/"
        })
})