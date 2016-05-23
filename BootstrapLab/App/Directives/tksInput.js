(function () {
    'use strict';

    angular.module('bootstrapLab')
        .directive('tksInput', ['$compile', tksInput]);

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

            //    function setAttributeIfNotExists(name, value) {
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

            //    //setAttributeIfNotExists('ng-pattern', 'regex');
            //    setAttributeIfNotExists('bs-datepicker', '');
            //    setAttributeIfNotExists('data-date-format', '{{dateFormat}}');
            //    setAttributeIfNotExists('data-min-date', '{{minDate}}');
            //    setAttributeIfNotExists('data-max-date', '{{maxDate}}');
            //    setAttributeIfNotExists('data-autoclose', '1');

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

                function setAttributeIfNotExists(name, value) {
                    var oldValue = element.attr(name);
                    if (!angular.isDefined(oldValue) || oldValue === false) {
                        element.attr(name, value);
                    }
                }

                //var wrapper = angular.element(
                //    '<div class="wrapper">' +
                //    'This input is wrappered' +
                //    '</div>');

                var wrapper = angular.element('<span class="input-group"> ' +
                    '<span class="input-group-addon" ' +
                    'ng-mousedown="' + 'handleButtonMouseDown()" ' +
                    'ng-click="' + 'handleButtonClick()"> ' +
                    '<span class="glyphicon glyphicon-calendar"> ' +
                    '</span> ' +
                    '</span> ' +
                    '</span>');

                element.addClass('form-control');

                //setAttributeIfNotExists('ng-pattern', 'regex');

                setAttributeIfNotExists('ng-model-options', '{ updateOn: \'blur\', allowInvalid: true }');
                setAttributeIfNotExists('ng-focus', 'handleInputFocus()');
                setAttributeIfNotExists('ng-blur', 'handleInputBlur()');

                setAttributeIfNotExists('bs-datepicker', '');
                setAttributeIfNotExists('bs-show', 'showDatePicker');
                setAttributeIfNotExists('data-date-format', attrs.tksDateFormat ? attrs.tksDateFormat : 'yy-MM-dd');
                if (attrs.tksMinDate) {
                    setAttributeIfNotExists('data-min-date', attrs.tksMinDate);
                }
                if (attrs.tksMaxDate) {
                    setAttributeIfNotExists('data-max-date', attrs.tksMaxDate);
                }
                setAttributeIfNotExists('data-trigger', 'manual');
                setAttributeIfNotExists('data-autoclose', '1');

                element.removeAttr('tks-input');
                element.removeAttr('tks-date-format');
                element.removeAttr('tks-min-date');
                element.removeAttr('tks-max-date');

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
                        scope.showDatePicker = !scope.showDatePicker; // !isDatePickerVisible();
                        var inputElement = element.find("#" + attrs.name)[0];
                        inputElement.focus()
                    };

                    scope.handleButtonMouseDown = function () {
                        console.log("button mouse down");
                        focusedClick = true;
                    };
                }
            },
            //controller: function (scope) {
            //    var inputFocused = false;
            //    var focusedClick = false;
            //    scope.showDatePicker = false;

            //    scope.handleInputFocus = function () {
            //        console.log("input focus");
            //        inputFocused = true;
            //        focusedClick = false;
            //    };

            //    scope.handleInputBlur = function (event) {
            //        console.log("input blur");
            //        inputFocused = false;
            //        if (!focusedClick) {
            //            scope.showDatePicker = false;
            //        }
            //    };

            //    scope.handleButtonClick = function () {
            //        scope.showDatePicker = !scope.showDatePicker; // !isDatePickerVisible();
            //        var inputElement = element.find("#" + scope.name)[0];
            //        inputElement.focus()
            //    };

            //    scope.handleButtonMouseDown = function () {
            //        console.log("button mouse down");
            //        focusedClick = true;
            //    };
            //}
        }
    };
})();
