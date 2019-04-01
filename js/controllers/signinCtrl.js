angular.module("signinCtrlModule", ["firebase"])
    .controller('SigninCtrl', ["$scope", "$firebaseAuth", "$location", "loginService", function($scope, $firebaseAuth, $location, loginService) {
        $scope.user = {};
        $scope.user.email = "";
        $scope.user.password = "";

        const auth = $firebaseAuth();

        $scope.signIn = () => {
            $scope.loading = true;
            $scope.error = "";

            const email = $scope.user.email;
            const password = $scope.user.password;

            auth.$signInWithEmailAndPassword(email, password)
                .then(function(response) {
                    $scope.loading = false;
                    loginService.setUser(response.user);
                    $location.path("/profile")
                })
                .catch(function(error) {
                    $scope.loading = false;
                    $scope.error = error.message
                })
        };

    }])
    .service("loginService", ["$location", "$firebaseAuth", function($location, $firebaseAuth) {
        var user = null;
        var auth = $firebaseAuth();

        return {
            getUser: function() {
                if (!user) user = localStorage.getItem('user');
                return user;
            },
            setUser: function(data) {
                localStorage.setItem('user', data);
                user = data;
            },
            logoutUser: function() {
                auth.$signOut()
                    .then(function() {
                        $location.path("/signin")
                    })
                    .catch(function(error) {
                        console.log(error);
                    })
            }
        }
    }])