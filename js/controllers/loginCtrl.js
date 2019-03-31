angular.module("loginCtrlModule", ["firebase"])
    .controller('LoginCtrl', ["$scope", "$firebaseAuth", "$location", function($scope, $firebaseAuth, $location) {
        $scope.user = {};
        $scope.user.email = "";
        $scope.user.password = "";

        $scope.newUser = {};
        $scope.newUser.email = "";
        $scope.newUser.password = "";

        const auth = $firebaseAuth();

        $scope.signIn = () => {
            const email = $scope.user.email;
            const password = $scope.user.password;

            auth.$signInWithEmailAndPassword(email, password)
                .then(function(response) {
                    $location.path("/profile")
                })
                .catch(function(error) {
                    console.log(error);
                })
        };

        $scope.signUp = () => {

            const newEmail = $scope.newUser.email;
            const newPassword = $scope.newUser.password;

            auth.$createUserWithEmailAndPassword(newEmail, newPassword)
                .then(function(response) {
                    console.log(response);
                })
                .catch(function(error) {
                    console.log(error);
                })
        }



    }])
    .service("logout", ["$location", "$firebaseAuth", function($location, $firebaseAuth) {
        var user = "";
        var auth = $firebaseAuth();

        return {
            getUser: function() {
                if (user == "") user = localStorage.getItem('userEmail');
                return user;
            },
            setUser: function(data) {
                localStorage.setItem('userEmail', data);
                user = data;
            }
        }
    }])