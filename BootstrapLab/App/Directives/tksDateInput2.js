(function () {
    'use strict';

    angular.module('bootstrapLab')
        .directive('tksDateInput', ['$timeout', tksDateInput]);

    function tksDateInput() {
        return {
            /*
            updateOn: 'blur' required unmerged fix to bsDatapicker found here
            https://github.com/mgcrea/angular-strap/issues/1668
            */
            restrict: 'A',
            priority: 1,
            require: '?ngModel',
            scope: {
                format: "@",
                minDate: "@",
                maxDate: "@",
                options: "=datepickerOptions"
            },
            compile: function (element, attrs) {

                function setAttributeIfNotExists(name, value) {
                    var oldValue = element.attr(name);
                    if (!angular.isDefined(oldValue) || oldValue === false) {
                        element.attr(name, value);
                    }
                }

                element.addClass('form-control');
                element.removeAttr('tks-date-input');
                setAttributeIfNotExists('ng-model-options', '{ updateOn: \'blur\', allowInvalid: true }');
                setAttributeIfNotExists('ng-focus', 'handleInputFocus()');
                setAttributeIfNotExists('ng-blur', 'handleInputBlur()');
                setAttributeIfNotExists('bs-datepicker', '');
                setAttributeIfNotExists('bs-show', 'showDatePicker');
                setAttributeIfNotExists('data-date-format', '{{format}}');
                setAttributeIfNotExists('data-min-date', '{{minDate}}');
                setAttributeIfNotExists('data-max-date', '{{maxDate}}');
                setAttributeIfNotExists('data-trigger', 'manual');
                setAttributeIfNotExists('data-autoclose', '1');

                element.replaceWith(
                    '<span class="input-group"> ' +
                    element[0].outerHTML +
                    '<span class="input-group-addon" ' +
                    'ng-mousedown="handleButtonMouseDown()" ' +
                    'ng-click="handleButtonClick()"> ' +
                    '<span class="glyphicon glyphicon-calendar"> ' +
                    '</span> ' +
                    '</span> ' +
                    '</span>');
            },
            controller: function (scope) {
                var inputFocused = false;
                var focusedClick = false;
                scope.showDatePicker = false;

                scope.handleInputFocus = function () {
                    console.log("input focus");
                    inputFocused = true;
                    focusedClick = false;
                };

                scope.handleInputBlur = function (event) {
                    console.log("input blur");
                    inputFocused = false;
                    if (!focusedClick) {
                        scope.showDatePicker = false;
                    }
                };

                scope.handleButtonClick = function () {
                    scope.showDatePicker = !scope.showDatePicker; // !isDatePickerVisible();
                    var inputElement = element.find("#" + scope.name)[0];
                    inputElement.focus()
                };

                scope.handleButtonMouseDown = function () {
                    console.log("button mouse down");
                    focusedClick = true;
                };
            }
        }
    };
})();
