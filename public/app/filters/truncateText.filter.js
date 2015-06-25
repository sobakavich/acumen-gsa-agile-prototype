(function() {
    'use strict';
    angular
        .module('app.filters')
        .filter('truncate', truncate);
    function truncate() {
        return truncateFilter;
        ////////////////
        function truncateFilter(text, length, end) {
            if (isNaN(length)) {
            	length = 100;
            }

            if (end === undefined) {
            	end = "...";
            }

            if (text.length <= length || text.length - end.length <= length) {
            	return text;
            } else {
            	return String(text).substring(0, length-end.length) + end;
            }
        }
    }
})();