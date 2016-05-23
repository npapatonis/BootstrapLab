(function () {
    'use strict';

    angular.module('bootstrapLab')
        .directive('tksDateInput', ['$compile', tksDateInput]);

    function tksDateInput($compile) {
        return {
            restrict: 'A',
            priority: 1,
            terminal: true,
            require: 'ngModel',
            scope: true,
            compile: function (element, attrs) {

                function setAttribute(name, value, elem) {
                    elem = elem ? elem : element;
                    if (!elem.attr(name)) {
                        elem.attr(name, value);
                    }
                }

                var wrapper = angular.element('<span class="input-group"> ' +
                    '<span class="btn btn-default input-group-addon" ' +
                    'ng-mousedown="' + 'handleButtonMouseDown()" ' +
                    'ng-click="' + 'handleButtonClick()"> ' +
                    '<span class="fa fa-calendar"> ' +
                    '</span> ' +
                    '</span> ' +
                    '</span>');

                element.addClass('form-control');

                // Transfer certain directives to outer span
                angular.forEach([{ normal: 'ngIf', attr: 'ng-if' }, { normal: 'ngShow', attr: 'ng-show' }, { normal: 'ngHide', attr: 'ng-hide' }], function (attr) {
                    if (angular.isDefined(attrs[attr.normal])) {
                        setAttribute(attr.attr, attrs[attr.normal], wrapper);
                        element.removeAttr(attr.attr);
                    }
                });

                /*
                updateOn: 'blur' required unmerged fix to bsDatapicker found here
                https://github.com/mgcrea/angular-strap/issues/1668
                */

                // Set focus and model update attributes
                setAttribute('ng-model-options', '{ updateOn: \'blur\', allowInvalid: true }');
                setAttribute('ng-focus', 'handleInputFocus()');
                setAttribute('ng-blur', 'handleInputBlur()');

                // Set angular strap datepicker attributes
                setAttribute('bs-datepicker', '');
                setAttribute('bs-show', 'showDatePicker');
                setAttribute('data-date-format', attrs.tksDateFormat ? attrs.tksDateFormat : 'yy-MM-dd');
                setAttribute('data-trigger', 'manual');
                setAttribute('data-autoclose', '1');
                if (attrs.tksMinDate) {
                    setAttribute('data-min-date', attrs.tksMinDate);
                }
                if (attrs.tksMaxDate) {
                    setAttribute('data-max-date', attrs.tksMaxDate);
                }

                // Remove tks attributes
                angular.forEach(['tks-date-input', 'tks-date-format', 'tks-min-date', 'tks-max-date'], function (attr) {
                    element.removeAttr(attr);
                });

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
                        scope.showDatePicker = !scope.showDatePicker;
                        var inputElement = element.find("#" + attrs.name)[0];
                        inputElement.focus()
                    };

                    scope.handleButtonMouseDown = function () {
                        console.log("button mouse down");
                        focusedClick = true;
                    };
                }
            }
        }
    };
})();
