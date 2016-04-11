(function () {
    "use strict";

    angular.module('bootstrapLab', ['ui.router', 'ngAnimate', 'ui.bootstrap', 'mgcrea.ngStrap'])
        .config(config);

    function config($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/home');

        $stateProvider
            .state('home', {
                url: '/home',
                template: 'Select a menu item.'
            })
            .state('validationLabOne', {
                url: '/validationLabOne',
                templateUrl: 'App/Views/validationLabOne/validationLabOne.html'
            })
            .state('angularStrapDateTimeForm', {
                url: '/angularStrapDateTimeForm',
                templateUrl: 'App/Views/angularStrapDateTimeForm/angularStrapDateTimeForm.html'
            })
            .state('uiBootstrapDateTimeForm', {
                url: '/uiBootstrapDateTimeForm',
                templateUrl: 'App/Views/uiBootstrapDateTimeForm/uiBootstrapDateTimeForm.html'
            });

    };

})();