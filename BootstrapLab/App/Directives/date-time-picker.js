(function () {
    'use strict';

    var module = angular.module('dtp-Directive', []);

    module.directive('dateTimePicker', function () {
        return {
            restrict: 'E',
            require: ['ngModel'],
            scope: {
                ngModel: '='
            },
            replace: true,
            template:
                '<div class="form-group">' +
                    '<div class="input-group">' +
                        '<input type="text" id="formLeadDate" class="form-control" ngModel>' +
                        '<span class="input-group-addon"><i class="icon-calendar"></i></span>' +
                    '</div>' +
                '</div>',
            link: function (scope, element, attrs) {
                var input = element.find('input');
                input.datetimepicker({
                    format: "yyyy/mm/dd hh:ii",
                    showMeridian: false,
                    autoclose: true,
                    todayBtn: true,
                    todayHighlight: true,
                    endDate: new Date()
                });

                input.bind('blur keyup change', function () {
                    scope.ngModel = input.val();
                    scope.$apply();
                    console.info('date-time-picker event', input.val(), scope.ngModel);
                });
            }
        }
    });
})();
