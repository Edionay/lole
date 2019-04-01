var lole = angular.module('loginLegalApp', ["ngRoute", "profileCtrlModule", "signupCtrlModule", "signinCtrlModule", "ngFileUpload"]);

lole.config($routeProvider => {
    $routeProvider
        .when("/", {
            templateUrl: "views/signup.html",
            controller: "SignupCtrl"
        })
        .when("/profile", {
            templateUrl: "views/profile.html",
            controller: "ProfileCtrl"
        })
        .when("/signin", {
            templateUrl: "views/signin.html",
            controller: "SigninCtrl"
        })
        .when("/signup", {
            templateUrl: "views/signup.html",
            controller: "SignupCtrl"
        })
        .otherwise({
            redirectTo: "/"
        })
})