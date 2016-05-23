(function () {
    'use strict';

    angular.module('bootstrapLab')
        .directive('tksInput', ['$compile', tksInput]);

    function tksInput_v_04($compile) {
        return {
            restrict: 'A',
            priority: 1,
            terminal: true,
            require: 'ngModel',
            compile: function (element) {

                function setAttribute(name, value) {
                    var oldValue = element.attr(name);
                    if (!angular.isDefined(oldValue) || oldValue === false) {
                        element.attr(name, value);
                    }
                }

                var wrapper = angular.element(
                    '<div class="wrapper">' +
                    'This input is wrappered' +
                    '</div>');

                //setAttribute('ng-pattern', 'regex');

                element.addClass('form-control');
                element.removeAttr('tks-input');

                element.after(wrapper);
                wrapper.prepend(element);

                return function (scope, element) {
                    scope.$on("$destroy", function () {
                        wrapper.after(element);
                        wrapper.remove();
                    });

                    $compile(element)(scope);
                }
            }
        }
    };

    function tksInput_v_03($compile) {
        return {
            restrict: 'A',
            //priority: 1,
            //terminal: true,
            require: 'ngModel',
            template: function (element, attrs) {
                var x = 1;
                var template =
                    '<span class="input-group"> ' +
                    '<input type="text" ' +
                    'id="' + attrs.id + '" ' +
                    'name="' + attrs.name + '" ' +
                    'class="form-control" ' +
                    'ng-model="model" ' +
                    'ng-model-options="{ updateOn: \'blur\', allowInvalid: true }" ' +
                    'ng-focus="handleInputFocus()" ' +
                    'ng-blur="handleInputBlur()" ' +
                    'bs-datepicker ' +
                    'bs-show="showDatePicker" ' +
                    'data-date-format="' + attrs.format + '" ' +
                    'data-min-date="' + attrs.minDate + '" ' +
                    'data-max-date="' + attrs.maxDate + '" ' +
                    'data-trigger="manual" ' +
                    'data-autoclose="1" ' +
                    'required> ' +
                    '<span class="input-group-addon" ' +
                    'ng-mousedown="handleButtonMouseDown()" ' +
                    'ng-click="handleButtonClick()"> ' +
                    '<span class="glyphicon glyphicon-calendar"> ' +
                    '</span> ' +
                    '</span> ' +
                    '</span>';

                return template;
            },
            //compile: function (element) {

            //    function setAttribute(name, value) {
            //        var oldValue = element.attr(name);
            //        if (!angular.isDefined(oldValue) || oldValue === false) {
            //            element.attr(name, value);
            //        }
            //    }

            //    var wrapper = angular.element(
            //        '<div class="wrapper">' +
            //        'This input is wrappered' +
            //        '</div>');

            //    element.addClass('form-control');
            //    element.removeAttr('tks-input');

            //    //setAttribute('ng-pattern', 'regex');
            //    setAttribute('bs-datepicker', '');
            //    setAttribute('data-date-format', '{{dateFormat}}');
            //    setAttribute('data-min-date', '{{minDate}}');
            //    setAttribute('data-max-date', '{{maxDate}}');
            //    setAttribute('data-autoclose', '1');

            //    element.after(wrapper);
            //    wrapper.prepend(element);

            //    return function (scope, element) {
            //        scope.$on("$destroy", function () {
            //            wrapper.after(element);
            //            wrapper.remove();
            //        });

            //        $compile(element)(scope);
            //    }
            //},
        }
    };

    function tksInput_v_02($compile) {
        return {
            restrict: 'A',
            transclude: true,
            scope: {},
            require: 'ngModel',
            template: '<div class="wrapper" ng-transclude>' +
                'This input is wrappered' +
                '</div>'
        }
    };

    function tksInput($compile) {
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
                    '<span class="input-group-addon" ' +
                    'ng-mousedown="' + 'handleButtonMouseDown()" ' +
                    'ng-click="' + 'handleButtonClick()"> ' +
                    '<span class="glyphicon glyphicon-calendar"> ' +
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
                angular.forEach(['tks-input', 'tks-date-format', 'tks-min-date', 'tks-max-date'], function (attr) {
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
