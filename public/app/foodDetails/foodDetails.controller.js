(function() {
    'use strict';
    angular
        .module('app')
        .controller('FoodDetailsCtrl', FoodDetailsCtrl);
    FoodDetailsCtrl.$inject = [];
    /* @ngInject */
    function FoodDetailsCtrl() {
        var vm = this;
        vm.title = 'FoodDetailsCtrl';
        activate();
        ////////////////
        function activate() {
    		console.log('in search results controller!');
        }
    }
})();