(function() {
    'use strict';
    angular
        .module('app')
        .controller('SearchCtrl', SearchCtrl);
    SearchCtrl.$inject = [];
    /* @ngInject */
    function SearchCtrl() {
        var vm = this;
        vm.title = 'SearchCtrl';

        // props
        vm.keyword = '';

        // functions
        vm.search = search;

        activate();
        ////////////////
        function activate() {
    		console.log('in search controller!');
        }

        function search () {
            console.log('searching for ' + vm.keyword);
        }
    }
})();