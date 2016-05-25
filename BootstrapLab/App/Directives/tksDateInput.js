(function () {
    'use strict';

    angular.module('bootstrapLab')
        .directive('tksDateInput', ['$compile', 'tksDirectives', tksDateInput]);

    function tksDateInput($compile, tksDirectives) {
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
                    '<span class="fa fa-calendar"> ' +
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

                // Set angular strap datepicker attributes
                tksDirectives.setAttribute('bs-datepicker', '', element);
                tksDirectives.setAttribute('bs-show', 'showDatePicker', element);
                tksDirectives.setAttribute('data-date-format', attrs.tksDateFormat ? attrs.tksDateFormat : 'yy-MM-dd', element);
                tksDirectives.setAttribute('data-trigger', 'manual', element);
                tksDirectives.setAttribute('data-autoclose', '1', element);
                if (attrs.tksMinDate) {
                    tksDirectives.setAttribute('data-min-date', attrs.tksMinDate, element);
                }
                if (attrs.tksMaxDate) {
                    tksDirectives.setAttribute('data-max-date', attrs.tksMaxDate, element);
                }

                // Remove tks attributes
                tksDirectives.removeTksAttributes(element, ['tks-date-input', 'tks-date-format', 'tks-min-date', 'tks-max-date']);

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
                    scope.showDatePicker = false;

                    scope.handleInputFocus = function () {
                        inputFocused = true;
                        focusedClick = false;
                    };

                    scope.handleInputBlur = function (event) {
                        inputFocused = false;
                        if (!focusedClick) {
                            scope.showDatePicker = false;
                        }
                    };

                    scope.handleButtonClick = function () {
                        scope.showDatePicker = !scope.showDatePicker;
                        var inputElement = element.find("#" + attrs.name)[0];
                        inputElement.focus()
                    };

                    scope.handleButtonMouseDown = function () {
                        focusedClick = true;
                    };

                    scope.$on('tooltip.hide', function (event, args) {
                        if (args.$id === attrs.id) {
                            scope.showDatePicker = false;
                        }
                    })
                }
            }
        }
    };
})();
