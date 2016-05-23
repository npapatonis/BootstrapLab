(function () {
    'use strict';

    angular.module('bootstrapLab')
        .controller('directiveTestController', ['$scope', 'dateService', directiveTestController]);

    function directiveTestController($scope, dateService) {
        $scope.minDate = new Date();
        $scope.dateFormat = 'M-d-yyyy';
        $scope.showInput = true;

        var now = new Date();
        $scope.dateRange = {
            fromDate: dateService.addDays(dateService.getDatePart(now), -1),
            toDate: dateService.getDatePart(now),
        };

        $scope.isValidDateRange = function () {
            if (!$scope.dateRange.fromDate || !$scope.dateRange.toDate) {
                return true;
            }

            return $scope.dateRange.fromDate < $scope.dateRange.toDate;
        };
    }
})();