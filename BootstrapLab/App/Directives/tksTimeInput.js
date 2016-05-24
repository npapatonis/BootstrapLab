(function () {
    'use strict';

    angular.module('bootstrapLab')
        .directive('tksTimeInput', ['$compile', 'tksDirectives', tksTimeInput]);

    function tksTimeInput($compile, tksDirectives) {
        return {
            restrict: 'A',
            priority: 1,
            terminal: true,
            require: 'ngModel',
            scope: true,
            compile: function (element, attrs) {

                var wrapper = angular.element('<span class="input-group"> ' +
                    '<span class="btn btn-default input-group-addon" ' +
                    'ng-mousedown="' + 'handleButtonMouseDown()" ' +
                    'ng-click="' + 'handleButtonClick()"> ' +
                    '<span class="fa fa-clock-o"> ' +
                    '</span> ' +
                    '</span> ' +
                    '</span>');

                tksDirectives.transferNgDirectives(attrs, element, wrapper);

                /*
                updateOn: 'blur' required unmerged fix to bsDatapicker found here
                https://github.com/mgcrea/angular-strap/issues/1668
                */

                // Set focus and model update attributes
                tksDirectives.setAttribute('ng-model-options', '{ updateOn: \'blur\', allowInvalid: true }', element);
                tksDirectives.setAttribute('ng-focus', 'handleInputFocus()', element);
                tksDirectives.setAttribute('ng-blur', 'handleInputBlur()', element);

                // Set angular strap timepicker attributes
                tksDirectives.setAttribute('bs-timepicker', '', element);
                tksDirectives.setAttribute('bs-show', 'showTimePicker', element);
                tksDirectives.setAttribute('data-time-format', attrs.tksTimeFormat ? attrs.tksTimeFormat : 'HH:mm', element);
                tksDirectives.setAttribute('data-minute-step', attrs.tksMinuteStep ? attrs.tksMinuteStep : '1', element);
                tksDirectives.setAttribute('data-trigger', 'manual', element);
                tksDirectives.setAttribute('data-autoclose', '1', element);

                // Remove tks attributes
                tksDirectives.removeTksAttributes(element, ['tks-time-input', 'tks-time-format', 'tks-minute-step']);

                element.addClass('form-control');

                element.after(wrapper);
                wrapper.prepend(element);

                return function (scope, element, attrs) {
                    scope.$on("$destroy", function () {
                        wrapper.after(element);
                        wrapper.remove();
                    });

                    $compile(element)(scope);

                    var inputFocused = false;
                    var focusedClick = false;
                    scope.showTimePicker = false;

                    scope.handleInputFocus = function () {
                        inputFocused = true;
                        focusedClick = false;
                    };

                    scope.handleInputBlur = function (event) {
                        inputFocused = false;
                        if (!focusedClick) {
                            scope.showTimePicker = false;
                        }
                    };

                    scope.handleButtonClick = function () {
                        scope.showTimePicker = !scope.showTimePicker;
                        var inputElement = element.find("#" + attrs.name)[0];
                        inputElement.focus()
                    };

                    scope.handleButtonMouseDown = function () {
                        focusedClick = true;
                    };
                }
            }
        }
    };
})();
