(function () {
    'use strict';

    angular
        .module('bootstrapLab')
        .factory('tksDirectives', tksDirectives);

    tksDirectives.$inject = [];

    function tksDirectives() {
        var service = {
            setAttribute: setAttribute,
            transferNgDirectives: transferNgDirectives,
            removeTksAttributes: removeTksAttributes
        };

        return service;

        function setAttribute(name, value, element) {
            if (!element.attr(name)) {
                element.attr(name, value);
            }
        }

        function transferNgDirectives(attrs, sourceElement, destElement) {
            var x = 1;
            angular.forEach([{ normal: 'ngIf', attr: 'ng-if' }, { normal: 'ngShow', attr: 'ng-show' }, { normal: 'ngHide', attr: 'ng-hide' }], function (attr) {
                if (angular.isDefined(attrs[attr.normal])) {
                    setAttribute(attr.attr, attrs[attr.normal], destElement);
                    sourceElement.removeAttr(attr.attr);
                }
            });
        }

        function removeTksAttributes(element, attrs) {
            angular.forEach(attrs, function (attr) {
                element.removeAttr(attr);
            });
        }
    }

})();
