(function () {
    'use strict';

    angular.module('bootstrapLab')
        .directive('blink', ['$interval', blink]);

    function blink($interval) {
        return {
            restrict: 'E',
            transclude: true,
            link: function (scope, element, attrs) {
                $interval(
                    function () {
                        var visibilityState = element.css('visibility') === 'hidden' ? 'visible' : 'hidden';
                        element.css('visibility', visibilityState);
                    }, 500);
            },
            template: '<span ng-transclude></span>'
        }
    };
})();
