angular.module("signupCtrlModule", ["firebase"])
    .controller('SignupCtrl', ["$scope", "$firebaseAuth", "$location", "loginService", function($scope, $firebaseAuth, $location, loginService) {

        $scope.newUser = {};
        $scope.newUser.email = "";
        $scope.newUser.password = "";
        $scope.newUser.name = "";

        const auth = $firebaseAuth();

        $scope.signUp = () => {
            $scope.loading = true;

            const newEmail = $scope.newUser.email;
            const newPassword = $scope.newUser.password;

            auth.$createUserWithEmailAndPassword(newEmail, newPassword)
                .then(function(response) {
                    $scope.loading = false;
                    $scope.info = "Cadastro efetuado com sucesso. Efetue login!"
                    response.user.updateProfile({ 'displayName': $scope.newUser.name })
                })
                .catch(function(error) {
                    $scope.loading = false;
                    $scope.error = error.message;
                    console.log(error);
                })
        }

    }]);