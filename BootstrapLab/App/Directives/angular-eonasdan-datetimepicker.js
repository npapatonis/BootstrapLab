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

                    var updateOnBlur = false;
                    if ($attrs.ngModelOptions) {
                        var modelOptions = $scope.$eval($attrs.ngModelOptions);
                        if (modelOptions.updateOn) {
                            if (modelOptions.updateOn === 'blur') {
                                updateOnBlur = true;
                            }
                        }
                    }
                    console.log("updateOnBlur = " + updateOnBlur);

                    $element.on('dp.change', function () {
                        console.log("on dp.change 1");
                        $timeout(function () {
                            console.log("on dp.change 2");
                            if (!updateOnBlur) {
                                console.log("on dp.change 3");
                                var dtp = $element.data('DateTimePicker');
                                controller.$setViewValue(dtp.date());
                            }
                            console.log("on dp.change 4");
                            $scope.onChange();
                            console.log("on dp.change 5");
                        });
                    });

                    $element.on('click', function () {
                        $scope.onClick();
                    });

                    $element.on('focusout', function () {
                        console.log("on focusout 1");
                        if (updateOnBlur) {
                            console.log("on focusout 2");
                            $timeout(function () {
                                console.log("on focusout 3");
                                var dtp = $element.data('DateTimePicker');
                                controller.$setViewValue(dtp.date());
                            });
                        }
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
