(function () {
    'use strict';

    angular.module('bootstrapLab')
        .controller('validationLabOneController', ['$scope', validationLabOneController]);

    function validationLabOneController($scope) {
        var vm = this;

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

        $scope.userNameHasValidationError = function (form) {
            if (form) {
                var control = form.uName;
                return canValidate(form, control) && control.$error.required;
            }
            return false;
        }

        $scope.userNameValidationMessage = function (form) {
            if (form) {
                if (form.uName.$error.required) {
                    return 'Name is required';
                }
            }
        }

        $scope.emailHasValidationError = function (form) {
            if (form) {
                var control = form.uEmail;
                return canValidate(form, control) && (control.$error.required || control.$error.email);
            }
            return false;
        }

        $scope.emailValidationMessage = function (form) {
            if (form) {
                var control = form.uEmail;
                if (control.$error.required) {
                    return 'Email is required';
                }
                if (control.$error.email) {
                    return 'This is not a valid email';
                }
            }
        }

        $scope.userAgreeHasValidationError = function (form, user) {
            if (form) {
                return form.$submitted && !user.agree;
                //return (canValidate(form, form.userAgree) || canValidate(form, form.agreeSign)) &&
                //    (!user.agree || !user.agreeSign);
            }
            return false;
        }

        $scope.userAgreeValidationMessage = function (user) {
            if (user) {
                if (!user.agree || !user.agreeSign) {
                    return 'Please agree and sign';
                }
            }
        }

        $scope.agreeSignHasValidationError = function (form, user) {
            if (form) {
                var control = form.agreeSign;
                return canValidate(form, control) && user.agree && control.$error.required;
            }
            return false;
        }

        $scope.agreeSignValidationMessage = function (user) {
            if (user) {
                if (!user.agree || !user.agreeSign) {
                    return 'Please agree and sign';
                }
            }
        }

        function canValidate(form, control) {
            return form.$submitted || control.$touched
        }

        $scope.reset();
    }
})();