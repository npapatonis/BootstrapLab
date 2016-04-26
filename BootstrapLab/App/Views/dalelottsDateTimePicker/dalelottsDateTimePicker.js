(function () {
    'use strict';

    angular.module('bootstrapLab')
        .controller('dalelottsDateTimePickerController', ['$scope', 'dateService', dalelottsDateTimePickerController]);

    function dalelottsDateTimePickerController($scope, dateService) {
        var vm = this;

        var now = new Date();
        $scope.daterange = {
            fromDateTime: dateService.addDays(now, -1),
            toDateTime: now,
        };

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