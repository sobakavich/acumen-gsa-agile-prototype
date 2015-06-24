(function() {
    'use strict';
    angular
        .module('app')
        .controller('SearchCtrl', SearchCtrl);
    SearchCtrl.$inject = ['dataservice', 'envConfig', 'resultDataStoreService'];
    /* @ngInject */
    function SearchCtrl(ds, envConfig, resultDataStoreService) {
        var vm = this;
        vm.title = 'SearchCtrl';

        // props
        vm.searchParams = {
            searchTerm: '',
            status: '',
            classification: '',
            state: ''
        };

        vm.stateList = envConfig.recallLookups.stateLookups;
        vm.statusList = envConfig.recallLookups.statusLookups;
        vm.classificationList = envConfig.recallLookups.classificationLookups;

        vm.searchResults = [];

        vm.pagination = {
            currentPage: 1,
            maxPageDisplay: 5,
            totalPages: 0
        };

        // functions
        vm.search = search;
        vm.setPaging = setPaging;
        vm.setSelectedFoodItem = resultDataStoreService.setSelectedItem;

        activate();
        ////////////////
        function activate() {
    		console.log('in search controller!');
        }

        function search () {
            return ds.searchForRecals(vm.searchParams)
                .then(function(data) {
                    // console.dir(data.data);
                    vm.searchResults = data.data;
                    setPaging();
                    return vm.searchResults;
                });
        }

        function setPaging() {
            var pagingInfo = vm.searchResults.meta.results;
            vm.pagination.totalPages = Math.ceil(pagingInfo.total / pagingInfo.limit);
        }
    }
})();