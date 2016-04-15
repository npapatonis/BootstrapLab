(function () {
    'use strict';

    angular.module('bootstrapLab')
        .directive('tksFocus', ['$timeout', tksFocus]);

    function tksFocus($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.$watch(attrs.tksFocus, function (newValue, oldValue) {
                    if (newValue) { element[0].focus(); }
                });
                element.bind("blur", function (e) {
                    $timeout(function () {
                        scope.$apply(attrs.tksFocus + "=false");
                    }, 0);
                });
                element.bind("focus", function (e) {
                    $timeout(function () {
                        scope.$apply(attrs.tksFocus + "=true");
                    }, 0);
                })
            }
        }
    };
})();
