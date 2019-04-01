angular.module("profileCtrlModule", ["firebase"])
    .controller('ProfileCtrl', ["$scope", "loginService", "$location", "$firebaseStorage", function($scope, loginService, $location, $firebaseStorage) {

        $scope.currentUser = firebase.auth().currentUser;
        if (!$scope.currentUser) {
            $location.path("/login")
        }

        $scope.profilePicture = $scope.currentUser.photoURL || "./images/nopicture.png";

        $scope.greeting = "Olá, " + $scope.currentUser.displayName;
        $scope.userEmail = $scope.currentUser.email;

        $scope.logout = loginService.logoutUser;

        $scope.uploadFile = function(file) {

            $scope.info = "Verifique o console (F12) para acompanhar o progresso"
            console.log("Iniciando upload...")
            $scope.loading = true;
            var storageReference = firebase.storage().ref('pictures/' + $scope.currentUser.uid + '/profile.jpg');

            storageReference.put(file)
                .then(function(response) {
                    console.log("Upload concluído!")
                    storageReference.getDownloadURL()
                        .then(function(url) {
                            $scope.currentUser.updateProfile({ 'photoURL': url });
                            console.log("Saia e entre novamente para confirmar a alteração!")
                        })
                        .catch(function(error) {
                            $scope.loading = false;
                            $scope.error = error.message

                        })
                    $scope.loading = false;
                })
                .catch(function(error) {
                    console.log(error)
                })
        };
    }]);