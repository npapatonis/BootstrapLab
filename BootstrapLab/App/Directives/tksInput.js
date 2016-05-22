(function () {
    'use strict';

    angular.module('bootstrapLab')
        .directive('tksInput', ['$compile', tksInput]);

    function tksInput($compile) {
        return {
            restrict: 'A',
            priority: 1,
            require: 'ngModel',
            compile: function (element) {

                function setAttributeIfNotExists(name, value) {
                    var oldValue = element.attr(name);
                    if (!angular.isDefined(oldValue) || oldValue === false) {
                        element.attr(name, value);
                    }
                }

                setAttributeIfNotExists('ng-pattern', 'regex');

                return function (scope, element) {
                    var wrapper = angular.element(
                        '<div class="wrapper">' +
                        'This input is wrappered' +
                        '</div>');

                    element.addClass('form-control');
                    element.removeAttr('tks-input');

                    element.after(wrapper);
                    wrapper.prepend(element);

                    $compile(element)(scope);

                    scope.$on("$destroy", function () {
                        wrapper.after(element);
                        wrapper.remove();
                    });
                }

            },
            //link: function (scope, element, attrs, ctrl, transclude) {
            //    var wrapper = angular.element(
            //        '<div class="wrapper">' +
            //        'This input is wrappered' +
            //        '</div>');

            //    function setAttributeIfNotExists(name, value) {
            //        var oldValue = element.attr(name);
            //        if (!angular.isDefined(oldValue) || oldValue === false) {
            //            element.attr(name, value);
            //        }
            //    }

            //    setAttributeIfNotExists('ng-pattern', 'regex');
            //    element.addClass('form-control');
            //    element.removeAttr('tks-input');

            //    element.after(wrapper);
            //    wrapper.prepend(element);

            //    scope.$on("$destroy", function () {
            //        wrapper.after(element);
            //        wrapper.remove();
            //    });
            //}
        }
    };
})();
