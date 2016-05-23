(function () {
    'use strict';

    angular.module('bootstrapLab')
        .controller('validationLabFourController', ['$scope', 'dateService', validationLabFourController]);

    function validationLabFourController($scope, dateService) {
        var vm = this;

        var now = new Date();
        $scope.daterange = {
            fromDate: dateService.addDays(dateService.getDatePart(now), -1),
            fromTime: dateService.getTimePart(now, 'm'),
            toDate: dateService.getDatePart(now),
            toTime: dateService.getTimePart(now, 'm')
        };

        $scope.isValidDateRange = function () {
            if (!$scope.daterange.fromDate || !$scope.daterange.fromTime || !$scope.daterange.toDate || !$scope.daterange.toTime) {
                return true;
            }

            var fromDateTime = dateService.combineDateAndTime($scope.daterange.fromDate, $scope.daterange.fromTime);
            var toDateTime = dateService.combineDateAndTime($scope.daterange.toDate, $scope.daterange.toTime);

            return fromDateTime < toDateTime;
        };

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

        // To time control
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