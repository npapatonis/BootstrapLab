(function () {
    'use strict';

    angular.module('bootstrapLab')
        .directive('tksDateInput', ['$timeout', tksFocus]);

    function tksFocus($timeout) {
        return {
            restrict: 'E',
            priority: 1,
            /*
            updateOn: 'blur' required unmerged fix to bsDatapicker found here
            https://github.com/mgcrea/angular-strap/issues/1668
            */
            template: '<span class="input-group"> ' +
                '<input type="text" ' +
                'id="{{id}}" ' +
                'name="{{name}}" ' +
                'class="form-control" ' +
                'ng-model="model" ' +
                'ng-model-options="{ updateOn: \'blur\', allowInvalid: true }" ' +
                'ng-focus="handleInputFocus()" ' +
                'ng-blur="handleInputBlur()" ' +
                'bs-datepicker ' +
                'bs-show="showDatePicker" ' +
                'data-date-format={{format}} ' +
                'data-min-date="{{minDate}}" ' +
                'data-max-date="{{maxDate}}" ' +
                'data-trigger="manual" ' +
                'data-autoclose="1" ' +
                'required> ' +
                '<span class="input-group-addon" ' +
                'ng-mousedown="handleButtonMouseDown()" ' +
                'ng-click="handleButtonClick()"> ' +
                '<span class="glyphicon glyphicon-calendar"> ' +
                '</span> ' +
                '</span> ' +
                '</span>',
            scope: {
                id: "@tksId",
                name: "@tksName",
                model: "=",
                format: "@",
                minDate: "@",
                maxDate: "@",
                options: "=datepickerOptions"
            },
            link: function (scope, element, attrs) {
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

                //var isDatePickerVisible = function () {
                //    var visible = false;
                //    var datepickerElement = element.find(".datepicker")[0];
                //    if (datepickerElement) {
                //        visible = datepickerElement.currentStyle.visibility === 'visible';
                //    }
                //    return visible;
                //};
            }
        }
    };
})();
