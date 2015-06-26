(function() {
    'use strict';
    angular
        .module('app.filters')
        .filter('formatResultDate', formatResultDate);

    function formatResultDate() {
        return formatResultDateFilter;
        ////////////////
        function formatResultDateFilter(text, length, end) {
            var dateNums = text.split('');
            dateNums.splice(4, 0, '-');
            dateNums.splice(7, 0, '-');
            return dateNums.join('');
        }
    }
})();