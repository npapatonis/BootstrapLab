(function () {
    'use strict';

    angular.module('bootstrapLab')
        .controller('validationLabFourController', ['$scope', validationLabFourController]);

    function validationLabFourController($scope) {
        var vm = this;

        $scope.daterange = {
            from: new Date(),
            to: new Date()
        };

        $scope.dateHasFocus = false;
        $scope.showDatepicker = false;
        $scope.handleDatePickerButton = function () {
            if (!$scope.showDatepicker) $scope.showDatepicker = true;
            $scope.dateHasFocus = true;
        }
        $scope.handleDateBlur = function () {
            $scope.showDatepicker = false;
        }

        $scope.timeHasFocus = false;
        $scope.showTimepicker = false;
        $scope.handleTimePickerButton = function () {
            if (!$scope.showTimepicker) $scope.showTimepicker = true;
            $scope.timeHasFocus = true;
        }
        $scope.handleTimeBlur = function () {
            $scope.showTimepicker = false;
        }

        $scope.master = {};

        $scope.update = function (user) {
            $scope.master = angular.copy(user);
        };

        $scope.reset = function (form) {
            if (form) {
                form.$setPristine();
                form.$setUntouched();
            }
            $scope.user = angular.copy($scope.master);
        };

        $scope.reset();
    }
})();