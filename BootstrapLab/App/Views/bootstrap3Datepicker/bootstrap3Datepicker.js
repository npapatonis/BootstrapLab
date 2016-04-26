(function () {
    'use strict';

    angular.module('bootstrapLab')
        .controller('bootstrap3Datepicker', ['$scope', 'dateService', bootstrap3Datepicker]);

    function bootstrap3Datepicker($scope, dateService) {
        $scope.options = '{format:"DD.MM.YYYY HH:mm"}';

        var now = new Date();
        $scope.daterange = {
            fromDateTime: dateService.addDays(now, -1),
            toDateTime: now,
        };
    }
})();