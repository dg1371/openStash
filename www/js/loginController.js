angular.module('openStashApp').factory('loginData', ['$resource',
    function ($resource) {

        return $resource('/api/login', {}, {
            login: {method: 'POST'},
            status: {
                method: 'GET',
                'url': '/api/v1/login/status'

            }

        });
    }]);

angular.module('openStashApp').controller('MainController', ['$scope', 'loginData', '$location', '$translate',
    '$rootScope', '$state', '$uibModal', '$filter','$window', 'messages',
    function ($scope, loginData, $location, $translate, $rootScope, $state, $uibModal, $filter, $window, messages) {


     loginData.status().$promise.then(function (statusResponse) {


            if (statusResponse.statusCode == 'ok') {

                  $rootScope.loggedIn = true;
            $location.path('/home');
              } else {
                $state.go('login');
            }
        }).catch(function (error) {
           console.log(error);
        });

        $scope.isActive = function (name) {
            if ($state.current.name.startsWith(name)) {
                if(name == 'admin' && $state.current.name == 'admin-production-edit') {
                    return null;
                }
                return 'active';
            } else {
                return null;
            }
        };

        $scope.goFullscreen = function () {
            if (Fullscreen.isEnabled())
                Fullscreen.cancel();
            else
                Fullscreen.all();
        };

        $scope.getWidth = function () {
            if ($state.current.name.includes('admin')) {
                return 'col-lg-10 col-md-9';
            } else {
                return 'col-lg-12 col-md-12';
            }
        };

        function getParameterByName(name, url) {
            if (!url) url = $window.location.href;
            name = name.replace(/[\[\]]/g, '\\$&');
            var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'), results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, ' '));
        }       

        $rootScope.authState = getParameterByName('state');
        $rootScope.clientId = getParameterByName('client_id');
        $rootScope.responseType = getParameterByName('response_type');

        /**
         * TODO: Beware there is duplicate login code here!! and below in the modal controller.
         */
        $scope.submit = function () {
            var loginDataResponse = loginData.login({
                inputEmail: $scope.inputEmail,
                inputPassword: $scope.inputPassword,
                responseType: $rootScope.responseType,
                clientId: $rootScope.clientId,
                authState: $rootScope.authState
            }, function () {
                $scope.loginData = loginDataResponse;
                //Load up data into the rootScope so it can be used across the application.
                if ($scope.loginData.statusCode == 'ok') {
                    $rootScope.loggedIn = true;
                    $location.path('/home');
                } else if($scope.loginData.statusCode == 301) { 
                    $window.location.href = $scope.loginData.redirectURL;
                }
                //else show error message
                //TODO: should we show the acutal error somewhere? 
            }, function () {
                $scope.loginData = loginDataResponse;
                $scope.loginData.message = 'LOGIN_FORM.LOGIN_FAILED';
            });
        };

        /**
         * Launch change user (login) modal.
         */
        $scope.changeUser = function () {
            var modalInstance = $uibModal.open({
                templateUrl: 'login.html',
                controller: 'LoginModalController',
                size: 'md',
                animation: false
            });

            /**
             * Called when login pop up is dismissed.
             */
            modalInstance.result.then(function () {
                messages.success('User changed.');
            }, function () {
                messages.warning('Change user canceled');
            });
        };
    }
]);

/**
 * Beware there is deplicate login code here!!
 */
angular.module('openStashApp').controller('LoginModalController', ['$scope', 'loginData', '$state',
    function ($scope, loginData, $state) {
        $scope.submit = function () {
            var loginDataResponse = loginData.login({
                inputEmail: $scope.inputEmail,
                inputPassword: $scope.inputPassword
            }, function () {
                $scope.loginData = loginDataResponse;

                //Load up data into the rootScope so it can be used accross the application.
                if ($scope.loginData.statusCode == 'ok') {
                    $scope.loggedIn = true;
                    //reply.redirect('./index.html');
                    $state.reload();
                    //$state.go('/home');
                   // $uibModalInstance.close();
                }
                //else show error message
                //Should we show the actual error in the dialog? 
            }, function () {
                $scope.loginData = loginDataResponse;
                $scope.loginData.message = 'LOGIN_FORM.LOGIN_FAILED';
            });
        };

        $scope.cancel = function () {
           // $uibModalInstance.dismiss('cancel');
        };
    }]);
