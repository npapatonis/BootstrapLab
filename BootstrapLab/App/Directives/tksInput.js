(function () {
    'use strict';

    angular.module('bootstrapLab')
        .directive('tksInput', ['$compile', tksInput]);

    function tksInput($compile) {
        return {
            restrict: 'A',
            priority: 1,
            terminal: true,
            require: 'ngModel',
            compile: function (element) {

                function setAttributeIfNotExists(name, value) {
                    var oldValue = element.attr(name);
                    if (!angular.isDefined(oldValue) || oldValue === false) {
                        element.attr(name, value);
                    }
                }

                var wrapper = angular.element(
                    '<div class="wrapper">' +
                    'This input is wrappered' +
                    '</div>');

                element.addClass('form-control');
                element.removeAttr('tks-input');

                //setAttributeIfNotExists('ng-pattern', 'regex');
                setAttributeIfNotExists('bs-datepicker', '');
                setAttributeIfNotExists('data-date-format', '{{dateFormat}}');
                setAttributeIfNotExists('data-min-date', '{{minDate}}');
                setAttributeIfNotExists('data-max-date', '{{maxDate}}');
                setAttributeIfNotExists('data-autoclose', '1');

                element.after(wrapper);
                wrapper.prepend(element);

                return function (scope, element) {
                    scope.$on("$destroy", function () {
                        wrapper.after(element);
                        wrapper.remove();
                    });

                    $compile(element)(scope);
                }

            },
        }
    };
})();
