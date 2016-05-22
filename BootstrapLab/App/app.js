(function () {
    "use strict";

    angular.module('bootstrapLab', ['ui.router', 'ngAnimate', 'ui.bootstrap', 'ui.bootstrap.datetimepicker', 'mgcrea.ngStrap', 'ae-datetimepicker', 'ui.validate'])
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
            .state('validationLabTwo', {
                url: '/validationLabTwo',
                templateUrl: 'App/Views/validationLabTwo/validationLabTwo.html'
            })
            .state('validationLabThree', {
                url: '/validationLabThree',
                templateUrl: 'App/Views/validationLabThree/validationLabThree.html'
            })
            .state('validationLabFour', {
                url: '/validationLabFour',
                templateUrl: 'App/Views/validationLabFour/validationLabFour.html'
            })
            .state('validationLabFive', {
                url: '/validationLabFive',
                templateUrl: 'App/Views/validationLabFive/validationLabFive.html'
            })
            .state('bootstrap3Datepicker', {
                url: '/bootstrap3Datepicker',
                templateUrl: 'App/Views/bootstrap3Datepicker/bootstrap3Datepicker.html'
            })
            .state('dalelottsDateTimePicker', {
                url: '/dalelottsDateTimePicker',
                templateUrl: 'App/Views/dalelottsDateTimePicker/dalelottsDateTimePicker.html'
            })
            .state('angularStrapDateTimeForm', {
                url: '/angularStrapDateTimeForm',
                templateUrl: 'App/Views/angularStrapDateTimeForm/angularStrapDateTimeForm.html'
            })
            .state('uiBootstrapDateTimeForm', {
                url: '/uiBootstrapDateTimeForm',
                templateUrl: 'App/Views/uiBootstrapDateTimeForm/uiBootstrapDateTimeForm.html'
            })
            .state('directiveTest', {
                url: '/directiveTest',
                templateUrl: 'App/Views/directiveTest/directiveTest.html'
            })
            .state('uibTooltip', {
                url: '/uibTooltip',
                templateUrl: 'App/Views/uibTooltip/uibTooltip.html'
            });

    };

})();