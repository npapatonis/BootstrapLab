(function () {
    'use strict';

    angular.module('bootstrapLab')
        .directive('tksDateInput', ['$compile', tksDateInput]);

    function tksDateInput($compile) {
        var controllerName = 'vm';
        return {
            /*
            updateOn: 'blur' required unmerged fix to bsDatapicker found here
            https://github.com/mgcrea/angular-strap/issues/1668
            */
            restrict: 'A',
            //priority: 1,
            //terminal: true,
            require: '?ngModel',
            //scope: true,
            //bindToController: true,
            bindToController: {
                format: "@",
                minDate: "@",
                maxDate: "@",
                options: "=datepickerOptions"
            },
            compile: function (element) {
                var wrapper = angular.element('<span class="input-group"> ' +
                    '<span class="input-group-addon" ' +
                    'ng-mousedown="' + controllerName + '.handleButtonMouseDown()" ' +
                    'ng-click="' + controllerName + '.handleButtonClick()"> ' +
                    '<span class="glyphicon glyphicon-calendar"> ' +
                    '</span> ' +
                    '</span> ' +
                    '</span>');

                function setAttributeIfNotExists(name, value) {
                    var oldValue = element.attr(name);
                    if (!angular.isDefined(oldValue) || oldValue === false) {
                        element.attr(name, value);
                    }
                }

                setAttributeIfNotExists('ng-model-options', '{ updateOn: \'blur\', allowInvalid: true }');
                setAttributeIfNotExists('ng-focus', controllerName + '.handleInputFocus()');
                setAttributeIfNotExists('ng-blur', controllerName + '.handleInputBlur()');
                setAttributeIfNotExists('bs-datepicker', '');
                setAttributeIfNotExists('bs-show', controllerName + '.showDatePicker');
                setAttributeIfNotExists('data-date-format', controllerName + '.{{format}}');
                setAttributeIfNotExists('data-min-date', controllerName + '.{{minDate}}');
                setAttributeIfNotExists('data-max-date', controllerName + '.{{maxDate}}');
                setAttributeIfNotExists('data-trigger', 'manual');
                setAttributeIfNotExists('data-autoclose', '1');
                element.addClass('form-control');
                element.removeAttr('tks-date-input');

                element.after(wrapper);
                wrapper.prepend(element);

                return function (scope, elem) {
                    $compile(elem)(scope);
                }

                //scope.$on("$destroy", function () {
                //    wrapper.after(element);
                //    wrapper.remove();
                //});

                //element.replaceWith(
                //    '<span class="input-group"> ' +
                //    element[0].outerHTML +
                //    '<span class="input-group-addon" ' +
                //    'ng-mousedown="handleButtonMouseDown()" ' +
                //    'ng-click="handleButtonClick()"> ' +
                //    '<span class="glyphicon glyphicon-calendar"> ' +
                //    '</span> ' +
                //    '</span> ' +
                //    '</span>');
            },
            controller: function () {
                var vm = this;

                var inputFocused = false;
                var focusedClick = false;
                vm.showDatePicker = false;

                vm.handleInputFocus = function () {
                    console.log("input focus");
                    inputFocused = true;
                    focusedClick = false;
                };

                vm.handleInputBlur = function (event) {
                    console.log("input blur");
                    inputFocused = false;
                    if (!focusedClick) {
                        scope.showDatePicker = false;
                    }
                };

                vm.handleButtonClick = function () {
                    scope.showDatePicker = !scope.showDatePicker; // !isDatePickerVisible();
                    var inputElement = element.find("#" + scope.name)[0];
                    inputElement.focus()
                };

                vm.handleButtonMouseDown = function () {
                    console.log("button mouse down");
                    focusedClick = true;
                };
            },
            controllerAs: controllerName
        }
    };
})();
