(function () {
    'use strict';

    angular.module('bootstrapLab')
        .directive('tksDateInput', ['$timeout', tksFocus]);

    function tksFocus($timeout) {
        return {
            restrict: 'E',
            priority: 1,
            replace: true,
            template: '<input type="text" ' +
                'id="{{id}}" ' +
                'name="{{name}}" ' +
                'class="form-control" ' +
                'ng-model="model" ' +
                'ng-model-options="{ updateOn: \'blur\', allowInvalid: true }" ' +
                'ng-blur="handleToDateBlur()" ' +
                'bs-datepicker ' +
                'bs-show="showDatePicker" ' +
                'data-date-format={{format}} ' +
                'data-min-date="{{minDate}}" ' +
                'data-trigger="manual" ' +
                'data-autoclose="1" ' +
                'required> ' +
                '<span class="input-group-addon"> ' +
                '<span class="glyphicon glyphicon-calendar" ' +
                'ng-click="showDatePicker = !showDatePicker"> ' +
                '</span> ' +
                '</span>',
            scope: {
                id: "@",
                name: "@",
                model: "=",
                format: "@",
                minDate: "@",
                options: "=datepickerOptions"
            },
            link: function (scope, element, attrs) {
                scope.showDatePicker = false;

                scope.handleToDateBlur = function () {

                };
            }
        }
    };
})();
