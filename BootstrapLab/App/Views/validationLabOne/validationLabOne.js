(function () {
    'use strict';

    angular.module('bootstrapLab')
        .controller('validationLabOneController', ['$scope', validationLabOneController]);

    function validationLabOneController($scope) {
        var vm = this;

        $scope.inputModel = 'Nick';

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