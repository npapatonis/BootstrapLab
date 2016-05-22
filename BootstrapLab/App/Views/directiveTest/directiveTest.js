(function () {
    'use strict';

    angular.module('bootstrapLab')
        .controller('directiveTestController', ['$scope', directiveTestController]);

    function directiveTestController($scope) {
        $scope.regex = '\\d+';
        $scope.dateFormat = 'M-d-yyyy';
        $scope.minDate = new Date();
        $scope.formData = {
            testValue: 'Some Value'
        };
    }
})();