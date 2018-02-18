/**
 * Created by dan_g on 5/21/2017.
 */
angular.module('openStashApp', [
    'ngRoute',
    'ngclipboard',
    'ui.bootstrap',
    'ui.router',
    'ngResource',
    'ngCookies',
    'pascalprecht.translate',
    'ngStorage',


]);
/**
 * Created by dan gluck
 */



/**
 * HTTP intercept for Angular $http calls.
 */
angular.module('openStashApp').factory('httpIntercept', [
    function() {

        // the build version
        var version = '<!--version-->';

        // only cache-bust our URL's
        var whitelist = [ 'admin', 'client', 'dahsboard', 'login.html', 'index.html'];

        return {
            request: function(config) {

                // add cache bust param for html templates
                if (config.url.endsWith('html') && whitelist.some(function(prefix) {
                        return config.url.startsWith(prefix);
                    })) {
                    config.url = config.url + '?ver=' + version;
                }

                // globally set the timeout to 30 secs
                config.timeout = 30000;

                return config;
            }
        };
    }]);

angular.module('openStashApp').config([
    '$httpProvider', '$stateProvider', '$urlRouterProvider', '$translateProvider', '$compileProvider',
    function ($httpProvider, $stateProvider, $urlRouterProvider, $translateProvider, $compileProvider) {

        $httpProvider.defaults.timeout = 30000;

        $httpProvider.interceptors.push('httpIntercept');

        $urlRouterProvider.otherwise('/login');

        // Now set up the states
        /* eslint-disable angular/controller-as-route */
        $stateProvider.state('home', {
            url: '/home',
            templateUrl: 'client/home.html',
            controller: 'HomeController'
        }).state('admin-cell-device', {
            url: '/admin/cell/:id/device',
            templateUrl: 'admin/cellDevice.html',
            controller: 'CellDeviceController'
        }).state('/', {
            url: '/index.html',
            templateUrl: 'index.html'
        }).state('admin-cell-device-edit', {
            url: '/admin/cell/:cellId/device/edit/:id',
            templateUrl: 'admin/cellEdit.html',
            controller: 'CellEditController',
            params: {
                defaults: {
                    cellType: null,
                    parentId: null
                }
            }
        }).state('login', {
            url: '/login',
            templateUrl: 'login.html',
            controller: 'MainController'
        }).state('admin-machine-events', {
            url: '/admin/machine-events',
            templateUrl: 'admin/machineEvents.html',
            controller: 'MachineEventsController'
        }).state('admin', {
            url: '/admin',
            templateUrl: 'client/menu.html'
        }).state('me', {
            url: '/me',
            templateUrl: 'client/me.html',
            controller: 'UserProfileController'

        });

       // $translateProvider.useUrlLoader('/lang');
       // $translateProvider.preferredLanguage('en');
       // $translateProvider.useSanitizeValueStrategy('escape');

        $compileProvider.debugInfoEnabled(false);
    }]);

