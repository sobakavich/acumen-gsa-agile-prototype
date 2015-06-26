(function() {
    'use strict';
    angular
        .module('app.filters')
        .filter('formatResultDate', formatResultDate);

    function formatResultDate() {
        return formatResultDateFilter;
        ////////////////
        function formatResultDateFilter(resultDate) {

            if (!resultDate) {
                return '';
            }

            var dateNums = resultDate.split('');
            dateNums.splice(4, 0, '-');
            dateNums.splice(7, 0, '-');
            return dateNums.join('');
        }
    }
})();