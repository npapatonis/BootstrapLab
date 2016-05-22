(function () {
    'use strict';

    angular.module('bootstrapLab')
        .controller('directiveTestController', ['$scope', directiveTestController]);

    function directiveTestController($scope) {
        $scope.regex = '\\d+';
        $scope.formData = {
            testValue: 'Some Value'
        };
    }
})();