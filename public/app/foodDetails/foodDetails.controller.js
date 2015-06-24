(function() {
    'use strict';
    angular
        .module('app')
        .controller('FoodDetailsCtrl', FoodDetailsCtrl);
    FoodDetailsCtrl.$inject = ['resultDataStoreService'];
    /* @ngInject */
    function FoodDetailsCtrl(resultDataStoreService) {
        var self = this;

        self.selectedFoodItem = resultDataStoreService.getSelectedItem();
        self.formatResultDate = formatResultDate;

        function formatResultDate(resultDate) {
            var dateNums = resultDate.split('');
            dateNums.splice(4, 0, '-');
            dateNums.splice(7, 0, '-');
            return dateNums.join('');
        }
    }
})();