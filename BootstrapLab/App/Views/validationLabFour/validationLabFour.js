(function () {
    'use strict';

    angular.module('bootstrapLab')
        .controller('validationLabFourController', ['$scope', validationLabFourController]);

    function validationLabFourController($scope) {
        var vm = this;

        $scope.daterange = {
            fromDate: new Date(),
            fromTime: new Date(),
            toDate: new Date(),
            toTime: new Date()
        };

        // From date control
        $scope.fromDateHasFocus = false;
        $scope.showFromDatePicker = false;
        $scope.handleFromDatePickerButton = function () {
            if (!$scope.showFromDatePicker) $scope.showFromDatePicker = true;
            $scope.fromDateHasFocus = true;
        }
        $scope.handleFromDateBlur = function () {
            $scope.showFromDatePicker = false;
        }

        // From time control
        $scope.fromTimeHasFocus = false;
        $scope.showFromTimePicker = false;
        $scope.handleFromTimePickerButton = function () {
            if (!$scope.showFromTimePicker) $scope.showFromTimePicker = true;
            $scope.fromTimeHasFocus = true;
        }
        $scope.handleFromTimeBlur = function () {
            $scope.showFromTimePicker = false;
        }

        // To date control
        $scope.toDateHasFocus = false;
        $scope.showToDatePicker = false;
        $scope.handleToDatePickerButton = function () {
            if (!$scope.showToDatePicker) $scope.showToDatePicker = true;
            $scope.toDateHasFocus = true;
        }
        $scope.handleToDateBlur = function () {
            $scope.showToDatePicker = false;
        }

        $scope.toTimeHasFocus = false;
        $scope.showToTimePicker = false;
        $scope.handleToTimePickerButton = function () {
            if (!$scope.showToTimePicker) $scope.showToTimePicker = true;
            $scope.toTimeHasFocus = true;
        }
        $scope.handleToTimeBlur = function () {
            $scope.showToTimePicker = false;
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