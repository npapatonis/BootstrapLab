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
                    var changed = false;

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
                        if (!updateOnBlur) {
                            $timeout(function () {
                                var dtp = $element.data('DateTimePicker');
                                var dtpDate = dtp.date();
                                console.log("on dp.change, dtpDate = " + dtpDate.format());
                                controller.$setViewValue(dtpDate);
                                $scope.onChange();
                            });
                        }
                        else {
                            changed = true;
                            console.log("on dp.change, changed = " + changed);
                            $scope.onChange();
                        }
                    });

                    $element.on('click', function () {
                        $scope.onClick();
                    });

                    $element.on('focusin', function () {
                        changed = false;
                        console.log("on focusin, changed = " + changed);
                    });

                    $element.on('focusout', function () {
                        if (updateOnBlur && changed) {
                            $scope.$apply(function () {
                                var dtp = $element.data('DateTimePicker');
                                var dtpDate = dtp.date();
                                console.log("on focusout, dtpDate = " + dtpDate.format());
                                controller.$setViewValue(dtpDate);
                            });

                            //$timeout(function () {
                            //    var dtp = $element.data('DateTimePicker');
                            //    var dtpDate = dtp.date();
                            //    console.log("on focusout, dtpDate = " + dtpDate.format());
                            //    controller.$setViewValue(dtpDate);
                            //});
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
