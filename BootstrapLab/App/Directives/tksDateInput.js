(function () {
    'use strict';

    angular.module('bootstrapLab')
        .directive('tksDateInput', ['$timeout', tksFocus]);

    function tksFocus($timeout) {
        return {
            restrict: 'E',
            priority: 1,
            template: '<span class="input-group"> ' +
                '<input type="text" ' +
                'id="{{id}}" ' +
                'name="{{name}}" ' +
                'class="form-control" ' +
                'ng-model="model" ' +
                'ng-model-options="{ updateOn: \'blur\', allowInvalid: true }" ' +
                'ng-blur="handleInputBlur()" ' +
                'bs-datepicker ' +
                'bs-show="showDatePicker" ' +
                'data-date-format={{format}} ' +
                'data-min-date="{{minDate}}" ' +
                'data-trigger="manual" ' +
                'data-autoclose="1" ' +
                'required> ' +
                '<span class="input-group-addon" ' +
                //'ng-click="handleButtonClick()"> ' +
                'ng-mousedown="handleMouseDown()"> ' +
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
                options: "=datepickerOptions"
            },
            link: function (scope, element, attrs) {
                scope.showDatePicker = false;

                scope.handleInputBlur = function () {
                    console.log("input blur");
                    scope.showDatePicker = false;
                };

                scope.handleButtonClick = function () {
                    scope.showDatePicker = !isDatePickerVisible();

                    var inputElement = element.find("#" + scope.name)[0];
                    inputElement.focus()
                };

                scope.handleMouseDown = function () {
                    console.log("button mouse down");
                };

                var isDatePickerVisible = function() {
                    var visible = false;
                    var datepickerElement = element.find(".datepicker")[0];
                    if (datepickerElement) {
                        visible = datepickerElement.currentStyle.visibility === 'visible';
                    }
                    return visible;
                };
            }
        }
    };
})();