angular.module('openStashApp').run([
    '$rootScope', '$state', 'loginData', '$translate', '$window', '$interval', '$stateParams','messages',
    function ($rootScope, $state, loginData, $translate, $window, $interval, $stateParams, messages) {



        // global jQuery AJAX defaults
        // used by Kendo DataSource
        $.ajaxSetup({
            timeout: 30000
        });

        // global jQuery AJAX error handler
        // used by Kendo DataSource
        angular.element(document).ajaxError(function(e, xhr) {
            messages.error({
                xhr: xhr
            });
        });

       // $rootScope.loggedIn = false;
        $rootScope.language = 'en';
        $rootScope.entitlement = [];



        // register listener to watch route changes
        // Method signature: function (event, toState, toParams, fromState, fromParams)
        var stateChangeSuccess = $rootScope.$on('$stateChangeSuccess', function () {
            $rootScope.state = $state;
            $rootScope.hideMenu = $stateParams.hideMenu;
        });



        $rootScope.$on('$destroy', function () {
            $interval.cancel($rootScope.runOee);
            $window.Intercom('shutdown');
            stateChangeSuccess;
            stateChangeStart;
            alertNotification;
        });







        //Method signature: function (event, next, current)
        var stateChangeStart = $rootScope.$on('$stateChangeStart', function () {


            console.log("sdf");
            loginData.status().$promise.then(function (statusResponse) {

                $rootScope.entitlement = {};
                if (statusResponse.statusCode == 'ok') {
                    delete $rootScope.message;
                    $rootScope.loggedIn = true;

                    var lang = statusResponse.language;
                    $rootScope.language = lang;
                    for (var i = 0; i < statusResponse.entitlement.length; i++) {
                        $rootScope.entitlement[statusResponse.entitlement[i]] = true;
                    }
                    $rootScope.id = statusResponse.userData.id;
                    $analytics.setUsername($rootScope.id);
                    $rootScope.firstName = statusResponse.userData.firstName;
                    $rootScope.lastName = statusResponse.userData.lastName;
                    $rootScope.userId = statusResponse.userData.userId;
                    $rootScope.strongPassword = statusResponse.userData.strongPassword;
                    $rootScope.allowDeviceTier = statusResponse.userData.allowDeviceTier;
                    $rootScope.allowManualChangeOver = statusResponse.userData.allowManualChangeOver;
                    $rootScope.menu = statusResponse.menu;
                    if (angular.isDefined(statusResponse.userData.settings)) {
                        try {
                            $rootScope.settings = angular.fromJson(statusResponse.userData.settings);
                        } catch (e) {
                            $rootScope.settings = {};
                        }
                    } else {
                        $rootScope.settings = {};
                    }

                    //not sure I want to load the language every time.
                    $translate.use(lang);
                    $rootScope.startRunningJobsWatch();

                    // subscribe to the alert channel for the company and user



                    $window.Intercom('update');

                    // and listen for alert events
                    $rootScope.onMessage = $rootScope.$on(
                        Pubnub.getMessageEventNameFor(alertChannel),
                        function (ngEvent, envelope) {
                            $rootScope.$emit('alertNotification', envelope.message);
                        });
                } else {

                    // not logged in, unsubscribe from the alerts


                    $rootScope.loggedIn = false;
                    $rootScope.language = 'en';
                    $rootScope.entitlement = [];
                    $state.go('login');
                }
                //else show error message
            }).catch(function (error) {
                if (error.status == 401 || error.status == 400) {

                    $rootScope.loggedIn = false;
                    $rootScope.language = 'en';
                    $state.go('login');
                }
            });
        });
    }]);

angular.module('openStashApp').factory('errorHandler', [
    '$rootScope', '$interval', '$state',
    function($rootScope, $interval, $state) {

        var errorHandler = {


            /**
             * Examine error parameter and return the appropriate message, if any. If
             * it's a session error, return undefined and navigate to the login page.
             * @param {*} error
             * @return {String}
             */
            handle: function(error) {
                var message;

                if (_.isObject(error)) {

                    if (angular.isDefined(error.xhr)) {
                        error.status = error.xhr.status;
                    }

                    //We don't want to log them out if there is an error, this was logging them out if they got a 401.
                    if (error.status == 999) {
                        $rootScope.loggedIn = false;
                        $rootScope.language = 'en';
                        $rootScope.entitlement = [];
                        $state.go('login');
                    } else {

                        if (error.xhr) {
                            if (error.xhr.responseJSON) {
                                message = error.xhr.responseJSON.message;
                            } else if (error.xhr.statusText) {
                                switch (error.xhr.statusText) {
                                    case 'timeout':
                                        message = 'Server Timeout';
                                        break;
                                    default:
                                        message = 'Server Connection Error: ' + error.xhr.statusText;
                                        break;
                                }
                            } else {
                                message = 'System Error';
                            }
                        } else {
                            if (error.data) {
                                message = error.data.message;
                            } else if (error.message) {
                                message = error.message;
                            } else {
                                message = 'System Error';
                            }
                        }
                    }
                } else {
                    message = error;
                }

                return message;
            }
        };

        return errorHandler;
    }]);

angular.module('openStashApp').factory('messages', [
    'errorHandler',
    function(errorHandler) {


        var messages = {

            /**
             * Handle and display the error notification, as appropriate.
             * @param {*} error
             */
            error: function (error) {

                // 1st, handle the error and get the message
                var message = errorHandler.handle(error);

                // then, display the error message
                if (message) {
                    getNotification().error(message);
                }
            },

            /**
             * Display a warning notification.
             * @param {String} msg
             */
            warning: function (msg) {
                getNotification().warning(msg);
            },

            /**
             * Display a success notification.
             * @param {String} msg
             */
            success: function (msg) {
                getNotification().success(msg);
            },

            /**
             * Display an info notification.
             * @param {String} msg
             */
            info: function (msg) {
                getNotification().info(msg);
            }
        };

        return messages;
    }]);







angular.module('openStashApp').config(['$compileProvider', function ($compileProvider) {
    $compileProvider.debugInfoEnabled(true);
}]);


