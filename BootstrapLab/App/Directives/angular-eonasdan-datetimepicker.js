(function () {
    'use strict';

    var module = angular.module('ae-datetimepicker', []);

    module.directive('datetimepicker', [
        '$timeout',
        function ($timeout) {
            return {
                require: '?ngModel',
                restrict: 'EA',
                scope: {
                    options: '@',
                    onChange: '&',
                    onClick: '&'
                },
                link: function ($scope, $element, $attrs, controller) {
                    $element.on('dp.change', function () {
                        $timeout(function () {
                            var dtp = $element.data('DateTimePicker');
                            controller.$setViewValue(dtp.date());
                            $scope.onChange();
                        });
                    });

                    $element.on('click', function () {
                        $scope.onClick();
                    });

                    $element.on('blur', function () {
                        var viewVal = controller.$viewValue;
                        var modelVal = controller.$modelValue;
                    });

                    controller.$render = function () {
                        if (!!controller) {
                            if (controller.$viewValue === undefined) {
                                controller.$viewValue = null;
                            }
                            else if (!(controller.$viewValue instanceof moment)) {
                                controller.$viewValue = moment(controller.$viewValue);
                            }
                            $element.data('DateTimePicker').date(controller.$viewValue);
                        }
                    };


                    $element.datetimepicker($scope.$eval($attrs.options));
                }
            };
        }
    ]);
})();
