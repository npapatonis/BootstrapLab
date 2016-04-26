﻿(function () {
    'use strict';

    angular.module('bootstrapLab')
        .controller('validationLabFiveController', ['$scope', 'dateService', validationLabFiveController]);

    function validationLabFiveController($scope, dateService) {
        var vm = this;

        var now = new Date();
        $scope.daterange = {
            fromDateTime: dateService.addDays(now, -1),
            toDateTime: now,
        };

        //$scope.isValidDateRange = function (fromDate, fromTime, toDate, toTime) {
        //    var fromDateTime = dateService.combineDateAndTime(fromDate, fromTime);
        //    var toDateTime = dateService.combineDateAndTime(toDate, toTime);
        //    return fromDateTime < toDateTime;
        //};

        //$scope.$watch('daterange.fromDate', function (newValue, oldValue) {
        //    $scope.daterange.fromDateTime = dateService.combineDateAndTime($scope.daterange.fromDate, $scope.daterange.fromTime);
        //});

        //$scope.$watch('daterange.fromTime', function (newValue, oldValue) {
        //    $scope.daterange.fromDateTime = dateService.combineDateAndTime($scope.daterange.fromDate, $scope.daterange.fromTime);
        //});

        //$scope.$watch('daterange.toDate', function (newValue, oldValue) {
        //    $scope.daterange.toDateTime = dateService.combineDateAndTime($scope.daterange.toDate, $scope.daterange.toTime);
        //});

        //$scope.$watch('daterange.toTime', function (newValue, oldValue) {
        //    $scope.daterange.toDateTime = dateService.combineDateAndTime($scope.daterange.toDate, $scope.daterange.toTime);
        //});

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