(function () {
    'use strict';

    angular
        .module('bootstrapLab')
        .factory('dateService', dateService);

    dateService.$inject = [];

    function dateService() {
        var service = {
            getMonths: getMonths,
            getDatePart: getDatePart,
            getTimePart: getTimePart,
            addDays: addDays,
            combineDateAndTime: combineDateAndTime
        };

        return service;

        function getMonths() {
            var months = [];
            months.push({ 'name': 'January', 'number': '01', 'dayslong': '31' });
            months.push({ 'name': 'February', 'number': '02', 'dayslong': '28' });//29 in leap years
            months.push({ 'name': 'March', 'number': '03', 'dayslong': '31' });
            months.push({ 'name': 'April', 'number': '04', 'dayslong': '30' });
            months.push({ 'name': 'May', 'number': '05', 'dayslong': '31' });
            months.push({ 'name': 'June', 'number': '06', 'dayslong': '30' });
            months.push({ 'name': 'July', 'number': '07', 'dayslong': '31' });
            months.push({ 'name': 'August', 'number': '08', 'dayslong': '31' });
            months.push({ 'name': 'September', 'number': '09', 'dayslong': '30' });
            months.push({ 'name': 'October', 'number': '10', 'dayslong': '31' });
            months.push({ 'name': 'November', 'number': '11', 'dayslong': '30' });
            months.push({ 'name': 'December', 'number': '12', 'dayslong': '31' });
            return months;
        }

        function getDatePart(date) {
            return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
        };

        function getTimePart(date, truncateTo) {
            truncateTo = (truncateTo || ' ').toLowerCase();
            var hours = date.getHours();
            var minutes = ('h'.indexOf(truncateTo) === -1 ? date.getMinutes() : 0);
            var seconds = ('hm'.indexOf(truncateTo) === -1 ? date.getSeconds() : 0);
            var milliseconds = ('hms'.indexOf(truncateTo) === -1 ? date.getMilliseconds() : 0);

            return new Date(0, 0, 0, hours, minutes, seconds, milliseconds);
        }

        function addDays(date, days) {
            var origTimezoneOffset = date.getTimezoneOffset();

            var newDate = new Date();
            var newDateTicks = date.getTime() + days * 24 * 60 * 60 * 1000;
            newDate.setTime(newDateTicks);
            var newTimezoneOffset = newDate.getTimezoneOffset();

            // Adjust for daylight/standard transitions
            if (newTimezoneOffset !== origTimezoneOffset) {
                newDateTicks += (newTimezoneOffset - origTimezoneOffset) * 60 * 1000;
                newDate.setTime(newDateTicks);
            }

            return newDate;
        }

        function combineDateAndTime(date, time) {
            var dateTime = new Date(date.getTime());
            dateTime.setHours(time.getHours());
            dateTime.setMinutes(time.getMinutes());
            dateTime.setSeconds(time.getSeconds());
            dateTime.setMilliseconds(time.getMilliseconds());
            return dateTime;
        }
    }

})();
